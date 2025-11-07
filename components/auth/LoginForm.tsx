"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        toast.success(response.message || "Login successful!");

        console.log("Login response data:", response.data);

        // Store the token
        if (response.data?.token) {
          const maxAge = 60 * 60 * 24 * 7; // 7 days
          console.log(
            "Storing user-token and user-role cookies",
            response.data.token,
            response.data.user.role
          );
          document.cookie = `user-token=${response.data.token}; path=/; max-age=${maxAge}`;
          document.cookie = `user-role=${response.data.user.role}; path=/; max-age=${maxAge}`;

          // Use window.location for full page reload to ensure cookies are properly set
          window.location.href = "/dashboard";
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="showPassword"
          className="w-4 h-4 rounded border-gray-300 cursor-pointer"
          checked={showPassword}
          onChange={(e) => setShowPassword(e.target.checked)}
          disabled={isLoading}
        />
        <label htmlFor="showPassword" className="text-sm cursor-pointer">
          Show password
        </label>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}
