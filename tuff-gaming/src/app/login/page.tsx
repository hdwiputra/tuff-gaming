"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/layout/toastProvider"; // Adjust path as needed

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
        {
          body: JSON.stringify(formData),
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await response.json();

      if (response.ok) {
        showToast.success("Login successful! Redirecting...");
        router.push("/");
      } else {
        showToast.error(
          data.message ||
            "Login failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast.error(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-100 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase tracking-wide mb-12">
            CUSTOMER LOGIN
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Registered Customers Section */}
            <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col h-full">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1 pb-2 border-b border-gray-300">
                  Registered Customers
                </h2>

                <p className="text-gray-600 text-sm mb-6 mt-4">
                  If you have an account, sign in with your email address.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 flex flex-col flex-1"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="showPassword"
                    name="showPassword"
                    type="checkbox"
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    disabled={loading}
                  />
                  <label
                    htmlFor="showPassword"
                    className="text-sm text-gray-700"
                  >
                    Show Password
                  </label>
                </div>

                <div className="flex-1"></div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`font-bold py-2 px-6 rounded uppercase tracking-wide transition-colors ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
                    } text-white`}
                  >
                    {loading ? "SIGNING IN..." : "SIGN IN"}
                  </button>
                </div>
              </form>
            </div>

            {/* New Customers Section */}
            <div className="flex flex-col gap-8 h-full">
              <div className="bg-white p-8 rounded-lg shadow-sm flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-1 pb-2 border-b border-gray-300">
                  New Customers
                </h2>

                <p className="text-gray-600 text-sm mb-6 mt-4">
                  Creating an account has many benefits: check out faster, keep
                  more than one address, track orders and more.
                </p>

                <Link href="/register">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded uppercase tracking-wide transition-colors cursor-pointer">
                    CREATE AN ACCOUNT
                  </button>
                </Link>
              </div>

              {/* Support Section */}
              <div className="bg-white p-8 rounded-lg shadow-sm flex-1 flex flex-col">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1 pb-2 border-b border-gray-300">
                    Support
                  </h2>

                  <p className="text-gray-600 text-sm mb-6 mt-4">
                    Need service, support, or have pre-sales questions? Browse
                    our online support section for quick answers,
                    troubleshooting tips, manuals or to contact us.
                  </p>
                </div>

                <div className="flex-1"></div>

                <div>
                  <Link href="/support">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded uppercase tracking-wide transition-colors cursor-pointer">
                      VISIT SUPPORT
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
