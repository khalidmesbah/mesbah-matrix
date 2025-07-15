import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import DeleteUser from './_components/delete-user';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Your account',
};

export default async function AccountPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return <h1>No user</h1>;

  return (
    <div className='border-primary bg-card flex flex-col items-start gap-2 rounded-lg border-2 p-5'>
      <div className='flex gap-2'>
        {user.picture && (
          <Image
            src={user.picture}
            alt='user profile picture'
            className='h-16 w-16 rounded-full'
            width={64}
            height={64}
          />
        )}

        <div className='flex flex-col gap-2'>
          <div className='flex gap-2'>
            <h2>Name: </h2>
            <p>{`${user.given_name} ${user.family_name}`}</p>
          </div>

          <div className='flex gap-2'>
            <h2>Email: </h2>
            <p>{user.email}</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2'>
        <LogoutLink className={buttonVariants({ variant: 'destructive' })}>Log out</LogoutLink>
        <DeleteUser id={user.id} />
      </div>
    </div>
  );
}
