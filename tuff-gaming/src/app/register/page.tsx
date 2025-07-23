"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { showToast } from "@/components/layout/toastProvider"; // Adjust path as needed
import { useRouter } from "next/navigation";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showToast.success("Account created successfully! You can now sign in.");
        router.push("/login");
      } else {
        // Handle error response
        showToast.error(
          data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
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
            CREATE NEW CUSTOMER ACCOUNT
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Create Account Section */}
            <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col h-full">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1 pb-2 border-b border-gray-300">
                  Personal Information
                </h2>

                <p className="text-gray-600 text-sm mb-6 mt-4">
                  Please fill in the information below to create your account.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 flex flex-col flex-1"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose a unique username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
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
                    minLength={5}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter a password (min 5 characters)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 5 characters long
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="showPassword"
                    name="showPassword"
                    type="checkbox"
                    disabled={loading}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded disabled:cursor-not-allowed"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
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
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded uppercase tracking-wide transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Customer Section */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-1 pb-2 border-b border-gray-300">
                  Already Have an Account?
                </h2>

                <p className="text-gray-600 text-sm mb-6 mt-4">
                  If you already have an account with us, please sign in to
                  access your account and view your order history.
                </p>

                <Link href="/login">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded uppercase tracking-wide transition-colors cursor-pointer">
                    SIGN IN
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
