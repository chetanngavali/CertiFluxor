
import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export function Logo({ className, ...props }: LogoProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className={cn("text-blue-600 fill-current", className)}
            {...props}
        >
            <rect width="256" height="256" fill="none" />
            {/* Outer Shield/Hexagon Shape - representing Security/Credential */}
            <path
                d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.15A16,16,0,0,0,24,80.11v95.78a16,16,0,0,0,8.32,14l88,48.15a15.88,15.88,0,0,0,15.36,0l88-48.15a16,16,0,0,0,8.32-14V80.11A16,16,0,0,0,223.68,66.15ZM216,175.89l-88,48.15L40,175.89V80.11L128,32l88,48.15Z"
                fill="currentColor"
                opacity="0.2"
            />
            {/* Inner tick/flux mark - representing Verification/Flow */}
            <path
                d="M178.34,90.34l-64,64a8,8,0,0,1-11.31,0l-32-32a8,8,0,0,1,11.31-11.31L108.69,137l58.34-58.34a8,8,0,0,1,11.31,11.31Z"
                fill="currentColor"
                className="text-blue-600"
            />
            {/* Accent elements for "Flux" */}
            <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" opacity="0.1" />
        </svg>
    );
}

export function LogoIcon({ className, ...props }: LogoProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            fill="none"
            className={cn("h-8 w-8", className)}
            {...props}
        >
            <rect width="40" height="40" rx="8" className="fill-blue-600" />
            <path
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20L17 25L28 14"
            />
            <path
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32Z"
                opacity="0.3"
            />
        </svg>
    )
}
