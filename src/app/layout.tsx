import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Navbar } from './components/ui/navbar';
import { GradientBlurTop } from './components/ui/gradient-blur';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
	title: 'Agence Web Moderne | Next.js, GSAP, React Three Fiber',
	description: 'Agence web spécialisée dans la création d\'expériences web exceptionnelles avec Next.js, Tailwind CSS, GSAP et React Three Fiber',
};

export default function RootLayout({
  	children,
}: {
  	children: React.ReactNode;
}) {
	return (
		<html lang="fr" className="dark">
			<body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>	
				<Navbar className="top-2" />
				<GradientBlurTop />								
				{children}
			</body>
		</html>
	);
}