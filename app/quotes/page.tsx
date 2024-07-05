import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  FilterIcon,
  ListOrderedIcon,
  RefreshCcwIcon,
  SearchIcon,
  Star,
} from "lucide-react";
import Quote from "@/components/quote";
import { SVGProps } from "react";
import { QuoteType } from "@/types";
type IconProps = SVGProps<SVGSVGElement>;

// TODO: add favourite button
// TODO: add share button
// TODO: add copy button
// TODO: add quote component
// TODO: user select none
// TODO: create a custom quote

async function getQuoteOfTheDay() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUOTES_API}/quotes/random`,
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch quotes");
  }

  return res.json();
}

async function getQuotes() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUOTES_API}/quotes/random?limit=3`,
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch quotes");
  }

  return res.json();
}

export default async function QuotePage() {
  const quotes: QuoteType[] = await getQuotes();
  const quoteOfTheDay: QuoteType[] = await getQuoteOfTheDay();
  console.log(quoteOfTheDay);
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      <main className="container mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 space-y-12 md:space-y-16 lg:space-y-20">
        <section>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-primary rounded-full px-4 py-1 text-primary-foreground text-sm font-medium">
              Quote of the Day
            </div>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-semibold max-w-3xl">
              &quot;{quoteOfTheDay[0].content}&quot;
            </blockquote>

            <div className="flex items-center gap-1 justify-between mt-4">
              <cite className="text-muted-foreground text-sm font-medium">
                - {quoteOfTheDay[0].author}
              </cite>
              <Button variant={"ghost"}>
                <Star className={`${false && "fill-foreground"}`} />
              </Button>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 flex items-center justify-between">
            Favourite Quotes
            <Button
              variant="outline"
              className="ml-4 rounded-md"
              // onClick={() => fetchNewQuotes()}
            >
              Show All
            </Button>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotes.map((q) => (
              <Quote quote={q} isFavourite={true} key={q._id} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 flex items-center justify-between">
            Random Quote
            <Button
              variant="outline"
              className="ml-4 rounded-md"
              // onClick={() => fetchNewQuotes()}
            >
              <RefreshCcwIcon className="w-5 h-5 text-muted-foreground" />
              <span className="sr-only">Fetch New Quote</span>
            </Button>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            quote
          </div>
        </section>
        <section>
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Explore Quotes
              </h2>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="text-sm">
                      <FilterIcon className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Inspirational
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Motivational
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Funny</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="text-sm">
                      <ListOrderedIcon className="w-4 h-4 mr-2" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value="popular">
                      <DropdownMenuRadioItem value="popular">
                        Popular
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="newest">
                        Newest
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="oldest">
                        Oldest
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for quotes..."
                className="pl-12 pr-4 py-3 rounded-lg bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              temp
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// function SearchIcon(props: IconProps) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="11" cy="11" r="8" />
//       <path d="m21 21-4.3-4.3" />
//     </svg>
//   );
// }

// function FilterIcon(props: IconProps) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
//     </svg>
//   );
// }
//
// function ListOrderedIcon(props: IconProps) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="10" x2="21" y1="6" y2="6" />
//       <line x1="10" x2="21" y1="12" y2="12" />
//       <line x1="10" x2="21" y1="18" y2="18" />
//       <path d="M4 6h1v4" />
//       <path d="M4 10h2" />
//       <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
//     </svg>
//   );
// }
