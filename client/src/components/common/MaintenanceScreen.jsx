import React from "react";
import { LuWrench } from "react-icons/lu";

const MaintenanceScreen = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground flex items-center justify-center px-6 selection:bg-brand/20">
      {/* Ambient background */}
      <div
        aria-hidden
        className="
          absolute left-1/2 top-1/2
          h-72 w-72 -translate-x-1/2 -translate-y-1/2
          rounded-full bg-brand/5 blur-[110px]
          pointer-events-none
        "
      />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="
          absolute inset-0 opacity-[0.025]
          bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
          bg-[size:48px_48px]
          pointer-events-none
        "
      />

      <section className="relative z-10 w-full max-w-lg text-center">
        {/* Status mark */}
        <div className="mb-10 flex justify-center">
          <div className="relative flex h-20 w-20 items-center justify-center">
            {/* Orbit ring */}
            <div
              aria-hidden
              className="
                absolute inset-0 rounded-full
                border border-border/60
              "
            />

            <div
              aria-hidden
              className="
                absolute inset-1 rounded-full
                border border-brand/10
                animate-[spin_18s_linear_infinite]
              "
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand/60" />
            </div>

            {/* Icon */}
            <div
              className="
                relative flex h-12 w-12 items-center justify-center
                rounded-full border border-brand/20
                bg-surface
                text-brand
                shadow-[0_0_40px_rgba(var(--kui-brand),0.08)]
              "
            >
              <LuWrench
                size={22}
                strokeWidth={1.6}
                className="animate-[maintenance-tool_4s_ease-in-out_infinite]"
              />
            </div>
          </div>
        </div>

        {/* Identity */}
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-brand">
          Splendid Developer
        </p>

        <h1 className="mb-5 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          A little work in progress.
        </h1>

        <p className="mx-auto max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
          I'm refining the portfolio, polishing a few projects, and making
          some improvements behind the scenes. Everything will be back online
          shortly.
        </p>

        {/* Divider */}
        <div className="mx-auto my-9 h-px w-10 bg-border" />

        {/* Status */}
        <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>

          <span>Maintenance in progress</span>
        </div>
      </section>

      <style>{`
        @keyframes maintenance-tool {
          0%,
          100% {
            transform: rotate(0deg);
          }

          45% {
            transform: rotate(-8deg);
          }

          55% {
            transform: rotate(-8deg);
          }
        }
      `}</style>
    </main>
  );
};

export default MaintenanceScreen;