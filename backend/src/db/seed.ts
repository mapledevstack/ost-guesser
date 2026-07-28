import seedAlbums from "./seed/albums.seed.js"
import { loadAlbums } from "../scripts/load-albums.js"
import seedTracks from "./seed/tracks.seed.js"
import seedArtists from "./seed/artists.seed.js"
import seedTrackArtists from "./seed/trackArtists.seed.js"

async function main() {
  const albums = await loadAlbums()

  console.log("Seeding albums...")
  await seedAlbums(albums)

  console.log("Seeding tracks...")
  await seedTracks(albums)

  console.log("Seeding artists...")
  const artistMap = await seedArtists(albums)

  console.log("Seeding track artists...")
  await seedTrackArtists(albums, artistMap)

  console.log("Done!")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
