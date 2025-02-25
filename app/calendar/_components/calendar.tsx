export default function Calendar({ src }: { src: string }) {
  return (
    <div className="h-full overflow-auto">
      <div className="bg-primary/90 pointer-events-none absolute inset-0 mix-blend-hue dark:mix-blend-exclusion dark:brightness-[.1] dark:invert" />
      <iframe className="z-10 h-full w-full min-w-[400px]" src={src} title="Google Calendar" />
    </div>
  );
}
