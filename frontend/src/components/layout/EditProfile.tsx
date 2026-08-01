import { useState } from "react"
import { Field, FieldLabel, FieldSeparator } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Save } from "lucide-react"
import AvatarSelector from "./AvatarSelector"
import { DialogClose, DialogFooter } from "../ui/dialog"
import useUpdateProfile from "@/hooks/useUpdateProfile"
import { Spinner } from "../ui/spinner"
import useMe from "@/hooks/useMe"

const EditProfile = () => {
  const { data: user } = useMe()

  const [displayName, setDisplayName] = useState<string>(user.displayName ?? "")
  const [avatarUrl, setAvatarUrl] = useState<string>(user.avatarUrl ?? "")

  const { mutate: updateProfile, isPending } = useUpdateProfile()

  return (
    <div className="grid grid-cols-[30%_1fr] gap-6">
      <AvatarSelector avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} />

      <Field>
        <FieldLabel htmlFor="displayName">Display name</FieldLabel>
        <Input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <FieldSeparator />

        <DialogFooter className="flex">
          <DialogClose
            render={
              <Button variant="outline" className="max-w-24">
                Cancel
              </Button>
            }
          />

          <Button
            type="button"
            className="max-w-24"
            disabled={isPending}
            onClick={() => updateProfile({ displayName, avatarUrl })}
          >
            {isPending ? <Spinner /> : <Save />}
            Save
          </Button>
        </DialogFooter>
      </Field>
    </div>
  )
}
export default EditProfile
