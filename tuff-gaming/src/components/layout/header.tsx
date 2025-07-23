"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { showToast } from "@/components/layout/toastProvider";

// Helper function untuk cek auth synchronously
const getAuthStatus = (): boolean => {
  if (typeof window === "undefined") return false;
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("isLoggedIn="))
      ?.split("=")[1] === "true"
  );
};

export function Header() {
  const router = useRouter();
  // Set initial state langsung dari cookie (sync)
  const [isLoggedIn, setIsLoggedIn] = useState(() => getAuthStatus());

  // Update state ketika ada perubahan
  useEffect(() => {
    const checkAuth = () => {
      const newAuthStatus = getAuthStatus();
      setIsLoggedIn(newAuthStatus);
    };

    // Listen for storage events and focus events
    window.addEventListener("storage", checkAuth);
    window.addEventListener("focus", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("focus", checkAuth);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      setIsLoggedIn(false);
      showToast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggedIn(false);
      router.push("/login");
    }
  };

  return (
    <header className="bg-orange-500 text-white py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="absolute top-0 left-0 right-0 bg-gray-800 text-gray-400 text-xs py-0 px-6 flex justify-end gap-4">
        <Link href="#" className="hover:underline">
          English (USD)
        </Link>

        {/* Langsung render sesuai state tanpa loading */}
        {isLoggedIn ? (
          <>
            <Link href="#" className="hover:underline">
              Support
            </Link>
            <button
              onClick={handleLogout}
              className="hover:underline bg-transparent border-none outline-none cursor-pointer text-gray-400 px-2"
              style={{ background: "none" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">
              My Account
            </Link>
            <Link href="#" className="hover:underline">
              Support
            </Link>
          </>
        )}
      </div>

      {/* Main navigation */}
      <div className="flex items-center justify-between w-full mt-4">
        <Link href={"/"} className="flex items-center">
          <div style={{ width: 120, height: 30, position: "relative" }}>
            <Image
              src={"/logo.svg"}
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {/* Wishlist - langsung tampil kalau logged in */}
          {isLoggedIn && (
            <Link href={"/wishlist"} className="text-black hover:text-white">
              <Heart className="w-6 h-6" />
            </Link>
          )}
          <Link href="#" className="text-black hover:text-white">
            <ShoppingCart className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}
