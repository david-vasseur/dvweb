'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Code2 } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import ScrollLink from '../ui/scroll-link';
import BackgroundPaths from '@/components/ui/background-paths';
import Background3D from '../3d/Background3D';

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from(titleRef.current, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            delay: 0.3,
        })
            .from(
            subtitleRef.current,
            {
                y: 50,
                opacity: 0,
                duration: 1,
            },
            '-=0.6'
            )
            .from(
            ctaRef.current,
            {
                y: 30,
                opacity: 0,
                duration: 0.8,
            },
            '-=0.4'
            );

        gsap.to(heroRef.current, {
            scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            },
            y: 200,
            opacity: 0,
        });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
        >
            
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="mb-8 flex justify-center">
                    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl backdrop-blur-sm border border-cyan-500/20">
                        {/* <Code2 className="w-12 h-12 text-cyan-400" /> */}
                        <Image src={"/logo.png"} width={100} height={100} className='scale-150' alt='' />
                    </div>
                </div>

                <h1
                    ref={titleRef}
                    className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent leading-tight"
                >
                    Expériences
                    <br />
                    Web Modernes
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                    Nous transformons vos idées en applications web exceptionnelles
                    avec Next.js, React Three Fiber et des animations immersives
                </p>

                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg group"
                    >
                        Démarrer un projet
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-300 px-8 py-6 text-lg"
                    >
                        <ScrollLink to='#portfolio'>
                            Voir nos réalisations 
                        </ScrollLink>                                                   
                    </Button>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center p-2">
                    <div className="w-1.5 h-3 bg-cyan-400 rounded-full" />
                </div>
            </div>
        </section>
    );
}