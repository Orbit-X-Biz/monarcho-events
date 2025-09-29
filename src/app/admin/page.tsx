/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { adminLogin } from "@/services/adminService";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { toast } from "sonner";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //   const handleLogin = async () => {
  //     if (!email || !password) {
  //       toast.error("Please enter both email and password");
  //       return;
  //     }

  //     setLoading(true);
  //     try {
  //       const { token } = await adminLogin(email, password);
  //       localStorage.setItem("adminToken", token);
  //       toast.success("Login successful");
  //       router.push("/adminDashboard");
  //     } catch (err: any) {
  //       toast.error(`Login Failed`);
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <>
      {/* Blank div for navbar */}
      <div className="h-20 sm:h-24"></div>

      <div className="font-[Poppins] mt-36 flex items-center justify-center">
        <div className="py-14 border border-[#926B48] rounded-lg flex flex-col items-center justify-center w-2/6">
          <p className="text-zinc-950 text-2xl font-semibold">Admin Dashboard</p>
          <Input
            className="w-1/2 border-[#E4E4E7] mt-7"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            className="w-1/2 border-[#E4E4E7] mt-3"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Button
            onClick={() => {}}
            disabled={loading}
            className="cursor-pointer mt-3 bg-[#926B48] w-1/2 text-zinc-50"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </div>
    </>
  );
}
