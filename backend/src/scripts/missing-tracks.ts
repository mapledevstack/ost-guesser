import fs from "fs/promises"
import path from "path"
import { exec } from "child_process"
import { promisify } from "util"
import { loadAlbums } from "./load-albums.js"

const execAsync = promisify(exec)

const CLIP_DURATION = 24

const MISSING_DIR = path.join(process.cwd(), "assets/missing-tracks")
const RAW_DIR = path.join(process.cwd(), "assets/raw")

await fs.mkdir(MISSING_DIR, { recursive: true })
await fs.mkdir(RAW_DIR, { recursive: true })

const getRandomStart = (duration: number) => {
  const maxStart = duration - CLIP_DURATION

  if (maxStart <= 0) {
    return 0
  }

  const earliestStart = Math.min(duration * 0.4, maxStart)

  return Math.floor(earliestStart + Math.random() * (maxStart - earliestStart))
}

const getVideoDuration = async (videoId: string) => {
  const url = `https://www.youtube.com/watch?v=${videoId}`

  const { stdout } = await execAsync(`yt-dlp --print "%(duration)s" "${url}"`)

  return Number(stdout.trim())
}

const downloadAudio = async (videoId: string) => {
  const url = `https://www.youtube.com/watch?v=${videoId}`
  const output = path.join(RAW_DIR, `${videoId}.%(ext)s`)

  await execAsync(`yt-dlp -x --audio-format mp3 -o "${output}" "${url}"`)

  return path.join(RAW_DIR, `${videoId}.mp3`)
}

const createClip = async (videoId: string, input: string, start: number) => {
  const output = path.join(MISSING_DIR, `${videoId}.mp3`)

  await execAsync(
    `ffmpeg -ss ${start} -i "${input}" -t ${CLIP_DURATION} -c:a libmp3lame "${output}" -y`,
  )
}

const albums = await loadAlbums()

const missingTracks = albums.flatMap((album) =>
  album.tracks
    .filter((track) => track.clip === null)
    .map((track) => ({
      album: album.slug,
      title: track.title,
      youtubeId: track.youtubeId,
    })),
)

console.log(`Missing clips: ${missingTracks.length}`)

for (const track of missingTracks) {
  const output = path.join(MISSING_DIR, `${track.youtubeId}.mp3`)

  try {
    await fs.access(output)
    console.log(`Skipping ${track.youtubeId}: already exists`)
    continue
  } catch {
    // File doesn't exist, so retry generation.
  }

  console.log(`\nGenerating: ${track.title}`)
  console.log(`YouTube ID: ${track.youtubeId}`)

  try {
    const duration = await getVideoDuration(track.youtubeId)

    if (duration <= CLIP_DURATION) {
      console.log("Skipping: video is too short")
      continue
    }

    const start = getRandomStart(duration)

    const rawFile = await downloadAudio(track.youtubeId)

    await createClip(track.youtubeId, rawFile, start)

    await fs.rm(rawFile)

    console.log(`✓ Created assets/missing-tracks/${track.youtubeId}.mp3`)
  } catch (error) {
    console.error(`✗ Failed generating clip for ${track.youtubeId}`, error)
  }
}
