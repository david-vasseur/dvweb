'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ExternalLink } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';

const projects = [
  {
    title: 'E-Commerce Immersif',
    description: 'Plateforme de vente en ligne avec visualisation 3D des produits',
    tags: ['Next.js', 'Three.js', 'Stripe'],
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: 'Dashboard Analytics',
    description: 'Interface de données en temps réel avec animations fluides',
    tags: ['React', 'Node', 'Mysql'],
    gradient: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    title: 'Société de dératisation',
    description: 'Site vitrine avec scroll parallax et interactions 3D',
    tags: ['Next.js', 'Gsap', 'Tailwind'],
    gradient: 'from-teal-500/20 to-cyan-500/20',
  },
  {
    title: 'Thérapeute holistique',
    description: 'Plateforme collaborative avec interfaces complexes',
    tags: ['Next.js', 'Tailwind', 'Motion'],
    gradient: 'from-blue-400/20 to-cyan-400/20',
  },
];

export default function Portfolio() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 80%',
                end: 'bottom 60%',
                scrub: 1,
                },
                y: 100,
                opacity: 0,
                immediateRender: false,
            });

            cardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            end: 'bottom 70%',
                            scrub: 1,
                        },
                        x: index % 2 === 0 ? -100 : 100,
                        opacity: 0,
                        rotation: index % 2 === 0 ? -10 : 10,
                        immediateRender: false,
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id='portfolio' ref={sectionRef} className="min-h-screen py-32 px-6 relative overflow-x-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div ref={titleRef} className="text-center mb-20">
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                        Projets Réalisés
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Des réalisations qui combinent performance, esthétique et innovation
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        ref={(el) => {
                            cardsRef.current[index] = el;
                        }}
                    >
                        <Card className="group p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500 cursor-pointer overflow-hidden relative h-full">
                            <div
                            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                            />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                                        {project.title}
                                    </h3>
                                    <Button>
                                        <Link href={"www.david-vasseur.fr"}>
                                            <ExternalLink className="w-6 h-6 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                        </Link>
                                    </Button>
                                    
                                </div>

                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, tagIndex) => (
                                    <Badge
                                        key={tagIndex}
                                        variant="outline"
                                        className="border-cyan-500/30 text-cyan-400 bg-cyan-500/5"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
                </div>
            </div>
        </section>
    );
}
