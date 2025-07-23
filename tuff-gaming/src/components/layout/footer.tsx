import Link from "next/link";
import { Facebook, Instagram, Twitter, Twitch, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-12">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* SHOP */}
          <div>
            <h3 className="text-orange-500 font-bold uppercase tracking-wide mb-4">
              SHOP
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/mobile-controllers"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Mobile Controllers
                </Link>
              </li>
              <li>
                <Link
                  href="/ps5-controllers"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  PS5 Controllers
                </Link>
              </li>
              <li>
                <Link
                  href="/xbox-controllers"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Xbox Controllers
                </Link>
              </li>
              <li>
                <Link
                  href="/pc-controllers"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  PC Controllers
                </Link>
              </li>
              <li>
                <Link
                  href="/ps4-controllers"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  PS4 Controllers
                </Link>
              </li>
              <li>
                <Link
                  href="/refurbished"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Refurbished Controllers
                </Link>
              </li>
              <li>
                <Link
                  href="/accessories"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/gift-cards"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Store
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-orange-500 font-bold uppercase tracking-wide mb-4">
              SUPPORT
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Customer Support
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Returns & Repairs
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Track My Order
                </Link>
              </li>
              <li>
                <Link
                  href="/manuals"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  User Manuals
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-orange-500 font-bold uppercase tracking-wide mb-4">
              COMPANY
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  News & Press
                </Link>
              </li>
              <li>
                <Link
                  href="/vault"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  The Vault
                </Link>
              </li>
              <li>
                <Link
                  href="/patents"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Patents
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-sale"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Sale
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* ESPORTS */}
          <div>
            <h3 className="text-orange-500 font-bold uppercase tracking-wide mb-4">
              ESPORTS
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/game-guides"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Game Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-orange-500 font-bold uppercase tracking-wide mb-4">
              NEWSLETTER
            </h3>
            <p className="text-gray-300 text-sm max-w-sm mb-4">
              Sign up for promos, news and other cool stuff.
            </p>
            <div className="flex w-full max-w-sm">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-2 bg-white text-black text-sm rounded-l min-w-0"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 text-sm font-semibold rounded-r transition-colors cursor-pointer whitespace-nowrap">
                SIGN UP
              </button>
            </div>

            <div className="mt-8">
              <h4 className="text-orange-500 font-bold uppercase tracking-wide mb-4">
                CONNECT
              </h4>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Instagram className="w-6 h-6" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Twitter className="w-6 h-6" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Twitch className="w-6 h-6" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Youtube className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 pt-8 text-sm text-gray-400">
          <p>Copyright © 2010-2025 Corsair Memory, Inc.</p>
          <p>All Rights Reserved. All prices in USD.</p>
        </div>
      </div>
    </footer>
  );
}
