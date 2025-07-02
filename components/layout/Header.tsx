"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trophy, Users, BarChart3, Home, Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 shadow-sm">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/30 via-white/50 to-blue-50/30 backdrop-blur-sm"></div>

      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 relative z-10">
        <Link href="/" className="flex items-center space-x-3 group transition-all duration-300">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 text-white text-lg font-bold shadow-lg group-hover:shadow-xl group-hover:shadow-emerald-500/25 transition-all duration-300 transform group-hover:scale-105 group-hover:rotate-3">
              <Trophy className="h-5 w-5 group-hover:animate-bounce" />
            </div>
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse shadow-sm"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent group-hover:from-emerald-500 group-hover:via-green-500 group-hover:to-teal-500 transition-all duration-300">
              Footbally
            </span>
            <span className="text-xs text-muted-foreground font-medium group-hover:text-emerald-600 transition-colors duration-300">
              League Manager
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Button
            variant="ghost"
            asChild
            className="text-sm font-medium hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 hover:text-emerald-700 transition-all duration-300 relative group"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Home
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className="text-sm font-medium hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 hover:text-emerald-700 transition-all duration-300 relative group"
          >
            <Link href="/leagues" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Leagues
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className="text-sm font-medium hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 hover:text-emerald-700 transition-all duration-300 relative group"
          >
            <Link href="/teams" className="flex items-center gap-2">
              <Users className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Teams
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex border-2 border-emerald-200 text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-green-500 hover:text-white hover:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-emerald-200 hover:scale-105"
          >
            Get Started
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden hover:bg-emerald-50 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className={`h-4 w-4 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : ""}`} />
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white/90 backdrop-blur-md animate-in slide-in-from-top-2 duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 via-white/80 to-blue-50/50"></div>
          <nav className="container mx-auto px-4 py-4 space-y-2 relative z-10">
            <Button
              variant="ghost"
              asChild
              className="w-full justify-start text-sm font-medium hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 hover:text-emerald-700 transition-all duration-300"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="w-full justify-start text-sm font-medium hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 hover:text-emerald-700 transition-all duration-300"
            >
              <Link href="/leagues" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Leagues
              </Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="w-full justify-start text-sm font-medium hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 hover:text-emerald-700 transition-all duration-300"
            >
              <Link href="/teams" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Teams
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full border-2 border-emerald-200 text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-green-500 hover:text-white hover:border-emerald-500 transition-all duration-300"
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
