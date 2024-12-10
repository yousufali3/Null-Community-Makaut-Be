import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";
import axios from "axios";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-4">
      <Card className="w-full max-w-md p-8 bg-[#1f1f1f] border-[#2a2a2a]">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#00ff88] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
            <LockKeyhole className="w-6 h-6 text-[#00ff88]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#2a2a2a] border-[#3a3a3a] focus:border-[#00ff88] transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#2a2a2a] border-[#3a3a3a] focus:border-[#00ff88] transition-colors"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              className="border-[#3a3a3a] data-[state=checked]:bg-[#00ff88] data-[state=checked]:border-[#00ff88]"
            />
            <Label htmlFor="remember" className="text-sm text-gray-400">
              Remember me
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#00ff88] hover:bg-[#00ff88]/90 text-black transition-colors"
          >
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}
