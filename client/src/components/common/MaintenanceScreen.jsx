import React from "react";
import { LuWrench } from "react-icons/lu";

const MaintenanceScreen = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 selection:bg-brand/30">
      {/* Background Decor: Subtle Brand Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full text-center z-10">
        <div className="relative mb-10 w-16 h-16 mx-auto">
          {/* Soft breathing ring behind the icon — slow, quiet, no bounce */}
          <div
            className="absolute inset-0 rounded-full bg-brand/10 animate-[pulse_3s_ease-in-out_infinite]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <LuWrench
              size={28}
              strokeWidth={1.5}
              className="text-brand animate-[spin_6s_linear_infinite]"
            />
          </div>
        </div>

        {/* Brand Identity & Status */}
        <p className="text-xs font-medium tracking-[0.2em] text-brand mb-3">
          Splendid Developer
        </p>

        <h1 className="text-3xl font-heading font-semibold mb-4 tracking-tight">
          Site under maintenance
        </h1>

        <p className="text-muted-foreground leading-relaxed">
          I'm making improvements to the portfolio and adding recent work.
          Everything will be back shortly — thanks for your patience.
        </p>

        {/* Divider */}
        <div className="h-px w-12 bg-border mx-auto my-8" />

        <p className="text-xs text-muted-foreground opacity-70">
          Estimated downtime:{" "}
          <span className="text-foreground font-medium">15 minutes</span>
        </p>
      </div>
    </div>
  );
};

export default MaintenanceScreen;
