import { useCallback, useEffect, useRef, useState } from "react"

type UseAudioPlayerOptions = {
  initialVolume?: number
}

export const useAudioPlayer = ({
  initialVolume = 0.5,
}: UseAudioPlayerOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(initialVolume)
  const [progress, setProgress] = useState(0)
  const [hasEnded, setHasEnded] = useState(false)

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      void audio.play()
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

    void audio.play()
  }, [])

  const handleVolumeChange = useCallback((value: number) => {
    setVolume(value)

    if (audioRef.current) {
      audioRef.current.volume = value
    }
  }, [])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
    setHasEnded(false)
  }, [])

  const handlePause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const handleEnded = useCallback(() => {
    setIsPlaying(false)
    setHasEnded(true)
    setProgress(1)
  }, [])

  // Keep progress synced with audio at 60fps while playing
  useEffect(() => {
    if (!isPlaying) return

    let frameId: number

    const updateProgress = () => {
      const audio = audioRef.current

      if (audio?.duration) {
        setProgress(audio.currentTime / audio.duration)
      }

      frameId = requestAnimationFrame(updateProgress)
    }

    frameId = requestAnimationFrame(updateProgress)

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = initialVolume
  }, [initialVolume])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space" || !event.ctrlKey) return

      event.preventDefault()
      togglePlay()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [togglePlay])

  const seek = useCallback((progress: number) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return

    const clampedProgress = Math.max(0, Math.min(1, progress))

    audio.currentTime = clampedProgress * audio.duration
    setProgress(clampedProgress)
  }, [])

  return {
    audioRef,
    isPlaying,
    volume,
    progress,
    hasEnded,
    togglePlay,
    replay,
    handleVolumeChange,
    handlePlay,
    handlePause,
    handleEnded,
    seek,
  }
}
