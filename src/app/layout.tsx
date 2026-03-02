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
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                          // Optional: Set user details for the chatbot widget.
                          // Populate these from your auth/session on the client if needed.
                          window.MMChatbotUser = window.MMChatbotUser || {
                            name: '',
                            email: '',
                            phone: '',
                            photo: '',
                          };
                        `,
                    }}
                />

                <script src="http://localhost:5002/api/ai-chatbot/chatbot-widget/bot_1cd95b9c-fe7b-4e85-87d2-be620d99e9b2"></script>
            </body>
        </html>
    );
}
