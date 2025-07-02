import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, Users, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-emerald-950/20 dark:via-blue-950/20 dark:to-purple-950/20"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-400/20 to-blue-400/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400/20 to-pink-400/20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-green-400/10 to-blue-400/10 blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Trophy className="absolute top-20 left-10 h-8 w-8 text-emerald-300/40 animate-bounce delay-300" />
        <Users className="absolute top-32 right-20 h-6 w-6 text-blue-300/40 animate-bounce delay-700" />
        <TrendingUp className="absolute bottom-40 left-20 h-7 w-7 text-purple-300/40 animate-bounce delay-1000" />
        <Star className="absolute bottom-20 right-10 h-5 w-5 text-yellow-300/40 animate-bounce delay-500" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 px-6 py-3 text-sm font-medium border border-emerald-200 dark:border-emerald-800 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="bg-gradient-to-r from-emerald-700 to-blue-700 bg-clip-text text-transparent font-semibold">
                  ⚽ Football Analytics Platform
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
              <span className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-1000">
                Track Your Favorite
              </span>
              <span className="block text-transparent bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 hover:from-emerald-500 hover:via-blue-500 hover:to-purple-500 transition-colors">
                Football Leagues
              </span>
            </h1>

            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              Stay updated with real-time standings, team statistics, and player performance across multiple football
              leagues worldwide. Experience the future of football analytics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 w-full sm:w-auto min-w-[200px] transition-all duration-300 hover:scale-105 group"
            >
              <a href="/leagues" className="flex items-center gap-2">
                <Trophy className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Browse Leagues
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-2 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 w-full sm:w-auto min-w-[200px] transition-all duration-300 hover:scale-105 hover:border-emerald-300 group"
            >
              <a href="/teams" className="flex items-center gap-2">
                <Users className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                View Teams
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000">
            <div className="text-center space-y-2 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-emerald-100 hover:bg-white/70 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-emerald-600">50+</div>
              <div className="text-sm text-muted-foreground">Active Leagues</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-blue-100 hover:bg-white/70 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-muted-foreground">Football Teams</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-purple-100 hover:bg-white/70 transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-purple-600">10K+</div>
              <div className="text-sm text-muted-foreground">Players Tracked</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
