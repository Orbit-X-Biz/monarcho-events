/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { AuthService } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await AuthService.login(email, password);

      if (response.success) {
        const user = AuthService.getUser();
        
        toast.success(
          `Welcome back, ${user?.name || "Admin"}!`,
          {
            description: "Login successful. Redirecting to dashboard...",
          }
        );

        // Small delay for better UX
        setTimeout(() => {
          router.push("/adminDashboard");
        }, 500);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Show specific error messages
      if (error.message.includes("Invalid email or password")) {
        toast.error("Invalid Credentials", {
          description: "The email or password you entered is incorrect.",
        });
      } else if (error.message.includes("deactivated")) {
        toast.error("Account Deactivated", {
          description: "Your account has been deactivated. Please contact the administrator.",
        });
      } else if (error.message.includes("network") || error.message.includes("fetch")) {
        toast.error("Connection Error", {
          description: "Unable to connect to the server. Please check your internet connection.",
        });
      } else {
        toast.error("Login Failed", {
          description: error.message || "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleLogin(e as any);
    }
  };

  return (
    <>
      {/* Blank div for navbar */}
      <div className="h-20 sm:h-24"></div>

      <div className="font-[Poppins] mt-36 flex items-center justify-center px-4">
        <div className="py-14 border border-[#926B48] rounded-lg flex flex-col items-center justify-center w-full max-w-md">
          <p className="text-zinc-950 text-2xl font-semibold mb-2">
            Admin Dashboard
          </p>
          {/* <p className="text-zinc-600 text-sm mb-8">
            Enter your credentials to access the dashboard
          </p> */}

          <form onSubmit={handleLogin} className="w-full px-8">
            <div className="mb-4">
              {/* <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 mb-2"
              >
                Email Address
              </label> */}
              <Input
                id="email"
                className="w-full border-[#E4E4E7]"
                placeholder="admin@monarchoevents.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                autoComplete="email"
                required
              />
            </div>

            <div className="mb-6">
              {/* <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700 mb-2"
              >
                Password
              </label> */}
              <div className="relative">
                <Input
                  id="password"
                  className="w-full border-[#E4E4E7] pr-10"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
                  disabled={loading}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-[#926B48] hover:bg-[#7a5a3c] text-zinc-50 transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* <div className="mt-6 text-center">
            <p className="text-xs text-zinc-500">
              Forgot your password?{" "}
              <a
                href="/admin/forgot-password"
                className="text-[#926B48] hover:underline"
              >
                Reset it here
              </a>
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
}