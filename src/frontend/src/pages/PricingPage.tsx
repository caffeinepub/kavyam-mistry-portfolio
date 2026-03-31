import {
  ArrowLeft,
  CalendarDays,
  Gamepad2,
  Server,
  Settings2,
  Shield,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useState } from "react";

const BUSINESS_EMAIL = "buisnessak4354@gmail.com";

function getGmailComposeUrl(serviceName: string): string {
  const subject = encodeURIComponent(
    `Minecraft Server Development Inquiry – ${serviceName}`,
  );
  const body = encodeURIComponent(
    `Dear Kavyam (Akgamer4354),\n\nI hope this message finds you well.\n\nI came across your portfolio and I am interested in your "${serviceName}" service. I would like to hire you for my Minecraft server and discuss the details of this plan.\n\nCould you please provide me with more information regarding the scope of work, timeline, and any requirements needed to get started?\n\nI look forward to hearing from you.\n\nBest regards`,
  );
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${BUSINESS_EMAIL}&su=${subject}&body=${body}`;
}

interface ServiceCardData {
  icon: ReactNode;
  title: string;
  price: string;
  priceLabel: string;
  description: string;
  popular?: boolean;
}

const services: ServiceCardData[] = [
  {
    icon: <Server className="w-6 h-6" />,
    title: "Full Server Setup",
    price: "\u20B92,000",
    priceLabel: "one-time",
    description:
      "Complete Minecraft server setup from scratch — world generation, permissions, spawn protection, and everything configured and ready to launch.",
    popular: true,
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Monthly Server Manager / Moderator",
    price: "\u20B91,000",
    priceLabel: "per month",
    description:
      "Ongoing server moderation and management — anti-cheat oversight, player disputes, updates, and server health monitoring.",
  },
  {
    icon: <Settings2 className="w-6 h-6" />,
    title: "Plugin Management",
    price: "\u20B9900",
    priceLabel: "one-time",
    description:
      "Professional plugin installation, updates, conflict resolution, and full dependency management for your server.",
  },
  {
    icon: <CalendarDays className="w-6 h-6" />,
    title: "Seasonal Server Developing",
    price: "\u20B9700",
    priceLabel: "per season",
    description:
      "Custom seasonal content — unique events, season resets, limited-time mechanics, and themed gameplay experiences.",
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "All Plugin Config",
    price: "\u20B9600",
    priceLabel: "one-time",
    description:
      "Thorough configuration of all installed plugins — messages, permissions, features, integrations, and fine-tuning.",
  },
  {
    icon: <Gamepad2 className="w-6 h-6" />,
    title: "Normal SMP Setup",
    price: "\u20B9300",
    priceLabel: "one-time",
    description:
      "Lifesteal / Survival / Headsteal / Custom Plugin SMP — complete, balanced, and ready-to-play setup.",
  },
];

function ServiceCard({
  card,
  index,
}: { card: ServiceCardData; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOrderHovered, setIsOrderHovered] = useState(false);

  const cardBorder =
    isHovered || card.popular
      ? "4px solid rgba(255,215,0,0.9)"
      : "4px solid rgba(100,150,255,0.55)";

  const cardShadow = isHovered
    ? "0 0 0 3px #000, 0 14px 36px rgba(255,215,0,0.45)"
    : card.popular
      ? "0 0 0 3px #000, 0 8px 24px rgba(255,215,0,0.3)"
      : "0 0 0 3px #000, 0 8px 24px rgba(100,150,255,0.3)";

  const handleOrder = () => {
    const gmailUrl = getGmailComposeUrl(card.title);
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      data-ocid={`pricing.item.${index + 1}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col"
      style={{
        background: "rgba(0,18,38,0.93)",
        border: cardBorder,
        boxShadow: cardShadow,
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        transition:
          "border 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
      }}
    >
      {card.popular && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-0.5 text-xs font-bold whitespace-nowrap z-10"
          style={{
            background: "rgba(255,215,0,0.95)",
            color: "#000",
            fontFamily: "'Courier New', monospace",
            border: "2px solid #000",
            boxShadow: "0 2px 6px rgba(0,0,0,0.6)",
            letterSpacing: "0.08em",
          }}
        >
          {"★ MOST POPULAR"}
        </div>
      )}

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div
          className="w-12 h-12 flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(0,40,80,0.7)",
            border: "2px solid rgba(100,150,255,0.45)",
            color: card.popular
              ? "rgba(255,215,0,0.95)"
              : "rgba(100,200,255,0.9)",
          }}
        >
          {card.icon}
        </div>

        <h3
          className="text-sm font-bold leading-snug"
          style={{
            fontFamily: "'Courier New', monospace",
            color: "rgba(100,200,255,0.95)",
            textShadow: "1px 1px 0 rgba(0,0,0,0.8)",
            letterSpacing: "0.02em",
          }}
        >
          {card.title}
        </h3>

        <div className="flex items-end gap-2">
          <span
            className="text-3xl font-bold leading-none"
            style={{
              fontFamily: "'Courier New', monospace",
              color: "rgba(255,215,0,0.97)",
              textShadow: "2px 2px 0 rgba(0,0,0,0.8)",
            }}
          >
            {card.price}
          </span>
          <span
            className="text-xs pb-1"
            style={{
              color: "rgba(156,163,175,0.8)",
              fontFamily: "'Courier New', monospace",
            }}
          >
            / {card.priceLabel}
          </span>
        </div>

        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(100,150,255,0.3), transparent)",
          }}
        />

        <p
          className="text-xs flex-1 leading-relaxed"
          style={{
            color: "rgba(156,163,175,0.9)",
            fontFamily: "'Courier New', monospace",
          }}
        >
          {card.description}
        </p>

        <button
          type="button"
          onClick={handleOrder}
          data-ocid={`pricing.order.primary_button.${index + 1}`}
          className="mt-auto w-full py-3 font-bold text-sm"
          style={{
            fontFamily: "'Courier New', monospace",
            background: isOrderHovered
              ? "rgba(0,90,0,0.88)"
              : "rgba(0,55,0,0.7)",
            border: isOrderHovered
              ? "3px solid rgba(255,215,0,0.92)"
              : "3px solid rgba(76,175,80,0.75)",
            color: isOrderHovered
              ? "rgba(255,215,0,0.97)"
              : "rgba(76,175,80,0.95)",
            textShadow: "1px 1px 0 rgba(0,0,0,0.8)",
            boxShadow: isOrderHovered
              ? "0 0 16px rgba(255,215,0,0.4), 0 0 0 2px #000"
              : "0 0 0 2px #000",
            transform: isOrderHovered ? "translateY(-1px)" : "translateY(0)",
            transition: "all 0.15s ease",
            letterSpacing: "0.06em",
            cursor: "pointer",
          }}
          onMouseEnter={() => setIsOrderHovered(true)}
          onMouseLeave={() => setIsOrderHovered(false)}
        >
          Hire Now
        </button>
      </div>
    </motion.div>
  );
}

