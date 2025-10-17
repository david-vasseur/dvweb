"use client"

import React, { useLayoutEffect, useRef, useState } from 'react'
import AnimationLaptop from '../3d/AnimationLaptop';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Laptop, { LaptopHandles } from '../3d/Laptop';
import { degToRad } from 'three/src/math/MathUtils.js';

const projetsConfiance = [
    {
        id: 0,
        titre: "Une expertise solide au service de votre projet",
        paragraphe: "Avec plusieurs années d’expérience dans le développement web, je maîtrise les technologies modernes (HTML, CSS, JavaScript, React, Node.js, etc.) et les bonnes pratiques de performance et de sécurité. Mon objectif est de transformer vos idées en solutions concrètes, efficaces et évolutives. Chaque ligne de code est pensée pour la fiabilité et la durabilité."
    },
    {
        id: 1,
        titre: "Une collaboration transparente et à votre écoute",
        paragraphe: "Je crois qu’un bon site web naît avant tout d’une bonne communication. Dès le premier échange, je prends le temps de comprendre vos besoins, vos objectifs et votre vision. Vous restez informé à chaque étape du projet, avec un suivi clair, des retours réguliers et une totale transparence sur l’avancement."
    },
    {
        id: 2,
        titre: "Un engagement total pour votre réussite",
        paragraphe: "Mon rôle ne s’arrête pas à la livraison du site. Je m’assure que votre projet soit performant, responsive et prêt à évoluer. Votre satisfaction est ma priorité : je mets tout en œuvre pour que votre site reflète parfaitement votre identité et contribue à votre croissance en ligne. Ensemble, nous construisons bien plus qu’un site : une véritable expérience digitale."
    }
];

console.log(projetsConfiance);

function Mockup() {

    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const laptopRef = useRef<LaptopHandles>(null);
    const [ready, setReady] = useState(false);

    useGSAP(() => {
        gsap.to(canvasRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: canvasRef.current
            }
        });
    })

    useLayoutEffect(() => {
        console.log("ready", ready);
        console.log("laptopRef", laptopRef.current);
        console.log("canvasRef", canvasRef.current);
        console.log("sectionRef", sectionRef.current);        
    }, [ready]);


    useGSAP(() => {
        if (!ready || !laptopRef.current?.laptop || !laptopRef.current.screen) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",      
                end: "bottom bottom", 
                scrub: 2,           
            },
            defaults: { ease: "none" }
        });

        // Phase 1
        tl.to(laptopRef.current.screen.rotation, { x: degToRad(-89), duration: 1 });
        tl.to(laptopRef.current.laptop.rotation, { y: degToRad(5), duration: 0.5 }, "<");
        tl.to(laptopRef.current.laptop.position, { x: -1.2, duration: 0.8 }, "<"); 

        // Phase 2
        tl.to(laptopRef.current.screen.rotation, { x: degToRad(-92), duration: 1 });
        tl.to(laptopRef.current.laptop.rotation, { y: degToRad(-70), duration: 1 }, "<");
        tl.to(laptopRef.current.laptop.position, { x: 3, y: 1 , duration: 1 }, "<");

        // Phase 3
        tl.to(laptopRef.current.screen.rotation, { x: degToRad(-85), duration: 1 });
        tl.to(laptopRef.current.laptop.rotation, { y: degToRad(5), duration: 1 });
        tl.to(laptopRef.current.laptop.position, { x: -1, y: -0.5, duration: 1 }, "<");

    }, { dependencies: [ready], scope: sectionRef, revertOnUpdate: true });

    

    return (
        <section ref={sectionRef} className="my-10 lg:my-0 min-h-screen flex flex-col lg:gap-0 gap-14 items-center justify-center relative overflow-hidden px-6">
            <AnimationLaptop ref={canvasRef}>
                <Laptop ref={laptopRef} onReady={() => setReady(true)} />
            </AnimationLaptop>

            {projetsConfiance.map((projet) => {
                return (
                    <div key={projet.id} className='flex items-center justify-center container'>
                        {projet.id !== 1 && <div className='lg:h-[100vh] lg:w-2/3'></div>}
                        <div className={`lg:h-[80vh] lg:w-1/3 flex flex-col gap-8 items-center justify-center text-lg lg:text-2xl ${projet.id === 1 ? "text-right" : ""}`}>
                            <h3 className='uppercase text-4xl text-cyan-500 font-black'>{projet.titre}</h3>
                            <p>{projet.paragraphe}</p>
                        </div>
                        {projet.id === 1 && <div className='lg:h-[100vh] lg:w-2/3'></div>}
                    </div>
                )
            })}
        </section>
    )
}

export default Mockup