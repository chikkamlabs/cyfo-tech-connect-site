// import type { Metadata } from "next";
// import { Space_Grotesk } from "next/font/google";
// import "./globals.css";

// const spaceGrotesk = Space_Grotesk({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-space-grotesk",
// });

// export const metadata: Metadata = {
//   title: "Cyfo Tech Connect - Cyber Workshops Ticket Booking",
//   description: "Browse cybersecurity workshops, register, and manage tickets.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className={`${spaceGrotesk.variable}`}>
//       <body className={`${spaceGrotesk.className} antialiased bg-[#050816] text-[#FFFFFF] min-h-screen`}>
//         {children}
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "ST7 Tech Connect - Cyber, Ai Workshops, Ticket Booking",
  description: "Browse cybersecurity workshops, register, and manage tickets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}
            (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '2786140658414875');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${spaceGrotesk.className} antialiased bg-[#050816] text-[#FFFFFF] min-h-screen`}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2786140658414875&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}