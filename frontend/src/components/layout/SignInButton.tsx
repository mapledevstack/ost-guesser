import { useNavigate } from "@tanstack/react-router"
import { Button } from "../ui/button"

const SignInButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      className="min-w-24 cursor-pointer bg-primary/50"
      onClick={() => navigate({ to: "/login" })}
    >
      Sign in
    </Button>
  )
}
export default SignInButton
