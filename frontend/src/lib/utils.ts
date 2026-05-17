import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function calculateReadTime(content: string): number {
    return Math.ceil(content.split(/\s+/).length / 200)
}
