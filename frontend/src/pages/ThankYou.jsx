import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2 } from "lucide-react";

export default function ThankYou() {
  useEffect(() => {
    const end = Date.now() + 1200;
    const frame = () => {
      confetti({
        particleCount: 5,
        spread: 80,
        startVelocity: 28,
        origin: { x: Math.random(), y: 0.65 },
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* 🔵 Full blue/aqua background (same vibe as submit) */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-cyan-400 to-emerald-300" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-white/20 blur-3xl" />

      <section className="relative mx-auto max-w-xl px-4 py-10 min-h-screen grid place-items-center">
        <div className="w-full rounded-3xl bg-white/95 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
          <div className="p-6 sm:p-8 border-b border-sky-100">
  <div className="flex items-center gap-3">
    <img
      src="/logo.png"
      alt="Otoddy"
      className="h-10 w-10 rounded-xl object-contain"
    />

    <div className="flex-1">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
        Thank you for riding with Otoddy
      </h1>
      <p className="mt-1 text-sm sm:text-base text-slate-600">
        Your review has been submitted successfully.
      </p>
    </div>

    <span className="text-xs text-slate-500">Otoddy</span>
  </div>
</div>


          <div className="p-6 sm:p-8">
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
              <p className="text-slate-700">
                We use feedback to improve driver quality and service experience.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                You can close this page now.
              </p>
            </div>

            <div className="mt-6 text-center text-xs text-slate-500">
              Thanks for supporting Otoddy.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
