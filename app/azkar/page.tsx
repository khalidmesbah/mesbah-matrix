import { buttonVariants } from "@/components/ui/button";
import { promises as fs } from "fs";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { wait } from "@/lib/utils";

export default async function AzkarPage() {
  const categoriesRes = await fs.readFile(
    process.cwd() + "/categories.json",
    "utf8",
  );
  await wait(2000);
  const categories = JSON.parse(categoriesRes);
  return (
    <Accordion type="multiple" defaultValue={["daily", "misc"]}>
      <AccordionItem value="daily">
        <AccordionTrigger>Daily</AccordionTrigger>
        <AccordionContent className="flex gap-1 flex-col justify-start">
          {Object.keys(categories)
            .slice(0, 3)
            .map((k) => {
              return (
                <Link
                  className={buttonVariants({ variant: "default" })}
                  href={`/azkar/${k}`}
                  key={k}
                >
                  {categories[k].ar}
                </Link>
              );
            })}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="misc">
        <AccordionTrigger>Misc</AccordionTrigger>
        <AccordionContent className="flex gap-1 flex-wrap justify-end">
          {Object.keys(categories)
            .slice(3)
            .map((k) => {
              return (
                <Link
                  className={buttonVariants({ variant: "default" })}
                  href={`/azkar/${k}`}
                  key={k}
                >
                  {categories[k].ar}
                </Link>
              );
            })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
