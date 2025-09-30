/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      lastLogin: Date;
    };
    token: string;
  };
  errors?: string[];
}

interface StoredUser {
  id: string;
  email: string;
  name: string;
  role: string;
  lastLogin: Date;
}

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export class AuthService {
  // Login user
  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user data securely
      if (data.success && data.data) {
        this.setToken(data.data.token);
        this.setUser(data.data.user);
      }

      return data;
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // Logout user
  static logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      
      // Clear cookie by setting it to expire
      document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
  }

  // Store token securely
  static setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  // Get token
  static getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  // Store user data
  static setUser(user: StoredUser): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  // Get user data
  static getUser(): StoredUser | null {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem(USER_KEY);
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch (error) {
          console.error("Error parsing user data:", error);
          return null;
        }
      }
    }
    return null;
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Check if user has specific role
  static hasRole(role: string | string[]): boolean {
    const user = this.getUser();
    if (!user) return false;

    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  }

  // Get authorization header
  static getAuthHeader(): { Authorization: string } | {} {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Verify token validity
  static async verifyToken(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    try {
      const response = await fetch("/api/auth/verify", {
        method: "GET",
        headers: {
          ...this.getAuthHeader(),
        },
      });

      if (!response.ok) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error("Token verification error:", error);
      this.logout();
      return false;
    }
  }
}