import { LeagueGrid } from "@/components/league/LeagueGrid";
import { ILeague } from "@/models/League";
import { Trophy, TrendingUp, Globe } from "lucide-react";

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
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950"></div>

      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400/10 to-blue-400/10 blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-purple-400/10 to-pink-400/10 blur-xl animate-pulse delay-1000"></div>
        <Trophy className="absolute top-32 right-20 h-8 w-8 text-emerald-200/30 animate-bounce delay-500" />
        <Globe className="absolute bottom-40 left-20 h-6 w-6 text-blue-200/30 animate-bounce delay-1000" />
        <TrendingUp className="absolute top-1/2 left-10 h-7 w-7 text-purple-200/30 animate-bounce delay-700" />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-block rounded-full bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 px-6 py-3 text-sm font-medium border border-emerald-200 dark:border-emerald-800 shadow-sm">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-emerald-600" />
                <span className="bg-gradient-to-r from-emerald-700 to-blue-700 bg-clip-text text-transparent font-semibold">
                  Top Leagues
                </span>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent dark:from-slate-100 dark:via-slate-300 dark:to-slate-100">
                Featured Leagues
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto max-w-[900px] text-muted-foreground text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore the most popular football leagues and dive deep into team standings, player statistics, and match
              analytics.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 w-full max-w-2xl">
            <div className="text-center space-y-2 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-emerald-100 hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <Trophy className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-600">{leagues.length}</div>
              <div className="text-sm text-muted-foreground">Active Leagues</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-blue-100 hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {leagues.reduce((acc, league) => acc + (league.teams?.length || 0), 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Teams</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-purple-100 hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">Live</div>
              <div className="text-sm text-muted-foreground">Real-time Updates</div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl mt-16">
          <LeagueGrid leagues={leagues} />
        </div>
      </div>
    </section>
  );
}
