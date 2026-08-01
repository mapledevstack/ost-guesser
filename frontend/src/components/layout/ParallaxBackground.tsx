import { cn } from "@/utils/cn"
import { useEffect, useState } from "react"

type ParallaxBackgroundProps = {
  src: string
  movement?: number
  blur?: boolean
}

const ParallaxBackground = ({
  src,
  movement = 5,
  blur = false,
}: ParallaxBackgroundProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2

      setPosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true)
    }, 50)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <div
        className={cn(
          "absolute -inset-3 overflow-hidden bg-cover bg-center transition-transform duration-300 ease-out",
          blur && "blur-sm"
        )}
        style={{
          backgroundImage: `url("${src}")`,
          transform: `translate(${position.x * movement}px, ${position.y * movement}px)`,
        }}
      />

      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-out"
        style={{
          opacity: visible ? 0.45 : 1,
          background: "linear-gradient(to bottom, black, var(--background))",
        }}
      />
    </>
  )
}

export default ParallaxBackground
