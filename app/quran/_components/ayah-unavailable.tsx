export default function AyahUnavailable() {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className='mx-auto max-w-md text-center'>
        <div className='text-primary mx-auto h-12 w-12' />
        <h1 className='text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl'>
          Ayah Unavailable
        </h1>
        <p className='text-muted-foreground mt-4'>
          We are sorry, but we were unable to fetch the ayah of the Quran you requested. Please try
          again later.
        </p>
      </div>
    </div>
  );
}
