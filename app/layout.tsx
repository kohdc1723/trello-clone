import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

import "./globals.css";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`
    },
    description: siteConfig.description,
    icons: [
        {
            url: "/logo.svg",
            href: "/logo.svg"
        }
    ]
};

export default function RootLayout(
    { children }: Readonly<{ children: React.ReactNode }>
) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
