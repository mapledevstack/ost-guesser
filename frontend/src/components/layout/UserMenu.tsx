import useMe from "@/hooks/useMe"
import SignInButton from "./SignInButton"
import AvatarDropdown from "./AvatarDropdown"

const UserMenu = () => {
  const { data: me } = useMe()

  return (
    <div className="fixed top-6 right-6 z-20">
      {me.type === "user" ? <AvatarDropdown /> : <SignInButton />}
    </div>
  )
}
export default UserMenu
