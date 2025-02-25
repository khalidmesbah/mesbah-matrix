export default function FailedToFetchFavouriteAyahs() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-lg p-6 text-center shadow-lg">
        <h2 className="mb-2 text-2xl font-bold">Couldn&apos;t Fetch Favorite Ayahs</h2>
        <p className="text-muted-foreground mb-4">
          There was an error fetching your favorite ayahs. Please make sure you are{' '}
          <em className="font-extrabold underline">signed in</em> and connected to the internet.
        </p>
      </div>
    </div>
  );
}
