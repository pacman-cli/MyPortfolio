import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function calculateReadTime(content: string): number {
    return Math.ceil(content.split(/\s+/).length / 200)
}

export async function fetchJson<T>(url: string, revalidate = 3600): Promise<T> {
    const res = await fetch(url, { next: { revalidate } })
    if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`)
    return res.json()
}
