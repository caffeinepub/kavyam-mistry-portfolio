import { useState } from 'react';
import { Loader2, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useAuthenticateUser } from '@/hooks/useQueries';

const OWNER_USERNAME = 'Akgamer4354';
const OWNER_PASSWORD = 'akgamer7861';

interface LoginProps {
  onNavigateToRegister: () => void;
}

export default function Login({ onNavigateToRegister }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const authenticateMutation = useAuthenticateUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    // Check owner credentials first (exact case-sensitive match)
    if (username === OWNER_USERNAME && password === OWNER_PASSWORD) {
      login(username, 'owner');
      return;
    }

    // For all other users, authenticate via backend but always assign 'visitor' role
    try {
      await authenticateMutation.mutateAsync({ username, password });
      // Regardless of what the backend returns, non-owner users are always visitors
      login(username, 'visitor');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('User not found')) {
        setError('User not found. Please register first.');
      } else if (msg.includes('password')) {
        setError('Incorrect password. Please try again.');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    }
  };

  const isLoading = authenticateMutation.isPending;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold minecraft-text mb-2">
            <span className="text-minecraft-green">AK</span>
            <span className="text-minecraft-gold">GAMER</span>
          </h1>
          <p className="text-cyan-400 text-lg minecraft-text">Portfolio Access</p>
        </div>

        {/* Login Box */}
        <div className="minecraft-title-box p-8">
          <h2 className="text-2xl font-bold text-cyan-300 minecraft-text mb-6 text-center">
            <LogIn className="inline w-6 h-6 mr-2" />
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="username" className="text-gray-300 text-sm font-semibold minecraft-text">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 bg-black border-cyan-700 text-cyan-300 focus:border-cyan-400 placeholder:text-gray-600"
                placeholder="Enter your username"
                disabled={isLoading}
                autoComplete="username"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300 text-sm font-semibold minecraft-text">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-black border-cyan-700 text-cyan-300 focus:border-cyan-400 placeholder:text-gray-600"
                placeholder="Enter your password"
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-950/60 border border-red-600 text-red-400 text-sm minecraft-text">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full backup-button text-base py-5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center border-t border-cyan-900 pt-5">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <button
                onClick={onNavigateToRegister}
                className="text-cyan-400 hover:text-minecraft-gold font-semibold transition-colors minecraft-text underline"
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
