import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== "undefined"
      ? window.location.hostname
      : "kavyam-portfolio",
  );

  return (
    <footer className="bg-gray-950 border-t-4 border-cyan-600 py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 flex items-center justify-center gap-2">
          <span>© {currentYear} Kavyam Mistry. Built with</span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <span>using</span>
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
