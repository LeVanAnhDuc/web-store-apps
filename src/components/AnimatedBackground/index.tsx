"use client";

// libs
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  Mail,
  Users,
  Music,
  Video,
  Camera,
  Image,
  Film,
  Headphones,
  Calendar,
  FileText,
  BookOpen,
  PenTool,
  Briefcase,
  ShoppingCart,
  ShoppingBag,
  CreditCard,
  Package,
  Map,
  Navigation,
  Globe,
  Plane,
  Car,
  Settings,
  Search,
  Bell,
  Lock,
  Shield,
  Wifi,
  Zap,
  Cpu,
  Gamepad2,
  Star,
  Heart,
  Bookmark,
  DollarSign,
  BarChart2,
  TrendingUp,
  Smartphone,
  Monitor
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Defined outside component — never recreated
const ALL_ICONS: LucideIcon[] = [
  // Social & Communication
  MessageCircle,
  Mail,
  Users,
  Bell,
  Search,
  // Media & Entertainment
  Music,
  Video,
  Camera,
  Image,
  Film,
  Headphones,
  Gamepad2,
  Star,
  // Productivity & Work
  Calendar,
  FileText,
  BookOpen,
  PenTool,
  Briefcase,
  // Shopping & Finance
  ShoppingCart,
  ShoppingBag,
  CreditCard,
  Package,
  DollarSign,
  BarChart2,
  TrendingUp,
  // Travel & Navigation
  Map,
  Navigation,
  Globe,
  Plane,
  Car,
  // System & Utility
  Settings,
  Lock,
  Shield,
  Wifi,
  Zap,
  Cpu,
  Smartphone,
  Monitor,
  // Lifestyle
  Heart,
  Bookmark
];

interface IconPosition {
  Icon: LucideIcon;
  x: number;
  y: number;
}

export default function AnimatedBackground() {
  const { resolvedTheme } = useTheme();
  const [positions, setPositions] = useState<IconPosition[]>([]);
  const [mounted, setMounted] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const maskLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const iconsPerRow = 8;
    const numRows = 5;
    const colWidth = width / iconsPerRow;
    const rowHeight = height / numRows;
    const iconOffset = 20;

    const generatedPositions: IconPosition[] = [];
    let iconIndex = 0;

    for (let row = 0; row < numRows && iconIndex < ALL_ICONS.length; row++) {
      const isEvenRow = row % 2 === 1;
      const offsetX = isEvenRow ? colWidth / 2 : 0;

      for (
        let col = 0;
        col < iconsPerRow && iconIndex < ALL_ICONS.length;
        col++
      ) {
        generatedPositions.push({
          Icon: ALL_ICONS[iconIndex],
          x: col * colWidth + colWidth / 2 + offsetX - iconOffset,
          y: row * rowHeight + rowHeight / 2 - iconOffset
        });
        iconIndex++;
      }
    }

    setPositions(generatedPositions);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const duration = 9890;
    const startTime = Date.now();
    let animationId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;
      const angle = progress * Math.PI * 2;
      const scale = Math.sin(angle);

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const x = centerX + Math.cos(angle) * (window.innerWidth * 0.35);
      const y = centerY + scale * (window.innerHeight * 0.35);

      // Direct DOM manipulation — zero React re-renders
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${x}px`;
        spotlightRef.current.style.top = `${y}px`;
      }
      if (maskLayerRef.current) {
        const mask = `radial-gradient(circle 525px at ${x}px ${y}px, white 0%, transparent 100%)`;
        maskLayerRef.current.style.maskImage = mask;
        maskLayerRef.current.style.webkitMaskImage = mask;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [mounted]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  const highlightColor = isDark ? "rgb(168, 85, 247)" : "rgb(59, 130, 246)";
  const dimColor = isDark ? "rgb(100, 100, 100)" : "rgb(160, 160, 160)";

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-950" />
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2"
        style={{ left: 0, top: 0 }}
      >
        <div
          className="h-full w-full rounded-full blur-[150px]"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(168,85,247,0.3) 30%, transparent 70%)"
              : "radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(147,197,253,0.4) 30%, transparent 70%)"
          }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? [
                "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.08) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(168,85,247,0.08) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(59,130,246,0.08) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 80%, rgba(99,102,241,0.08) 0%, transparent 50%)"
              ].join(", ")
            : [
                "radial-gradient(circle at 20% 20%, rgba(147,197,253,0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(196,181,253,0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(165,180,252,0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 80%, rgba(147,197,253,0.15) 0%, transparent 50%)"
              ].join(", ")
        }}
      />
      <div className="absolute inset-0">
        {positions.map((pos, idx) => (
          <div
            key={idx}
            className="absolute"
            style={{ left: pos.x, top: pos.y, opacity: 0.15, color: dimColor }}
          >
            <pos.Icon size={40} strokeWidth={1.5} />
          </div>
        ))}
      </div>
      <div
        ref={maskLayerRef}
        className="absolute inset-0"
        style={{ maskImage: "none", WebkitMaskImage: "none" }}
      >
        {positions.map((pos, idx) => (
          <div
            key={idx}
            className="absolute"
            style={{ left: pos.x, top: pos.y, color: highlightColor }}
          >
            <pos.Icon size={40} strokeWidth={1.5} />
          </div>
        ))}
      </div>
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: isDark
            ? "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)"
            : "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />
    </div>
  );
}
