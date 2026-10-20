import type { ReactNode } from "react";
/** Compatibility wrapper: content remains visible during SSR and without JavaScript. */
export function AnimateOnScroll({ children, className = "" }: {
 children: ReactNode; className?: string; animation?: "fade-up" | "fade-in"; delay?: number;
}) { return <div className={className}>{children}</div>; }
