import type {Metadata} from "next";
import "./globals.css"
export const metadata: Metadata = {
    title: "URL Shortener",
    description:"Shorten long URL",
};
export default function rootLayout({children}:{children: React.ReactNode}){
    return(
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

