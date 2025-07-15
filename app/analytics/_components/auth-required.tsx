'use client';

import { LoginLink } from '@kinde-oss/kinde-auth-nextjs';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthRequiredProps {
  title?: string;
  description?: string;
  onSignIn?: () => void;
}

export default function AuthRequired({
  title = 'Authentication Required',
  description = 'Please sign in to view your analytics and access your dashboard.',
  onSignIn,
}: AuthRequiredProps) {
  return (
    <div className='flex min-h-[60vh] items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted'>
            <Lock className='h-6 w-6 text-muted-foreground' />
          </div>
          <CardTitle className='text-xl'>{title}</CardTitle>
          <CardDescription className='text-center'>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginLink
            children={
              <Button onClick={onSignIn} className='w-full' size='lg'>
                Sign In
              </Button>
            }
          />
          <p className='text-center text-sm text-muted-foreground mt-2'>
            Secure authentication powered by Kinde
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
