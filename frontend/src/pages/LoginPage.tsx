import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { API_BASE_URL } from "@/constants/env"
import { FcGoogle } from "react-icons/fc"

const handleLogin = () => {
  window.location.assign(`${API_BASE_URL}/auth/google`)
}

const LoginPage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

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

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute -inset-3 bg-cover bg-center transition-transform duration-300 ease-out"
        style={{
          backgroundImage: "url('/images/bg.webp')",
          transform: `translate(${position.x * 5}px, ${position.y * 5}px)`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Login card */}
      <Card className="relative z-10 w-full max-w-sm py-4 text-center">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription className="text-xs">
            Continue to your snowfluff.online account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button
            className="w-full gap-2 bg-primary/40 font-bold"
            onClick={handleLogin}
          >
            <FcGoogle className="size-5" />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
