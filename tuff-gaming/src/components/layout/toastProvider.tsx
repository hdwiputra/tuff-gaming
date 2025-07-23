"use client";

import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import {
  Gamepad2,
  HeartOff,
  Lock,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

// Toast Provider Component
export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Global toast options
        duration: 3000,
        position: "top-center",
        style: {
          background: "#374151", // Gray-700 to match your design
          color: "#ffffff",
          borderRadius: "8px",
          padding: "16px 20px",
          fontSize: "14px",
          fontWeight: "600",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          border: "1px solid #4B5563",
          maxWidth: "400px",
        },
        // Custom styles for different types
        success: {
          duration: 3000,
          style: {
            background: "#ea580c", // Orange-600 to match your brand
            color: "white",
            border: "1px solid #dc2626",
          },
          iconTheme: {
            primary: "white",
            secondary: "#ea580c",
          },
        },
        error: {
          duration: 4000,
          style: {
            background: "#dc2626", // Red-600 for errors
            color: "white",
            border: "1px solid #b91c1c",
          },
          iconTheme: {
            primary: "white",
            secondary: "#dc2626",
          },
        },
        loading: {
          style: {
            background: "#6b7280", // Gray-500 for loading
            color: "white",
            border: "1px solid #9ca3af",
          },
          iconTheme: {
            primary: "white",
            secondary: "#6b7280",
          },
        },
      }}
    />
  );
}

// Toast Utility Functions
export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      icon: <CheckCircle size={20} color="white" />,
    });
  },

  error: (message: string) => {
    toast.error(message, {
      icon: <XCircle size={20} color="white" />,
    });
  },

  loading: (message: string) => {
    return toast.loading(message, {
      icon: <Loader2 size={20} color="white" className="animate-spin" />,
    });
  },

  // Custom wishlist-specific toasts
  wishlist: {
    added: (productName?: string) => {
      const message = productName
        ? `${productName} added to wishlist!`
        : "Product added to wishlist!";

      toast.success(message, {
        icon: <Gamepad2 size={20} color="white" />,
      });
    },

    removed: (productName?: string) => {
      const message = productName
        ? `${productName} removed from wishlist`
        : "Product removed from wishlist";

      toast.success(message, {
        style: {
          background: "#6b7280",
          border: "1px solid #9ca3af",
        },
        icon: <HeartOff size={20} color="white" />,
      });
    },

    loginRequired: () => {
      toast.error("Please log in to add items to your wishlist", {
        icon: <Lock size={20} color="white" />,
      });
    },
  },
};

// Re-export toast for basic usage
export { toast };
