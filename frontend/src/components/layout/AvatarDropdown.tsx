import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CircleUser, LogOutIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import useLogout from "@/hooks/useLogout"
import { Spinner } from "../ui/spinner"

const AvatarDropdown = () => {
  const { mutate: logout, isPending } = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer rounded-full"
          >
            <Avatar size="xl">
              <AvatarImage src="" alt="user avatar" />
              <AvatarFallback>
                <CircleUser className="size-full" />
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-red-500" onClick={() => logout()}>
            {isPending ? <Spinner /> : <LogOutIcon />}
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default AvatarDropdown
