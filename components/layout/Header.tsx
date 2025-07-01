export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center">
          <a className="flex items-center space-x-3" href="/">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-blue-600 text-white text-xl font-bold shadow-lg">
              ⚽
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Footbally
            </span>
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a
            className="transition-colors text-foreground/70 hover:text-foreground px-3 py-2 rounded-md hover:bg-accent"
            href="/"
          >
            Home
          </a>
          <a
            className="transition-colors text-foreground/70 hover:text-foreground px-3 py-2 rounded-md hover:bg-accent"
            href="/leagues"
          >
            Leagues
          </a>
          <a
            className="transition-colors text-foreground/70 hover:text-foreground px-3 py-2 rounded-md hover:bg-accent"
            href="/teams"
          >
            Teams
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <a
            className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-lg"
            href="/leagues"
            title="Leagues"
          >
            📊
          </a>
          <a
            className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-lg"
            href="/teams"
            title="Teams"
          >
            👥
          </a>
        </div>
      </div>
    </header>
  );
}
