"use client";

// libs
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
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

interface AppIconProps {
  Icon: LucideIcon;
  delay?: number;
  x: number;
  y: number;
  spotlightX: number;
  spotlightY: number;
  resolvedTheme: string | undefined;
}

const AppIcon = ({
  Icon,
  x,
  y,
  spotlightX,
  spotlightY,
  resolvedTheme
}: AppIconProps) => {
  const distance = Math.sqrt(
    Math.pow(x - spotlightX, 2) + Math.pow(y - spotlightY, 2)
  );

  const spotlightRadius = 525;
  const intensity =
    distance < spotlightRadius ? 1 - distance / spotlightRadius : 0;
  const opacity = intensity > 0 ? intensity * 0.9 + 0.1 : 0.15;

  const getIconColor = () => {
    if (intensity > 0.3) {
      if (resolvedTheme === "dark") {
        return intensity > 0.6 ? "rgb(168, 85, 247)" : "rgb(139, 92, 246)";
      } else {
        return intensity > 0.6 ? "rgb(59, 130, 246)" : "rgb(96, 165, 250)";
      }
    }
    return resolvedTheme === "dark"
      ? "rgb(100, 100, 100)"
      : "rgb(160, 160, 160)";
  };

  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
        opacity,
        color: getIconColor(),
        transition: "opacity 0.15s ease, color 0.15s ease"
      }}
    >
      <Icon size={40} strokeWidth={1.5} />
    </div>
  );
};

interface IconPosition {
  Icon: LucideIcon;
  x: number;
  y: number;
  delay: number;
}

export default function AnimatedBackground() {
  const { resolvedTheme } = useTheme();
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0 });
  const [positions, setPositions] = useState<IconPosition[]>([]);
  const [mounted, setMounted] = useState(false);

  const icons: LucideIcon[] = [
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

  useEffect(() => {
    setMounted(true);

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 8 icons per row × 5 rows = 40 icons
    const iconsPerRow = 8;
    const numRows = 5;
    const colWidth = width / iconsPerRow;
    const rowHeight = height / numRows;
    // icon size is 40px, offset to center it in its cell
    const iconOffset = 20;

    const generatedPositions: IconPosition[] = [];
    let iconIndex = 0;

    for (let row = 0; row < numRows && iconIndex < icons.length; row++) {
      // Row 0, 2 → hàng lẻ (no offset); Row 1, 3 → hàng chẵn (offset by half colWidth)
      const isEvenRow = row % 2 === 1;
      const offsetX = isEvenRow ? colWidth / 2 : 0;

      for (let col = 0; col < iconsPerRow && iconIndex < icons.length; col++) {
        generatedPositions.push({
          Icon: icons[iconIndex],
          x: col * colWidth + colWidth / 2 + offsetX - iconOffset,
          y: row * rowHeight + rowHeight / 2 - iconOffset,
          delay: iconIndex * 0.3
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

      setSpotlightPosition({ x, y });
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-950" />
      <div
        className="pointer-events-none absolute h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: spotlightPosition.x,
          top: spotlightPosition.y
        }}
      >
        <div
          className="h-full w-full rounded-full blur-[150px]"
          style={{
            background:
              resolvedTheme === "dark"
                ? "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.3) 30%, transparent 70%)"
                : "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(147, 197, 253, 0.4) 30%, transparent 70%)"
          }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            resolvedTheme === "dark"
              ? [
                  "radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)"
                ].join(", ")
              : [
                  "radial-gradient(circle at 20% 20%, rgba(147, 197, 253, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 20%, rgba(196, 181, 253, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 80%, rgba(165, 180, 252, 0.15) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 80%, rgba(147, 197, 253, 0.15) 0%, transparent 50%)"
                ].join(", ")
        }}
      />
      {positions.map((pos, idx) => (
        <AppIcon
          key={idx}
          {...pos}
          spotlightX={spotlightPosition.x}
          spotlightY={spotlightPosition.y}
          resolvedTheme={resolvedTheme}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            resolvedTheme === "dark"
              ? "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)"
              : "linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />
    </div>
  );
}
