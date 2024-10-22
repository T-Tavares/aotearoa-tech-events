import './globals.scss';
import {OpenSans} from '@/fonts';

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
            <body className={OpenSans.className}>{children}</body>
            {/* <body>{children}</body> */}
        </html>
    );
}
