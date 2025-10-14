"use client"


import Hero from './components/sections/Hero';
import Background3D from './components/3d/Background3D';
import Services from './components/sections/Services';
import SmoothScrollWrapper from '@/components/ScrollWrapper';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Mockup from './components/sections/Mockup';
import Portfolio from './components/sections/Portfolio';
import AboutUsSection from '@/components/about-us-section';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

	return (
		<SmoothScrollWrapper>
			{/* <Background3D /> */}
			<Hero />
			<Services />
			<Mockup />
			<Portfolio />
			{/* <AboutUsSection /> */}
		</SmoothScrollWrapper>	
	);
}