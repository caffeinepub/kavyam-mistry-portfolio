import { useState } from "react";
import DiamondBlockBackground from "../components/DiamondBlockBackground";
import MinecraftCursorEffect from "../components/MinecraftCursorEffect";

interface OwnerLoginProps {
  onLoginSuccess: () => void;
}

export default function OwnerLogin({ onLoginSuccess }: OwnerLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (username === "Akgamer4354" && password === "akgamer7861") {
        onLoginSuccess();
      } else {
        setError("Invalid credentials");
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ cursor: "none" }}
    >
      <DiamondBlockBackground />
      <MinecraftCursorEffect />

      <div
        className="relative z-10 min-h-screen flex items-center justify-center px-4"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="minecraft-box-large p-8 w-full max-w-md"
          style={{ pointerEvents: "all", backgroundColor: "rgba(0,0,0,0.85)" }}
        >
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">⚡</div>
            <h1 className="text-2xl font-bold text-cyan-300 minecraft-text">
              Owner Access
            </h1>
            <p className="text-gray-500 text-xs minecraft-text mt-1">
              Restricted — Authorized Personnel Only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="owner-username"
                className="block text-cyan-400 text-sm minecraft-text mb-1"
              >
                Username
              </label>
              <input
                id="owner-username"
                data-ocid="owner_login.input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border-2 border-cyan-700 text-cyan-300 px-3 py-2 minecraft-text focus:outline-none focus:border-cyan-400"
                autoComplete="off"
                required
              />
            </div>

            <div>
              <label
                htmlFor="owner-password"
                className="block text-cyan-400 text-sm minecraft-text mb-1"
              >
                Password
              </label>
              <input
                id="owner-password"
                data-ocid="owner_login.input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border-2 border-cyan-700 text-cyan-300 px-3 py-2 minecraft-text focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            {error && (
              <div
                data-ocid="owner_login.error_state"
                className="text-red-400 text-sm minecraft-text border border-red-700 px-3 py-2 bg-red-950/30"
              >
                ⚠ {error}
              </div>
            )}

            <button
              data-ocid="owner_login.submit_button"
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-900 hover:bg-cyan-800 border-2 border-cyan-500 text-cyan-200 font-bold py-2 minecraft-text transition-colors disabled:opacity-50"
            >
              {isLoading ? "Authenticating..." : "LOGIN"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              data-ocid="owner_login.link"
              type="button"
              onClick={() => {
                window.location.hash = "";
              }}
              className="text-gray-500 hover:text-cyan-400 text-xs minecraft-text transition-colors"
            >
              ← Back to Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
