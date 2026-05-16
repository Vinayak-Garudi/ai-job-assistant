"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
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
        if (response.data?.token) {
          const maxAge = 60 * 60 * 24 * 7;
          document.cookie = `user-token=${response.data.token}; path=/; max-age=${maxAge}`;
          document.cookie = `user-role=${response.data.user.role}; path=/; max-age=${maxAge}`;
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
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium text-slate-200">
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
          className="h-11 rounded-xl bg-white/8 border-white/15 text-white placeholder:text-slate-500 focus-visible:border-violet-400 focus-visible:ring-violet-400/30"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium text-slate-200">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="h-11 rounded-xl bg-white/8 border-white/15 text-white placeholder:text-slate-500 pr-10 focus-visible:border-violet-400 focus-visible:ring-violet-400/30"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => setShowPassword((v) => !v)}
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-11 rounded-xl bg-violet-600 hover:bg-violet-500 text-white border-0 font-semibold mt-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            Signing in…
          </span>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
