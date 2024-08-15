export default function AyahUnavailable() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ayah Unavailable
        </h1>
        <p className="mt-4 text-muted-foreground">
          We are sorry, but we were unable to fetch the ayah of the Quran you requested. Please try
          again later.
        </p>
      </div>
    </div>
  );
}
