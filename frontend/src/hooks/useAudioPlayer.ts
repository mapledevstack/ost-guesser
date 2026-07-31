import { useCallback, useEffect, useRef, useState } from "react"

type UseAudioPlayerOptions = {
  initialVolume?: number
  src?: string
}

const useAudioPlayer = ({
  initialVolume = 0.5,
  src,
}: UseAudioPlayerOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(initialVolume)
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

  const seek = useCallback((value: number) => {
    const audio = audioRef.current
    if (!audio?.duration) return

    const nextProgress = Math.max(0, Math.min(1, value))

    audio.currentTime = nextProgress * audio.duration
    setProgress(nextProgress)
  }, [])

  const setVolume = useCallback((value: number) => {
    const nextVolume = Math.max(0, Math.min(1, value))

    setVolumeState(nextVolume)

    if (audioRef.current) {
      audioRef.current.volume = nextVolume
    }
  }, [])

  // Audio events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => {
      setIsPlaying(true)
      setHasEnded(false)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setHasEnded(true)
      setProgress(1)
    }

    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [src])

  // Progress
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

  // Initial volume
  useEffect(() => {
    setVolume(initialVolume)
  }, [initialVolume, setVolume])

  // Keyboard shortcut
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

  return {
    audioRef,
    isPlaying,
    volume,
    progress,
    hasEnded,
    togglePlay,
    replay,
    seek,
    setVolume,
  }
}

export default useAudioPlayer
