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
import useUser from "@/hooks/useAuthUser"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import EditProfile from "./EditProfile"

const AvatarDropdown = () => {
  const { mutate: logout, isPending } = useLogout()
  const { data: user } = useUser()

  return (
    <Dialog>
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
                  src={user?.avatarUrl ?? undefined}
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
                  {user?.displayName}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DialogTrigger className="h-full w-full">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </DialogTrigger>
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
      <DialogContent>
        <EditProfile />
      </DialogContent>
    </Dialog>
  )
}
export default AvatarDropdown
