import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import Link from 'next/link'
import { getCurrentUser } from '@/utils/session';

export default async function Nav() {
  const user = await getCurrentUser()

  return (
    <header className="container flex items-center justify-between mt-2 h-14">
      <div className="mr-4">
        <Link href='/'>
          <h1 className='text-2xl font-medium'>
            Proompts
          </h1>
        </Link>
      </div>

      <DesktopNav user={user} />

      {/* Mobile Navigation */}
      <MobileNav user={user} />
    </header>
  )
}