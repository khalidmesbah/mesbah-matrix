'use client';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';

export default function DeleteUser({ id }: { id: string }) {
  console.clear();
  console.log(id);
  const client = useKindeBrowserClient();

  console.log(process.env.NEXT_PUBLIC_KINDE_MANAGEMENT_API, client);

  // const deleteUser = async () => {
  //   const headers = {
  //     Accept: 'application/json',
  //     Authorization: `Bearer ${client.accessTokenEncoded}`,
  //   };
  //
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_KINDE_MANAGEMENT_API}/v1/user?id=${id}`, {
  //     method: 'DELETE',
  //     headers: headers,
  //   })
  //     .then(function (res) {
  //       return res.json();
  //     })
  //     .then(function (body) {
  //       console.log(body);
  //     });
  //
  //   console.log(res);
  // };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost'>Delete account</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>We are sorry</AlertDialogTitle>
          <AlertDialogDescription>
            Deleting your account is not available at the moment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            color='destructive'
            disabled={true}
            className={`${buttonVariants({ variant: 'destructive' })}`}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
