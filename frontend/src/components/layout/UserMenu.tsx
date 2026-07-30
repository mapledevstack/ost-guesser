import useMe from "@/hooks/useMe"
import SignInButton from "./SignInButton"
import AvatarDropdown from "./AvatarDropdown"

const UserMenu = () => {
  const { data: me } = useMe()

  if (!me) {
    return null
  }

  return (
    <div className="fixed top-4 right-4">
      {me.type === "user" ? <AvatarDropdown /> : <SignInButton />}
    </div>
  )
}
export default UserMenu
