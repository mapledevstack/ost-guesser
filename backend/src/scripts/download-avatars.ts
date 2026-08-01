import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const API_URL = "https://api-v2.encore.moe/api/en/character"
const OUTPUT_DIR = path.resolve(__dirname, "../../assets/avatars")
const JSON_PATH = path.join(OUTPUT_DIR, "avatars.json")

const response = await fetch(API_URL)

if (!response.ok) {
  throw new Error(`Failed to fetch characters: ${response.status}`)
}

const { roleList } = await response.json()

await fs.mkdir(OUTPUT_DIR, { recursive: true })

const avatars = []

for (const character of roleList) {
  const imageResponse = await fetch(character.RoleHeadIcon)

  if (!imageResponse.ok) {
    console.error(`Failed: ${character.Name}`)
    continue
  }

  const buffer = Buffer.from(await imageResponse.arrayBuffer())
  const filename = `${character.Id}.webp`

  await fs.writeFile(path.join(OUTPUT_DIR, filename), buffer)

  avatars.push({
    id: character.Id,
    name: character.Name,
    image: `/avatars/${filename}`,
  })

  console.log(`Downloaded ${character.Name} → ${filename}`)
}

await fs.writeFile(JSON_PATH, JSON.stringify(avatars, null, 2))

console.log(`Generated ${JSON_PATH}`)
