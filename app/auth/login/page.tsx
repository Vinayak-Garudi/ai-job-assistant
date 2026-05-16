import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 p-4">
      {/* Blobs */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo mark */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-white mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-xl">AI Job Assistant</span>
          </div>
          <p className="text-slate-400 text-sm">Welcome back — let&apos;s land that role</p>
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          <CardHeader className="pb-2 pt-6">
            <h1 className="text-2xl font-bold text-white text-center">Sign in</h1>
          </CardHeader>
          <CardContent className="pb-4">
            <LoginForm />
          </CardContent>
          <CardFooter className="pb-6 flex justify-center">
            <p className="text-sm text-slate-400">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                Sign up free
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
