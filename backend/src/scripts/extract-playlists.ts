import slugify from "slugify"
import fs from "fs"

const response = JSON.parse(
  fs.readFileSync("./assets/playlist-response.json", "utf-8"),
)

function findMusicItems(obj: any): any[] {
  const results: any[] = []

  if (!obj || typeof obj !== "object") return results

  if (obj.musicTwoRowItemRenderer) {
    results.push(obj.musicTwoRowItemRenderer)
  }

  for (const value of Object.values(obj)) {
    results.push(...findMusicItems(value))
  }

  return results
}

const renderers = findMusicItems(response)

const albums = renderers
  .map((renderer) => {
    const playlistId =
      renderer.thumbnailOverlay?.musicItemThumbnailOverlayRenderer?.content
        ?.musicPlayButtonRenderer?.playNavigationEndpoint?.watchPlaylistEndpoint
        ?.playlistId

    if (!playlistId) return null

    return {
      id: playlistId,
      slug: slugify(renderer.title.runs[0].text, {
        lower: true,
        strict: true,
      }),
    }
  })
  .filter(Boolean)

console.log(albums)

fs.writeFileSync("./src/data/albums.json", JSON.stringify(albums, null, 2))
