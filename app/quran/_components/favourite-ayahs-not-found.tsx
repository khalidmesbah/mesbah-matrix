export default function FavouriteAyahsNotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-lg p-6 text-center shadow-lg">
        <h2 className="mb-2 text-2xl font-bold">You have no favourite ayahs</h2>
        <p className="text-muted-foreground mb-4">
          Add some of your favourite Quranic Ayahs to your list.
        </p>
      </div>
    </div>
  );
}
