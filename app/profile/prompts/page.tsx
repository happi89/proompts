import Feed from "@/components/home/Feed";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function Profile() {
  const user = await getCurrentUser()
  if (!user) {
    throw redirect('/api/auth/signin')
  }

  const prompts = await fetch(`${ process.env.URL }/api/users/${ user?.id }`, {
    cache: 'no-store',
  }).then(res => res.json())

  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Prompts</h3>
          <p className="text-sm text-muted-foreground">
            Your own prompts aswell as your saved ones!
          </p>
        </div>
        <Separator />
      </div>
      <Feed user={user} p={prompts} />
    </>
  );
}
