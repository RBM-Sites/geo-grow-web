import { useEffect, useState, type ReactNode } from "react";
import { checkVisitor, type GateVerdict } from "@/utils/geoGate";

/**
 * Client-side visitor screening. Prerendered HTML always contains the full
 * page (so crawlers and social previews are unaffected); screening only
 * happens after hydration in the visitor's browser. Rendering children until
 * the verdict lands also keeps the first client render identical to the
 * server markup, so hydration never mismatches.
 */
const GeoGate = ({ children }: { children: ReactNode }) => {
  const [verdict, setVerdict] = useState<GateVerdict | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;
    checkVisitor().then((result) => {
      if (!active) return;
      setVerdict(result);
      setChecked(true);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!checked || !verdict || verdict.allowed) return <>{children}</>;

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
};

export default GeoGate;
