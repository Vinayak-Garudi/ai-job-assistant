"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { AuthDivider } from "@/components/auth-divider";
import { DecorIcon } from "@/components/ui/decor-icon";
import { AtSignIcon, ArrowLeftIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import gsap from "gsap";

type AuthStep = "email" | "details";
type AuthMode = "login" | "signup";

export function LoginForm() {
  const [step, setStep] = useState<AuthStep>("email");
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const emailStepRef = useRef<HTMLDivElement>(null);
  const detailsStepRef = useRef<HTMLDivElement>(null);

  // Animate entrance on mount
  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll("[data-animate]");
    gsap.fromTo(
      els,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
      },
    );
  }, []);

  // Animate step transitions
  const animateStepIn = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>) => {
      if (!ref.current) return;
      const els = ref.current.querySelectorAll("[data-animate]");
      gsap.fromTo(
        els,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
        },
      );
    },
    [],
  );

  const goToDetails = () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    setStep("details");
    setTimeout(() => animateStepIn(detailsStepRef), 30);
  };

  const goBackToEmail = () => {
    setStep("email");
    setTimeout(() => animateStepIn(emailStepRef), 30);
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signup") {
        // Validate passwords
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match");
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          toast.error("Password must be at least 6 characters");
          setIsLoading(false);
          return;
        }

        const response = await api.post("auth/register", {
          username: formData.username,
          email,
          password: formData.password,
        });

        if (response.success) {
          toast.success(response.message || "Account created successfully!");
          if (response.data?.token) {
            const maxAge = 60 * 60 * 24 * 7;
            document.cookie = `user-token=${response.data.token}; path=/; max-age=${maxAge}`;
            document.cookie = `user-role=${response.data.user.role}; path=/; max-age=${maxAge}`;
            window.location.href = "/dashboard";
          }
        }
      } else {
        const response = await api.post("auth/login", {
          email,
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
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    window.location.href = `${apiUrl}auth/google`;
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden px-6 md:px-8">
      <div
        ref={containerRef}
        className={cn(
          "relative flex w-full max-w-sm flex-col justify-between p-6 md:p-8",
        )}
      >
        {/* Border lines */}
        <div className="absolute -inset-y-6 -left-px w-px bg-border" />
        <div className="absolute -inset-y-6 -right-px w-px bg-border" />
        <div className="absolute -inset-x-6 -top-px h-px bg-border" />
        <div className="absolute -inset-x-6 -bottom-px h-px bg-border" />
        <DecorIcon position="top-left" />
        <DecorIcon position="bottom-right" />

        {/* Email Step */}
        {step === "email" && (
          <div ref={emailStepRef} className="w-full max-w-sm space-y-8">
            <div className="flex flex-col space-y-1" data-animate>
              <h1 className="font-bold text-2xl tracking-wide">Join Now!</h1>
              <p className="text-base text-muted-foreground">
                Login or create your account.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2" data-animate>
                <InputGroup>
                  <InputGroupInput
                    placeholder="your.email@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        goToDetails();
                      }
                    }}
                  />
                  <InputGroupAddon align="inline-start">
                    <AtSignIcon />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <div data-animate>
                <Button
                  className="w-full"
                  size="sm"
                  type="button"
                  onClick={goToDetails}
                >
                  Continue With Email
                </Button>
              </div>

              <div data-animate>
                <AuthDivider>OR</AuthDivider>
              </div>

              <div className="grid grid-cols-2 gap-2" data-animate>
                <Button
                  className="w-full"
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                >
                  <GoogleIcon />
                  Google
                </Button>
                <Button className="w-full" type="button" variant="outline">
                  <GithubIcon />
                  GitHub
                </Button>
              </div>
            </div>

            <p className="text-muted-foreground text-sm" data-animate>
              By clicking continue, you agree to our{" "}
              <a
                className="underline underline-offset-4 hover:text-primary"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                className="underline underline-offset-4 hover:text-primary"
                href="#"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        )}

        {/* Details Step */}
        {step === "details" && (
          <div ref={detailsStepRef} className="w-full max-w-sm space-y-6">
            <div className="flex flex-col space-y-1" data-animate>
              <button
                type="button"
                onClick={goBackToEmail}
                className="mb-2 flex w-max items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeftIcon className="size-3.5" />
                Back
              </button>
              <h1 className="font-bold text-2xl tracking-wide">
                {mode === "login" ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-base text-muted-foreground">
                Continue as{" "}
                <span className="font-medium text-foreground">{email}</span>
              </p>
            </div>

            {/* Mode tabs */}
            <div className="flex gap-1 rounded-md bg-muted p-1" data-animate>
              <button
                type="button"
                onClick={() => setMode("login")}
                className={cn(
                  "flex-1 rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
                  mode === "login"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={cn(
                  "flex-1 rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
                  mode === "signup"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-2" data-animate>
                  <label htmlFor="username" className="text-sm font-medium">
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleDetailChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              )}

              <div className="space-y-2" data-animate>
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleDetailChange}
                    required
                    disabled={isLoading}
                    minLength={6}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="size-4" />
                    ) : (
                      <EyeIcon className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {mode === "signup" && (
                <div className="space-y-2" data-animate>
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleDetailChange}
                    required
                    disabled={isLoading}
                    minLength={6}
                  />
                </div>
              )}

              <div data-animate>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading
                    ? mode === "login"
                      ? "Signing In..."
                      : "Creating Account..."
                    : mode === "login"
                      ? "Sign In"
                      : "Create Account"}
                </Button>
              </div>
            </form>

            <div data-animate>
              <AuthDivider>OR</AuthDivider>
            </div>

            <div className="grid grid-cols-2 gap-2" data-animate>
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
              >
                <GoogleIcon />
                Google
              </Button>
              <Button className="w-full" type="button" variant="outline">
                <GithubIcon />
                GitHub
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const GoogleIcon = (props: React.ComponentProps<"svg">) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <g>
      <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
    </g>
  </svg>
);

const GithubIcon = (props: React.ComponentProps<"svg">) => (
  <svg fill="currentColor" viewBox="0 0 1024 1024" {...props}>
    <path
      clipRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
      fill="currentColor"
      fillRule="evenodd"
      transform="scale(64)"
    />
  </svg>
);
