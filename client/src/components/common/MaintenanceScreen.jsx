import React from "react";
import { LuWrench } from "react-icons/lu";

const MaintenanceScreen = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 selection:bg-brand/30">
      {/* Background Decor: Subtle Brand Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full text-center z-10">
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-pulse">
            <LuWrench
              size={80}
              className="text-brand/20 mx-auto"
              strokeWidth={1.5}
            />
          </div>
          <LuWrench
            size={64}
            className="text-brand mx-auto relative z-10 animate-bounce"
            style={{ animationDuration: "2s" }}
            strokeWidth={1.5}
          />
        </div>

        {/* Brand Identity & Status */}
        <h1 className="text-sm font-bold tracking-[0.3em] uppercase text-brand mb-2">
          Splendid developer
        </h1>

        <h2 className="text-3xl font-heading font-semibold mb-4 tracking-tight">
          Refining the Experience
        </h2>

        <p className="text-muted-foreground leading-relaxed">
          I'm currently updating my portfolio with new projects and
          improvements. The site will be back online shortly.
        </p>

        {/* Divider */}
        <div className="h-px w-12 bg-border mx-auto my-8" />

        <p className="text-[11px] uppercase tracking-widest text-muted-foreground opacity-60">
          Estimated downtime: <span className="text-foreground">~15 mins</span>
        </p>
      </div>
    </div>
  );
};

export default MaintenanceScreen;
