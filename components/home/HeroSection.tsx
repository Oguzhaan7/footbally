import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-purple-950/20"></div>
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 px-4 py-2 text-sm font-medium border border-green-200 dark:border-green-800">
              ⚽ Football Analytics Platform
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
              Track Your Favorite
              <span className="block text-transparent bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text">
                Football Leagues
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl leading-relaxed">
              Stay updated with real-time standings, team statistics, and player
              performance across multiple football leagues worldwide.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg w-full sm:w-auto min-w-[180px]"
            >
              <a href="/leagues">Browse Leagues</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-2 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 w-full sm:w-auto min-w-[180px]"
            >
              <a href="/teams">View Teams</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
