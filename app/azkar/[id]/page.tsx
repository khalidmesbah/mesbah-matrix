import { List } from "@/components/typography";
import { promises as fs } from "fs";
export default async function CategoryPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const azkarRes = await fs.readFile(process.cwd() + "/azkar.json", "utf8");
  const azkar = JSON.parse(azkarRes);
  return (
    <div className="flex flex-col gap-1">
      {azkar[id].map((zer: any) => {
        return (
          <p dir="rtl" key={zer.zekr} className="p-1 border border-white">
            {zer.zekr}
          </p>
        );
      })}
    </div>
  );
}
