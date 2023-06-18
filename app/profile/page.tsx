import DeleteDialog from "@/components/profile/DeleteDialog"
import UsernameForm from "@/components/profile/UsernameForm"
import { Separator } from "@/components/ui/separator"
import User from "@/models/user"
import { getCurrentUser } from "@/utils/session"
import { redirect } from "next/navigation"

export default async function SettingsProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    throw redirect('/api/auth/signin')
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <UsernameForm user={user} />
      <Separator />
      <h1 className="text-2xl font-medium text-red-500">Dangerous</h1>
      <DeleteDialog userId={user?.id} />
    </div>
  )
}