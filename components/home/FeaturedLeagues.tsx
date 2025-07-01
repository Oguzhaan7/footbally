import { LeagueGrid } from "@/components/league/LeagueGrid";
import { ILeague } from "@/models/League";

interface FeaturedLeaguesProps {
  leagues: Array<
    ILeague & {
      _id: string;
      teams?: Array<{
        _id: string;
        name: string;
      }>;
    }
  >;
}

export function FeaturedLeagues({ leagues }: FeaturedLeaguesProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-4xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Featured Leagues
            </h2>
            <p className="mx-auto max-w-[900px] text-muted-foreground text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore the most popular football leagues and dive deep into team
              standings and statistics.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl mt-12">
          <LeagueGrid leagues={leagues} />
        </div>
      </div>
    </section>
  );
}
