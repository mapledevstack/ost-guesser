import { useCallback, useEffect, useRef, useState } from "react"

type UseAudioPlayerOptions = {
  initialVolume?: number
  src?: string
  maxDuration: number
}

const useAudioPlayer = ({
  initialVolume = 0.5,
  src,
  maxDuration,
}: UseAudioPlayerOptions) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const currentSrcRef = useRef(src)
  const previousMaxDurationRef = useRef(maxDuration)

  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(initialVolume)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [hasEnded, setHasEnded] = useState(false)

  const maxProgress = duration ? Math.min(maxDuration / duration, 1) : 0

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      void audio.play().catch((error) => {
        console.error("Failed to play audio:", error)
      })
    } else {
      audio.pause()
    }
  }, [])

  const replay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = 0
    setProgress(0)
    setHasEnded(false)

    void audio.play().catch((error) => {
      console.error("Failed to play audio:", error)
    })
  }, [])

  const seek = useCallback(
    (value: number) => {
      const audio = audioRef.current
      if (!audio?.duration) return

      const nextProgress = Math.max(0, Math.min(1, value))
      const nextTime = Math.min(nextProgress * audio.duration, maxDuration)

      audio.currentTime = nextTime
      setProgress(nextTime / audio.duration)
    },
    [maxDuration]
  )

  const setVolume = useCallback((value: number) => {
    const nextVolume = Math.max(0, Math.min(1, value))

    setVolumeState(nextVolume)

    if (audioRef.current) {
      audioRef.current.volume = nextVolume
    }
  }, [])

  // Load/reset audio when source changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    currentSrcRef.current = src
    previousMaxDurationRef.current = maxDuration

    audio.pause()
    audio.currentTime = 0

    setIsPlaying(false)
    setProgress(0)
    setDuration(0)
    setHasEnded(false)

    if (src) {
      audio.src = src
      audio.load()
    } else {
      audio.removeAttribute("src")
      audio.load()
    }
  }, [src])

  // Audio events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setHasEnded(true)
      setProgress(1)
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [src])

  // Auto-play when reveal duration increases
  useEffect(() => {
    if (currentSrcRef.current !== src) return

    if (previousMaxDurationRef.current === maxDuration) return

    previousMaxDurationRef.current = maxDuration

    const audio = audioRef.current
    if (!audio || !audio.duration) return

    audio.pause()
    audio.currentTime = 0

    setProgress(0)
    setHasEnded(false)

    void audio.play().catch((error) => {
      console.error("Failed to play audio:", error)
    })
  }, [maxDuration, src])

  // Progress
  useEffect(() => {
    if (!isPlaying) return

    let frameId: number

    const updateProgress = () => {
      const audio = audioRef.current

      if (audio?.duration) {
        if (audio.currentTime >= maxDuration) {
          audio.pause()
          audio.currentTime = maxDuration

          setProgress(maxDuration / audio.duration)
          setHasEnded(true)

          return
        }

        setProgress(audio.currentTime / audio.duration)
      }

      frameId = requestAnimationFrame(updateProgress)
    }

    frameId = requestAnimationFrame(updateProgress)

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [isPlaying, maxDuration])

  // Initial volume
  useEffect(() => {
    setVolume(initialVolume)
  }, [initialVolume, setVolume])

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space" || !event.ctrlKey) return

      event.preventDefault()

      if (hasEnded) {
        replay()
      } else {
        togglePlay()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [hasEnded, replay, togglePlay])

  return {
    audioRef,
    isPlaying,
    volume,
    progress,
    maxProgress,
    hasEnded,
    togglePlay,
    replay,
    seek,
    setVolume,
  }
}

export default useAudioPlayer
