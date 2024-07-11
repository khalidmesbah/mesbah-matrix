import Zekr from "@/components/zekr";
import { ZekrType } from "@/types";
import { promises as fs } from "fs";

export default async function CategoryPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const azkarRes = await fs.readFile(
    process.cwd() + "/public/data/azkar.json",
    "utf8",
  );
  const azkar = JSON.parse(azkarRes);
  const categoriesRes = await fs.readFile(
    process.cwd() + "/public/data/categories.json",
    "utf8",
  );
  const categories = JSON.parse(categoriesRes);
  return (
    <div>
      <h2
        className="croll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
        dir="rtl"
      >
        {categories[id].ar}
      </h2>
      <div className="flex flex-col gap-1">
        {azkar[id].map((zekr: ZekrType) => {
          return <Zekr zekr={zekr} key={zekr.id} />;
        })}
      </div>
    </div>
  );
}
