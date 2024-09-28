export default function Calendar({ src }: { src: string }) {
  return <iframe className="h-full w-full rounded-md" src={src} title="Calendar" />;
}
