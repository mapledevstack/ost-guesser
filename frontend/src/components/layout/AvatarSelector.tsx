import { Camera, CircleUser } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { cn } from "@/utils/cn"
import avatars from "@/data/avatars.json"

type Props = {
  avatarUrl: string
  setAvatarUrl: (url: string) => void
}

const AvatarSelector = ({ avatarUrl, setAvatarUrl }: Props) => {
  const avatarUrls = avatars.map((avatar) => avatar.image)

  return (
    <Dialog>
      <DialogTrigger>
        <div className="group relative">
          <Avatar size="full">
            <AvatarImage src={avatarUrl} alt="user avatar" />
            <AvatarFallback>
              <CircleUser className="size-full" />
            </AvatarFallback>
          </Avatar>

          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <Camera className="size-12 text-white" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Select Avatar</DialogTitle>
        </DialogHeader>
        <div className="grid h-80 grid-cols-4 gap-4 overflow-x-hidden overflow-y-auto">
          {avatarUrls.map((url) => (
            <Avatar
              key={url}
              size="full"
              className={cn(
                "cursor-pointer transition-transform hover:scale-102",
                url === avatarUrl && "border-4 border-primary"
              )}
              onClick={() => setAvatarUrl(url)}
            >
              <AvatarImage src={url} alt="user avatar" />
              <AvatarFallback>
                <CircleUser className="size-full" />
              </AvatarFallback>
            </Avatar>
          ))}
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Close</Button>} />
          <DialogClose render={<Button variant="default">Save</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AvatarSelector
