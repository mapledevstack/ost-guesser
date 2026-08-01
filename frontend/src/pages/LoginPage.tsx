import ParallaxBackground from "@/components/layout/ParallaxBackground"
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
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <ParallaxBackground src="/images/bg.webp" />

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
