/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import 'src/styles/globals.css';
import 'src/styles/product-slide.css';

const futura = localFont({
    src: './fonts/futura.woff2',
    variable: '--typeBasePrimary',
    // weight: "100 900",
});
const tiemann = localFont({
    src: './fonts/tiemann.woff2',
    variable: '--typeHeaderPrimary',
    // weight: "100 900",
});

export const metadata: Metadata = {
    title: 'Momotaj Clothing Store',
    description: 'Traditional clothing',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${futura.variable} ${tiemann.variable} antialiased`}
            >
                {children}
                <div className="fixed right-0 top-0 z-[5000]">
                    <Toaster
                        richColors
                        closeButton
                        position="top-right"
                        className="fixed"
                    />
                </div>
                <script src="http://localhost:5002/tooltip-embed.js" data-api-key="dfddb5c29e78f6aef3f41badf74bae19e499172cf7c16f7e2b39dd1151e4cee4" data-base-url="http://localhost:5002/api"></script>
            </body>
        </html>
    );
}
