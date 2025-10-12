'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Layers, Sparkles, Boxes, Zap } from 'lucide-react';
import { Card } from '../ui/card';
import DisplayCards from '../ui/display-cards';
import FeaturedSectionStats from '@/components/featured-section-stats';
import Orb from '../ui/orb-background';
import Stepper, { Step } from '../ui/step-component';

const services = [
  {
    icon: Layers,
    title: 'Application Web sur mesure',
    description: "Applications web ultra-performantes qui vous ressemble et dont vous êtes l'acteur principal",
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Sparkles,
    title: 'Animations GSAP',
    description: 'Expériences immersives avec ScrollTrigger et transitions fluides',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Boxes,
    title: 'Hebergement & Maintenance',
    description: 'Gestion complète de l’hébergement, de la sécurité et des mises à jour de vos solutions web, pour une tranquillité d’esprit totale.',
    color: 'from-cyan-400 to-teal-500',
  },
  {
    icon: Zap,
    title: 'Interface d’administration',
    description: 'Développement d’un espace client intuitif vous permettant de gérer vos contenus, vos données ou vos utilisateurs en toute autonomie.',
    color: 'from-blue-400 to-cyan-400',
  },
];

export default function Services() {
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
      });

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 80%',
              scrub: 1,
            },
            y: 100,
            opacity: 0,
            rotation: index % 2 === 0 ? -5 : 5,
          });

          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 60%',
              end: 'bottom 60%',
              scrub: 1,
            },
            scale: 1.05,
            yoyo: true,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

    return (
        <section ref={sectionRef} className="min-h-screen py-32 px-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div ref={titleRef} className="text-center mb-20">
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                        Notre Expertise
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Des technologies de pointe pour créer des expériences web exceptionnelles
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                {services.map((service, index) => {
                    const Icon = service.icon;
                    return (
                        <div
                            key={index}
                            ref={(el) => {
                            cardsRef.current[index] = el;
                            }}
                            className={`${index === 0 || index === 3 ? "md:col-span-4" : "md:col-span-2"} cursor-pointer`}
                        >
                            <Card className="p-8 m-2 aspect-square md:aspect-auto bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500 group h-full">
                            {index === 0 ? (
                                <div className="relative h-full flex justify-start items-baseline ">
                                    <Stepper
                                        initialStep={1}
                                        onStepChange={(step) => {
                                            console.log(step);
                                        }}
                                        onFinalStepCompleted={() => console.log("All steps completed!")}
                                        backButtonText="Previous"
                                        nextButtonText="Next"
                                        >
                                            <Step>
                                                <h2 className="text-cyan-500 font-bold">1. Écoute & stratégie</h2>
                                                <p>On échange pour comprendre vos besoins, vos objectifs et votre public cible.</p>
                                            </Step>

                                            <Step>
                                                <h2 className="text-cyan-500 font-bold">2. Conception & design</h2>
                                                <p>On imagine une expérience utilisateur fluide et un design qui reflète votre identité.</p>
                                            </Step>

                                            <Step>
                                                <h2 className="text-cyan-500 font-bold">3. Développement sur mesure</h2>
                                                <p>On transforme le concept en site rapide, moderne et optimisé pour le SEO.</p>
                                            </Step>

                                            <Step>
                                                <h2 className="text-cyan-500 font-bold">4. Mise en ligne & accompagnement</h2>
                                                <p>On s’occupe du déploiement, du suivi et de la maintenance pour garantir votre succès.</p>
                                            </Step>
                                        </Stepper>
                                    <div className="absolute inset-y-8 right-0 top-0 w-1/2 pointer-events-none">
                                        <h3 className="text-2xl text-right font-bold text-cyan-300 mb-4">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-400 text-right leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>                                    
                                </div>
                            ) : index === 1 ? (
                                <FeaturedSectionStats />
                            ) : index === 2 ? (
                                <div className='relative h-full'>
                                    <div className='absolute inset-0 w-full h-full scale-110 flex flex-col justify-center items-center'>
                                        <Orb hue={30} rotateOnHover forceHoverState hoverIntensity={1.1} />
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-cyan-300 mb-4">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            ) : (
                                <div className="relative min-h-[20vh] h-full flex items-center">
                                    <DisplayCards />
                                    <div className="absolute inset-y-8 right-0 top-0 w-1/2">
                                        <h3 className="text-2xl text-right font-bold text-cyan-300 mb-4">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-400 text-right leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>                                    
                                </div>
                            )}
                                
                            </Card>
                        </div>
                    );
                })}
                </div>
            </div>
        </section>
    );
}