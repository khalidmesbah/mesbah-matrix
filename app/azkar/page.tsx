import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { buttonVariants } from '@/components/ui/button';
import { wait } from '@/lib/utils';
import { promises as fs } from 'fs';
import Link from 'next/link';

export default async function AzkarPage() {
  const categoriesRes = await fs.readFile(process.cwd() + '/public/data/categories.json', 'utf8');
  await wait(2000);
  const categories = JSON.parse(categoriesRes);
  return (
    <Accordion type="multiple" defaultValue={['daily', 'misc']}>
      <AccordionItem value="daily">
        <AccordionTrigger>Daily</AccordionTrigger>
        <AccordionContent className="flex flex-col justify-start gap-1">
          {Object.keys(categories)
            .slice(0, 3)
            .map((k, i) => {
              return (
                <Link
                  className={buttonVariants({ variant: 'default' })}
                  href={`/azkar/${k}`}
                  key={i}
                >
                  {categories[k].ar}
                </Link>
              );
            })}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="misc">
        <AccordionTrigger>Misc</AccordionTrigger>
        <AccordionContent className="flex flex-wrap justify-end gap-1">
          {Object.keys(categories)
            .slice(3)
            .map((k, i) => {
              return (
                <Link
                  className={buttonVariants({ variant: 'default' })}
                  href={`/azkar/${k}`}
                  key={i}
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
