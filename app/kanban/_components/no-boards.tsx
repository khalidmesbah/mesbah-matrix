export default function NoBoards() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="space-y-8 text-center">
        <div className="bg-card rounded-lg p-8 shadow-lg">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">No Boards</h2>
            <p className="text-muted-foreground max-w-md">
              It looks like you haven't created any boards yet. Get started by creating your first
              board.
            </p>
          </div>
          <div className="mt-6 flex justify-center" />
        </div>
      </div>
    </div>
  );
}
