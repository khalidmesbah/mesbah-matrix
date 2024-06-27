import { buttonVariants } from "@/components/ui/button";
import { promises as fs } from "fs";
import Link from "next/link";

export default async function AzkarPage() {
  const categoriesRes = await fs.readFile(
    process.cwd() + "/categories.json",
    "utf8",
  );
  const categories = JSON.parse(categoriesRes);
  return (
    <div>
      <div className="flex gap-1 flex-wrap justify-end items-center">
        {Object.keys(categories).map((k) => {
          return (
            <Link
              className={buttonVariants({ variant: "default" })}
              href={`/azkar/${k}`}
              dir="rl"
              key={k}
            >
              {categories[k].ar}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
