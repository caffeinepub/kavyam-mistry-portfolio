import { Mail, RefreshCw, ShoppingBag, Trophy, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SiDiscord, SiYoutube } from "react-icons/si";
import { useMCTierData } from "../hooks/useMCTierData";

function TierModal({ onClose }: { onClose: () => void }) {
  const tierData = useMCTierData();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const tierIconSrc = (name: string) => {
    if (name === "crystal")
      return "/assets/image-019d4261-a6b1-76cf-b5ba-fa91a236c4d6.png";
    if (name === "mace")
      return "/assets/image-019d4261-a6bd-71d8-baa6-773f4950ddb2.png";
    return `https://mctier.com/tier_icons/${name}.svg`;
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClose();
      }}
    >
      <div
        className="relative max-w-sm w-full mx-4 rounded-3xl px-8 py-7 cursor-default"
        style={{
          background: "rgba(15,15,25,0.98)",
          border: "2px solid rgba(100,150,255,0.4)",
          boxShadow: "0 0 0 2px #000, 0 8px 32px rgba(100,150,255,0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-slate-300" />
        </button>

        <div className="w-full text-center flex flex-col items-center gap-3 mb-6">
          <span
            className="size-24 overflow-clip border-2 bg-slate-800 rounded-full flex items-center justify-center pt-3"
            style={{ borderColor: "#6b7280" }}
          >
            <img
              width="85"
              height="85"
              loading="eager"
              alt="Akgamer4354's Skin"
              src="https://render.crafty.gg/3d/bust/6bdad532-c3b6-4ee4-a4f7-bba80607e48c"
            />
          </span>
          <h1 className="text-2xl font-bold text-slate-300">Akgamer4354</h1>
          <h2
            className="flex gap-2 items-center justify-center font-medium text-base px-3 py-1 rounded-full"
            style={{
              color: "rgb(209,213,219)",
              background: "rgba(107,114,128,0.3)",
            }}
          >
            {tierData.loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              "🏅"
            )}{" "}
            {tierData.title}
          </h2>
          <h3 className="text-base font-bold text-slate-400">Asia</h3>

          <a
            href="https://namemc.com/profile/6bdad532-c3b6-4ee4-a4f7-bba80607e48c"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl text-sm p-2 transition-colors duration-100"
            style={{
              background: "rgba(30,30,50,0.8)",
              border: "1px solid rgba(100,150,255,0.3)",
              color: "#9ca3af",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#e5e7eb";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af";
            }}
          >
            <span
              className="pr-2 flex items-center justify-center border-r-2"
              style={{ borderColor: "rgba(100,150,255,0.3)" }}
            >
              <img
                height="20"
                width="20"
                alt="NameMC"
                className="object-contain rounded-sm"
                src="https://pt.minecraft.wiki/images/NameMC.png?f63c3"
              />
            </span>
            <span className="flex gap-1 items-center">
              NameMC
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                <path d="m21 3-9 9" />
                <path d="M15 3h6v6" />
              </svg>
            </span>
          </a>
        </div>

        {/* POSITION */}
        <div className="w-full mb-4">
          <h2 className="text-lg text-slate-400 font-medium mb-2">POSITION</h2>
          <div
            className="flex items-center gap-3 px-3 py-2 rounded-lg"
            style={{
              background: "rgba(30,30,50,0.8)",
              border: "1px solid rgba(100,150,255,0.3)",
            }}
          >
            <img
              width="24"
              height="24"
              alt="Overall"
              src="https://mctier.com/tier_icons/overall.svg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {tierData.loading ? (
              <RefreshCw className="w-6 h-6 text-slate-400 animate-spin" />
            ) : (
              <strong className="text-3xl italic text-white drop-shadow">
                {tierData.position.toLocaleString()}.
              </strong>
            )}
            <div className="flex flex-col">
              <strong className="text-lg text-white">OVERALL</strong>
              <span className="text-sm text-slate-400">
                ({tierData.loading ? "..." : `${tierData.points} points`})
              </span>
            </div>
          </div>
        </div>

        {/* TIERS */}
        <div className="w-full mb-4">
          <h2 className="text-lg text-slate-400 font-medium mb-2">TIERS</h2>
          <div
            className="flex gap-3 px-3 py-2 rounded-lg"
            style={{
              background: "rgba(30,30,50,0.8)",
              border: "1px solid rgba(100,150,255,0.3)",
            }}
          >
            {tierData.loading ? (
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Loading tiers...
              </div>
            ) : (
              tierData.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="w-10 h-14 relative flex flex-col items-center"
                >
                  <span
                    className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center overflow-clip border-2 p-1"
                    style={{ borderColor: "#6b7280" }}
                  >
                    <img
                      width="20"
                      height="20"
                      className="object-contain"
                      alt={tier.name}
                      src={tierIconSrc(tier.name)}
                    />
                  </span>
                  <strong
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs px-1 rounded-lg w-9 text-center"
                    style={{ background: "#4b5563", color: "#e5e7eb" }}
                  >
                    {tier.rating}
                  </strong>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Last updated */}
        {tierData.lastUpdated && (
          <p className="text-center text-xs text-slate-500 mb-3">
            {tierData.error ? "⚠ Using cached data" : "✓ Live data"} · updated{" "}
            {tierData.lastUpdated.toLocaleTimeString()}
          </p>
        )}

        <a
          href="https://mctiers.com/rankings/overall"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center text-xs text-cyan-400 hover:text-cyan-300 underline transition-colors"
        >
          View rankings on mctiers.com →
        </a>
      </div>
    </div>,
    document.body,
  );
}

export default function ContactIcons() {
  const [showTier, setShowTier] = useState(false);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <a
          href="mailto:buisnessak4354@gmail.com"
          className="contact-icon-box group"
          title="Email: buisnessak4354@gmail.com"
          data-ocid="contact.email.link"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <Mail className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <span className="text-xs text-gray-400 mt-1">Email</span>
          </div>
        </a>

        <a
          href="https://www.youtube.com/@akgamer1234"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-icon-box group"
          title="YouTube: @akgamer1234"
          data-ocid="contact.youtube.link"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <SiYoutube className="w-5 h-5 text-cyan-400 group-hover:text-red-500 transition-colors" />
            <span className="text-xs text-gray-400 mt-1">YouTube</span>
          </div>
        </a>

        <a
          href="https://discord.gg/fV2euMUDBr"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-icon-box group"
          title="Discord"
          data-ocid="contact.discord.link"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <SiDiscord className="w-5 h-5 text-cyan-400 group-hover:text-indigo-400 transition-colors" />
            <span className="text-xs text-gray-400 mt-1">Discord</span>
          </div>
        </a>

        <button
          type="button"
          onClick={() => setShowTier(true)}
          className="contact-icon-box group"
          title="Akgamer4354's Tier"
          data-ocid="contact.tier.button"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <Trophy className="w-5 h-5 text-cyan-400 group-hover:text-yellow-400 transition-colors" />
            <span className="text-xs text-gray-400 mt-1 text-center leading-tight px-1">
              Akgamer4354's tier
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            window.location.hash = "#/pricing";
          }}
          className="contact-icon-box group"
          title="View Pricing"
          data-ocid="contact.pricing.button"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <ShoppingBag className="w-5 h-5 text-cyan-400 group-hover:text-yellow-400 transition-colors" />
            <span className="text-xs text-gray-400 mt-1 text-center leading-tight px-1">
              Pricing
            </span>
          </div>
        </button>
      </div>

      {showTier && <TierModal onClose={() => setShowTier(false)} />}
    </>
  );
}
