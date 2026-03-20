import { Mail } from "lucide-react";
import { SiYoutube } from "react-icons/si";

export default function ContactIcons() {
  return (
    <div className="flex justify-center gap-4 mb-8">
      {/* Email Icon - 2x5cm */}
      <a
        href="mailto:mistrykavyam30@gmail.com"
        className="contact-icon-box group"
        title="Email: mistrykavyam30@gmail.com"
      >
        <div className="flex flex-col items-center justify-center h-full">
          <Mail className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          <span className="text-xs text-gray-400 mt-1">Email</span>
        </div>
      </a>

      {/* YouTube Icon - 2x5cm */}
      <a
        href="https://www.youtube.com/@akgamer1234"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-icon-box group"
        title="YouTube: @akgamer1234"
      >
        <div className="flex flex-col items-center justify-center h-full">
          <SiYoutube className="w-8 h-8 text-cyan-400 group-hover:text-red-500 transition-colors" />
          <span className="text-xs text-gray-400 mt-1">YouTube</span>
        </div>
      </a>
    </div>
  );
}
