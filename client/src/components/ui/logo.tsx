
import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export function Logo({ className, ...props }: LogoProps) {
    return (
        <LogoIcon className={cn("inline-block", className)} {...props} />
    );
}

// Final Polish based on visual reference:
// - Shield Base (Dark)
// - Document fold at top-right
// - Check/Lock integrated
// - Two distinct blue swooshes wrapping around
export function LogoIcon({ className, ...props }: LogoProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            fill="none"
            className={cn("h-10 w-10 text-slate-900", className)}
            {...props}
        >
            {/* DEFINE GRADIENTS */}
            <defs>
                <linearGradient id="fluxGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" /> {/* bright blue */}
                    <stop offset="100%" stopColor="#2563EB" /> {/* darker blue */}
                </linearGradient>
            </defs>

            {/* MAIN SHIELD BODY */}
            {/* A slightly rounded shield shape */}
            <path
                d="M150,130 C150,110 170,110 170,110 H290 L330,150 V300 C330,380 240,430 240,430 C240,430 150,380 150,300 V130 Z"
                fill="currentColor" // Uses text-color (slate-900 usually)
            />

            {/* DOCUMENT LINES (White) */}
            <path
                d="M190 160 H290"
                stroke="white"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.9"
            />
            <path
                d="M190 190 H290"
                stroke="white"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.9"
            />
            <path
                d="M190 220 H260"
                stroke="white"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.9"
            />

            {/* PADLOCK / CHECKMARK SYMBOL (White Cutout) */}
            {/* The Lock Shackle */}
            <path
                d="M210 290 V270 C210 250 225 240 240 240 C255 240 270 250 270 270 V290"
                stroke="white"
                strokeWidth="18"
                strokeLinecap="round"
                fill="none"
            />
            {/* The Checkmark Body */}
            <path
                d="M220 320 L240 340 L270 290"
                stroke="white"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />

            {/* FLUX SWOOSHES (The Blue Curves) */}
            {/* Lower Swoosh - wraps bottom left to middle right */}
            <path
                d="M130 380 C130 380 160 420 230 400 C300 380 370 280 390 200"
                stroke="url(#fluxGradient)"
                strokeWidth="28"
                strokeLinecap="round"
                fill="none"
            />
            {/* Upper Swoosh - parallel above */}
            <path
                d="M140 330 C140 330 170 370 240 350 C310 330 380 230 400 150"
                stroke="#60A5FA" // Lighter blue accent
                strokeWidth="22"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    )
}
