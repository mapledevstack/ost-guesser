export const cleanAlbumTitle = (title: string) =>
  title.replace(/\s*\(Original Game Soundtrack\)$/i, "")

export const parseYoutubeDescription = (description: string) => {
  const lines = description.split("\n")

  const credits = {
    composers: [] as string[],
    arrangers: [] as string[],
  }

  for (const line of lines) {
    const [key, value] = line.split(":").map((part) => part.trim())

    if (!key || !value) continue

    if (key === "Composer") {
      credits.composers.push(value)
    }

    if (key === "Arranger") {
      credits.arrangers.push(value)
    }
  }

  return credits
}
