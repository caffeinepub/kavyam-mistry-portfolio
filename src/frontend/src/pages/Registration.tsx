import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterUser } from "@/hooks/useQueries";
import { Loader2, UserPlus } from "lucide-react";
import { useState } from "react";

const OWNER_USERNAME = "Akgamer4354";

interface RegistrationProps {
  onNavigateToLogin: () => void;
}

export default function Registration({ onNavigateToLogin }: RegistrationProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const registerMutation = useRegisterUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    if (username.toLowerCase() === OWNER_USERNAME.toLowerCase()) {
      setError(
        "This username is reserved. Please choose a different username.",
      );
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    try {
      await registerMutation.mutateAsync({ username, password });
      setSuccess(true);
      setTimeout(() => {
        onNavigateToLogin();
      }, 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (
        msg.includes("already in use") ||
        msg.includes("already taken") ||
        msg.includes("already exists")
      ) {
        setError("Username already taken. Please choose a different one.");
      } else if (
        msg.includes("required") ||
        msg.includes("empty") ||
        msg.includes("Empty")
      ) {
        setError("Username and password cannot be empty.");
      } else if (msg.includes("Actor not available")) {
        setError("Connection error. Please wait a moment and try again.");
      } else {
        setError(msg || "Registration failed. Please try again.");
      }
    }
  };

  const isLoading = registerMutation.isPending;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold minecraft-text mb-2">
            <span className="text-minecraft-green">AK</span>
            <span className="text-minecraft-gold">GAMER</span>
          </h1>
          <p className="text-cyan-400 text-lg minecraft-text">
            Portfolio Access
          </p>
        </div>

        <div className="minecraft-title-box p-8">
          <h2 className="text-2xl font-bold text-cyan-300 minecraft-text mb-6 text-center">
            <UserPlus className="inline w-6 h-6 mr-2" />
            Register
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label
                htmlFor="reg-username"
                className="text-gray-300 text-sm font-semibold minecraft-text"
              >
                Choose a Username
              </Label>
              <Input
                id="reg-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 bg-black border-cyan-700 text-cyan-300 focus:border-cyan-400 placeholder:text-gray-600"
                placeholder="Enter a username"
                disabled={isLoading || success}
                autoComplete="username"
              />
            </div>

            <div>
              <Label
                htmlFor="reg-password"
                className="text-gray-300 text-sm font-semibold minecraft-text"
              >
                Choose a Password
              </Label>
              <Input
                id="reg-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-black border-cyan-700 text-cyan-300 focus:border-cyan-400 placeholder:text-gray-600"
                placeholder="Enter a password"
                disabled={isLoading || success}
                autoComplete="new-password"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-950/60 border border-red-600 text-red-400 text-sm minecraft-text">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-950/60 border border-green-600 text-green-400 text-sm minecraft-text">
                ✓ Registration successful! Redirecting to login...
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || success}
              className="w-full backup-button text-base py-5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center border-t border-cyan-900 pt-5">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="text-cyan-400 hover:text-minecraft-gold font-semibold transition-colors minecraft-text underline"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
