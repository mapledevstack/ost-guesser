import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CircleUser, LogOutIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import useLogout from "@/hooks/useLogout"
import { Spinner } from "../ui/spinner"
import useAuthUser from "@/hooks/useAuthUser"

const AvatarDropdown = () => {
  const { mutate: logout, isPending } = useLogout()
  const { data: authUser } = useAuthUser()

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
              <AvatarImage
                src={authUser?.avatarUrl ?? undefined}
                alt="user avatar"
              />
              <AvatarFallback>
                <CircleUser className="size-full" />
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="truncate font-medium">
                {authUser?.displayName}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {authUser?.email}
              </span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={isPending}
            className="text-red-500"
            onClick={() => logout()}
          >
            {isPending ? <Spinner /> : <LogOutIcon />}
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default AvatarDropdown
