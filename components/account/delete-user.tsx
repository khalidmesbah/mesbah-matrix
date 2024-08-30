'use client';

import { Button } from '@/components/ui/button';

export default function DeleteUser() {
  const deleteUser = async () => {
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer {access-token}',
    };

    const res = await fetch('https://{your_subdomain}.kinde.com/api/v1/user?id=string', {
      method: 'DELETE',

      headers: headers,
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (body) {
        console.log(body);
      });

    console.log(res);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete account</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your card and remove it from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            color="destructive"
            onClick={deleteUser}
            className={`${buttonVariants({ variant: 'destructive' })}`}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
import { buttonVariants } from '@/components/ui/button';
