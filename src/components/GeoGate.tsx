import { useEffect, useState, type ReactNode } from "react";
import { checkVisitor, type GateVerdict } from "@/utils/geoGate";

const GeoGate = ({ children }: { children: ReactNode }) => {
  const [verdict, setVerdict] = useState<GateVerdict | null>(null);

  useEffect(() => {
    let active = true;
    checkVisitor().then((result) => {
      if (active) setVerdict(result);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!verdict) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <div
          className="h-10 w-10 rounded-full border-4 border-muted border-t-primary animate-spin"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (!verdict.allowed) {
    const isVpn = verdict.reason === "vpn";
    const isBot = verdict.reason === "bot";

    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            {isVpn ? "Please turn off your VPN" : "Access restricted"}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {isVpn
              ? "We can't load this page while a VPN, proxy, or anonymizer is active. Disable it and refresh to continue."
              : isBot
                ? "This page cannot be accessed by automated tools."
                : "This offer is currently available to visitors in the United States and Philippines only."}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default GeoGate;
