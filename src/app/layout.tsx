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
                {/* MMChatbotUser and Chatbot Widget Scripts */}
                {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                                                try {
                                                    var _ud = JSON.parse(localStorage.getItem('userData') || 'null');
                                                    var _org = JSON.parse(localStorage.getItem('organization') || 'null');
                                                    if (_ud) {
                                                        var _locationName = (_ud.curRole && _ud.curRole.locationName)
                                                            || ((_ud.organizations || []).find(function(x) { return x.organizationId === (_org && _org._id); }) || {}).locationName;
                                                        window.MMChatbotUser = {
                                                            name: _ud.fullName,
                                                            email: _ud.email,
                                                            phone: _ud.phone,
                                                            photo: _ud.avatar,
                                                            organizationName: _org && _org.name,
                                                            locationName: _locationName,
                                                            organizationId: _org && _org._id,
                                                            userType: _ud.userType,
                                                            contactId: _ud.curRole && _ud.curRole.contactId,
                                                        };
                                                    }
                                                } catch (error) {console.log('user object not available in script')}
                                                `,
                    }}
                />
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script src="http://localhost:5002/api/ai-chatbot/chatbot-widget/bot_2025cddc-2a31-4824-9abf-d0adaa086672"></script>
            </body>
        </html>
    );
}