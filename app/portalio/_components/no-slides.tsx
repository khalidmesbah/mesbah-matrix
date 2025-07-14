import { Plus } from 'lucide-react';

export default function NoSlides() {
  return (
    <div className="from-background to-accent/50 flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b">
      <div className="flex max-w-md flex-col items-center justify-center gap-8 px-4 text-center">
        <div className="bg-secondary shadow-primary/10 rounded-full p-6 shadow-lg">
          <div className="bg-background rounded-full p-4">
            <Plus className="text-primary h-12 w-12" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-foreground text-3xl font-bold tracking-tight">No slides found</h2>
          <p className="text-muted-foreground text-lg">
            Create your first slide to get started with your presentation.
          </p>
        </div>
      </div>
    </div>
  );
}