export default function PricingPage({ onBack }: { onBack: () => void }) {
  const [backHovered, setBackHovered] = useState(false);

  return (
    <div
      className="min-h-screen bg-black"
      data-ocid="pricing.page"
      style={{ fontFamily: "'Courier New', monospace" }}
    >
      <div
        className="sticky top-0 z-50 flex items-center gap-4 px-4 sm:px-6 py-4"
        style={{
          background: "rgba(0,0,0,0.97)",
          borderBottom: "3px solid rgba(100,150,255,0.35)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.9)",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          data-ocid="pricing.back.secondary_button"
          className="flex items-center gap-2 flex-shrink-0"
          style={{
            background: "rgba(0,35,70,0.8)",
            border: backHovered
              ? "2px solid rgba(255,215,0,0.85)"
              : "2px solid rgba(100,150,255,0.5)",
            color: backHovered
              ? "rgba(255,215,0,0.95)"
              : "rgba(100,200,255,0.9)",
            padding: "0.45rem 0.9rem",
            fontFamily: "'Courier New', monospace",
            fontWeight: "bold",
            fontSize: "0.82rem",
            cursor: "pointer",
            transition: "all 0.15s ease",
            letterSpacing: "0.04em",
          }}
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </button>

        <div
          style={{
            width: "1px",
            height: "24px",
            background: "rgba(100,150,255,0.25)",
          }}
        />

        <h1
          className="text-sm sm:text-base font-bold tracking-wide"
          style={{
            color: "rgba(100,200,255,0.95)",
            textShadow: "2px 2px 0 rgba(0,0,0,0.8)",
          }}
        >
          Services &amp; Pricing
        </h1>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4 tracking-wide"
            style={{
              color: "rgba(255,215,0,0.97)",
              textShadow:
                "3px 3px 0 rgba(0,0,0,0.9), 0 0 30px rgba(255,215,0,0.2)",
              letterSpacing: "0.06em",
            }}
          >
            SERVER DEVELOPMENT SERVICES
          </h2>

          <div
            className="mx-auto mb-5"
            style={{
              width: "180px",
              height: "3px",
              background:
                "linear-gradient(90deg, transparent, rgba(100,200,255,0.8), transparent)",
            }}
          />

          <p
            className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
            style={{
              color: "rgba(156,163,175,0.9)",
              fontFamily: "'Courier New', monospace",
            }}
          >
            Professional Minecraft server development by{" "}
            <span
              style={{ color: "rgba(100,200,255,0.97)", fontWeight: "bold" }}
            >
              Akgamer4354
            </span>
            . Click{" "}
            <span style={{ color: "rgba(76,175,80,0.95)", fontWeight: "bold" }}>
              Hire Now
            </span>{" "}
            on any plan to get started via Gmail.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <ServiceCard key={service.title} card={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="text-center py-5 px-6"
          style={{
            background: "rgba(0,18,38,0.75)",
            border: "2px solid rgba(100,150,255,0.25)",
            boxShadow: "0 0 0 2px #000",
          }}
        >
          <p
            className="text-xs leading-relaxed"
            style={{
              color: "rgba(156,163,175,0.85)",
              fontFamily: "'Courier New', monospace",
            }}
          >
            All prices are in Indian Rupees (INR) \u00b7 Contact via{" "}
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${BUSINESS_EMAIL}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(100,200,255,0.95)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {BUSINESS_EMAIL}
            </a>{" "}
            or{" "}
            <a
              href="https://discord.gg/fV2euMUDBr"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(100,200,255,0.95)",
                textDecoration: "underline",
              }}
            >
              Discord
            </a>{" "}
            for custom deals &amp; bulk orders.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
