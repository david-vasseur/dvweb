
import Hero from './components/sections/Hero';
import Background3D from './components/3d/Background3D';
import Services from './components/sections/Services';
import Portfolio from './components/sections/Portfolio';
import AboutUsSection from '@/components/about-us-section';
import Mockup from './components/sections/Mockup';
import SmoothScrollWrapper from '@/components/ScrollWrapper';

export default function Home() {

	return (
		<SmoothScrollWrapper>
			<Background3D />				
			<Hero />
			<Services />
			<Mockup />
			<Portfolio />
			<AboutUsSection />
		</SmoothScrollWrapper>
	);
}