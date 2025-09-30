"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthService } from "@/lib/auth";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  lastLogin: Date;
}

export function useAuth(requireAuth: boolean = true) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = AuthService.isAuthenticated();
      const userData = AuthService.getUser();

      if (!isAuthenticated || !userData) {
        if (requireAuth && pathname !== "/admin/login") {
          router.push("/admin/login");
        }
        setLoading(false);
        return;
      }

      // Verify token is still valid
      const isValid = await AuthService.verifyToken();
      
      if (!isValid) {
        if (requireAuth) {
          router.push("/admin/login");
        }
        setUser(null);
      } else {
        setUser(userData);
      }

      setLoading(false);
    };

    checkAuth();
  }, [requireAuth, router, pathname]);

  const logout = () => {
    AuthService.logout();
    setUser(null);
    router.push("/admin/login");
  };

  return { user, loading, logout, isAuthenticated: !!user };
}