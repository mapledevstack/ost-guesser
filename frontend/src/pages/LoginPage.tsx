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
    <div className="mx-0 my-0 flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-sm py-4 text-center">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription className="text-xs">
            Continue to your snowfluff.online account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full gap-2 bg-primary/40 font-bold"
            onClick={() => handleLogin()}
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
