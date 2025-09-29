"use client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth(true);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#926B48] mx-auto"></div>
          <p className="mt-4 text-zinc-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  const handleLogout = () => {
    toast.success("Logged out successfully");
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-zinc-600 mt-1">
                Welcome back, {user.name}!
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-[#926B48] text-[#926B48] hover:bg-[#926B48] hover:text-white"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-zinc-600">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-600">Role</p>
              <p className="font-medium capitalize">{user.role}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-600">Last Login</p>
              <p className="font-medium">
                {new Date(user.lastLogin).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Add your dashboard content here */}
      </main>
    </div>
  );
}