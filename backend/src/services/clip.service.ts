import fs from "fs/promises"
import path from "path"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

const CLIP_DURATION = 24

const CLIPS_DIR = path.join(process.cwd(), "assets/clips")
const RAW_DIR = path.join(process.cwd(), "assets/raw")

const ensureDirectories = async () => {
  await fs.mkdir(CLIPS_DIR, { recursive: true })
  await fs.mkdir(RAW_DIR, { recursive: true })
}

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
  const output = path.join(CLIPS_DIR, `${videoId}.mp3`)

  await execAsync(
    `ffmpeg -ss ${start} -i "${input}" -t ${CLIP_DURATION} -c:a libmp3lame "${output}" -y`,
  )
}

export const generateClips = async (videoIds: string[]) => {
  await ensureDirectories()

  for (const videoId of videoIds) {
    try {
      console.log(`Generating clip for ${videoId}`)

      const duration = await getVideoDuration(videoId)

      if (duration <= CLIP_DURATION) {
        console.log(`Skipping ${videoId}: too short`)
        continue
      }

      const start = getRandomStart(duration)

      const rawFile = await downloadAudio(videoId)

      await createClip(videoId, rawFile, start)

      await fs.rm(rawFile)

      console.log(`Created assets/clips/${videoId}.mp3`)
    } catch (error) {
      console.error(`Failed generating clip for ${videoId}`, error)
    }
  }
}
