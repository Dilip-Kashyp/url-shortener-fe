"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PLAY_INTRO } from "@/app/constants";

type Props = {
  containerRef: React.RefObject<HTMLElement | null>;
  onClick?: () => void;
};

export default function Floating({
  containerRef,
  onClick,
}: Props) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = containerRef.current;
    const button = buttonRef.current;
    if (!hero || !button) return;

    const moveButton = (e: MouseEvent) => {
      gsap.to(button, {
        x: e.clientX - 70,
        y: e.clientY - 25,
        duration: 1,
        ease: "power3.out",
        scale: 1.05,
      });
    };

    const enter = () => {
      setVisible(true);
      gsap.to(button, { opacity: 1, duration: 0.3 });
      window.addEventListener("mousemove", moveButton);
    };

    const leave = () => {
      setVisible(false);
      gsap.to(button, { opacity: 0, duration: 0.3 });
      window.removeEventListener("mousemove", moveButton);
    };

    hero.addEventListener("mouseenter", enter);
    hero.addEventListener("mouseleave", leave);

    return () => {
      hero.removeEventListener("mouseenter", enter);
      hero.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousemove", moveButton);
    };
  }, [containerRef]);

  return (
    <div
      ref={buttonRef}
      onClick={onClick}
      className="fixed top-0 left-0 z-50 opacity-0 pointer-events-auto cursor-pointer"
      style={{ transform: "translate(-9999px, -9999px)" }}
    >
      <div className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full shadow-xl backdrop-blur-md transition-transform">
        <span className="font-medium text-sm">{PLAY_INTRO}</span>
      </div>
    </div>
  );
}