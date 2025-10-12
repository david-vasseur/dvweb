'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Hero from './components/sections/Hero';
import Background3D from './components/3d/Background3D';
import Services from './components/sections/Services';
import Portfolio from './components/sections/Portfolio';
import AboutUsSection from '@/components/about-us-section';
import ProfileCard from '@/components/pc-card/pc-card';
import AnimationLaptop from './components/3d/Laptop';
import Mockup from './components/sections/Mockup';
// import Services from '@/components/sections/Services';
// import Portfolio from '@/components/sections/Portfolio';
// import Team from '@/components/sections/Team';
// import Contact from '@/components/sections/Contact';


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
	const smootherRef = useRef<any>(null);

	useEffect(() => {
		smootherRef.current = ScrollSmoother.create({
			smooth: 1.5,
			effects: true,
			smoothTouch: 0.1,
		});

		return () => {
			smootherRef.current?.kill();
			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		};
	}, []);

	return (
		<div id="smooth-wrapper">
			<div id="smooth-content">
				<Background3D />				
				<Hero />
				<Services />
				<Mockup />
				<Portfolio />
				<AboutUsSection />
				
				{/* <Team />
				<Contact /> */}
			</div>
		</div>
	);
}