export function H1({ text, className }: { text: string; className?: string }) {
  return (
    <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}>
      {text}
    </h1>
  );
}
export function H2({ text, className }: { text: string; className?: string }) {
  return (
    <h2
      className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
    >
      {text}
    </h2>
  );
}
export function H3({ text, className }: { text: string; className?: string }) {
  return (
    <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}>{text}</h3>
  );
}
export function H4({ text, className }: { text: string; className?: string }) {
  return (
    <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}>{text}</h4>
  );
}
export function P({ text, className }: { text: string; className?: string }) {
  return <p className={`leading-7 not-first:mt-6 ${className}`}>{text}</p>;
}
export function Blockquote({ quote, className }: { quote: string; className?: string }) {
  return <blockquote className={`mt-6 border-l-2 pl-6 italic ${className}`}>{quote}</blockquote>;
}
export function List({
  items,
  className,
  childrenClassName,
}: {
  items: string[];
  className?: string;
  childrenClassName?: string;
}) {
  return (
    <ul className={`my-6 ml-6 list-disc [&>li]:mt-2 ${className}`}>
      {items.map((item, index) => {
        return (
          <li key={index} className={childrenClassName}>
            {item}
          </li>
        );
      })}
    </ul>
  );
}
export function InlineCode({ code, className }: { code: string; className?: string }) {
  return (
    <code
      className={`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className}`}
    >
      {code}
    </code>
  );
}
// A modal dialog that interrupts the user with important content and expects a response.
export function Lead({ text, className }: { text: string; className?: string }) {
  return <p className={`text-xl text-muted-foreground ${className}`}>{text}</p>;
}
export function Large({ text, className }: { text: string; className?: string }) {
  return <div className={`text-lg font-semibold ${className}`}>{text}</div>;
}
export function Small({ text, className }: { text: string; className?: string }) {
  return <small className={`text-sm font-medium leading-none ${className}`}>{text}</small>;
}
export function Muted({ text, className }: { text: string; className?: string }) {
  return <p className={`text-sm text-muted-foreground ${className}`}>{text}</p>;
}
