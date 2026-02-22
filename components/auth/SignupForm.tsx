"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { toast } from "sonner";

export function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        toast.success(response.message || "Account created successfully!");

        // Store the token if provided
        if (response.data?.token) {
          document.cookie = `user-token=${
            response.data.token
          }; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
          document.cookie = `user-role=${
            response.data.user.role
          }; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days

          // Use window.location for full page reload to ensure cookies are properly set
          window.location.href = "/jobs/add";
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <Input
          id="username"
          type="text"
          placeholder="johndoe"
          value={formData.username}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>
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
          minLength={6}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          disabled={isLoading}
          minLength={6}
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
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
