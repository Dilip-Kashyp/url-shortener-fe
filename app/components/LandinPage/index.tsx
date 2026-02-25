"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Book, Link  } from "lucide-react";
import { HERO_HEADING, HERO_BUTTON, TRY_IT_NOW_BUTTON, DOCS } from "@/app/constants";
import { Container, Typography, Button, Floating } from "../common";
import { useRouter } from "next/navigation";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

export default function LandinPage() {
  const headingRef = useRef<HTMLSpanElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const tl = gsap.timeline();

    // Typing animation
    tl.to(headingRef.current, {
      duration: 2,
      text: HERO_HEADING,
      ease: "none",
    });

  tl.fromTo(
      labelRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }
    );

    tl.fromTo(
      buttonsRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
      "<"
    );

    gsap.fromTo(
      videoSectionRef.current,
      {
        scale: 0.6,
        y: 150,
        borderRadius: 60,
        transformOrigin: "bottom center",
      },
      {
        scale: 1,
        y: 0,
        borderRadius: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: videoSectionRef.current,
          start: "top 100%",
          end: "bottom 100%",
          scrub: true
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
        <Container
          width="860px"
          className="h-screen flex flex-col items-center justify-center gap-8"
        >
          <div ref={labelRef} className="opacity-0">
            <Link size={50}/>
          </div>

          <Typography
            typographyProps={{
              level: 1,
              className: "text-center",
              style: { fontSize: 72, minHeight: "1.2em" },
            }}
          >
            <span ref={headingRef}></span>
          </Typography>

          <div ref={buttonsRef} className="flex gap-6 opacity-0">
            <Button
              buttonProps={{
                type: "primary",
                style: { padding: "20px 80px", borderRadius: "20px" },
                onClick: () => router.push("/dashboard")
              }}
            >
              {TRY_IT_NOW_BUTTON}
              <ArrowRight size={16} />
            </Button>

            <Button
              buttonProps={{
                type: "default",
                style: { padding: "20px 80px", borderRadius: "20px" },
              }}
            >
              {DOCS}
              <Book size={16} />
            </Button>
          </div>
        </Container>

      <div ref={heroRef}>
      <div ref={videoSectionRef}>
        <Container
          width="100%"
          height="100vh"
          className="flex flex-col items-center gap-8 bg-black rounded-[40px] overflow-hidden"
        >
          <Floating
              containerRef={heroRef}
            />
          <video
            src="/video.mp4"
            className="w-full h-full"
            autoPlay
            loop
            muted
            playsInline
          />
        </Container>
      </div>
      </div>
    </>
  );
}