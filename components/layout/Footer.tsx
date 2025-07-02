"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trophy, Users, BarChart3, Mail, Github, Twitter, Heart, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 text-white text-lg font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                  <Trophy className="h-6 w-6" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-orange-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                  Footbally
                </span>
                <span className="text-sm text-slate-400 font-medium">League Manager</span>
              </div>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
              The ultimate platform for managing football leagues, tracking team performance, and analyzing player
              statistics.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800 p-2">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800 p-2">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800 p-2">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <nav className="space-y-3">
              <Link
                href="/"
                className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/leagues"
                className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
              >
                <Trophy className="h-4 w-4" />
                <span>Leagues</span>
              </Link>
              <Link
                href="/teams"
                className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
              >
                <Users className="h-4 w-4" />
                <span>Teams</span>
              </Link>
            </nav>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Features</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">League Management</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Team Analytics</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Player Statistics</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Match Simulation</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Real-time Updates</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 text-slate-300">
                <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>Istanbul, Turkey</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Mail className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>hello@footbally.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>+90 555 123 4567</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <p className="text-sm text-slate-300">Stay updated with latest features</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <span>© 2025 Footbally. All rights reserved.</span>
            </div>

            <div className="flex items-center space-x-1 text-sm text-slate-400"></div>

            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
