"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export function SignupForm() {
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
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
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
        if (response.data?.token) {
          document.cookie = `user-token=${response.data.token}; path=/; max-age=${60 * 60 * 24 * 7}`;
          document.cookie = `user-role=${response.data.user.role}; path=/; max-age=${60 * 60 * 24 * 7}`;
          window.location.href = "/dashboard";
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "h-11 rounded-xl bg-white/8 border-white/15 text-white placeholder:text-slate-500 focus-visible:border-violet-400 focus-visible:ring-violet-400/30";
  const labelClass = "text-sm font-medium text-slate-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="username" className={labelClass}>Username</label>
        <Input id="username" type="text" placeholder="johndoe" value={formData.username} onChange={handleChange} required disabled={isLoading} className={inputClass} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className={labelClass}>Email</label>
        <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required disabled={isLoading} className={inputClass} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className={labelClass}>Password</label>
        <div className="relative">
          <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password} onChange={handleChange} required disabled={isLoading} minLength={6} className={`${inputClass} pr-10`} />
          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors" onClick={() => setShowPassword((v) => !v)} disabled={isLoading}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="confirmPassword" className={labelClass}>Confirm Password</label>
        <Input id="confirmPassword" type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required disabled={isLoading} minLength={6} className={inputClass} />
      </div>

      <Button type="submit" className="w-full h-11 rounded-xl bg-violet-600 hover:bg-violet-500 text-white border-0 font-semibold mt-2" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            Creating account…
          </span>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}
