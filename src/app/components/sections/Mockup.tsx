"use client"

import React, { useLayoutEffect, useRef, useState } from 'react'
import AnimationLaptop from '../3d/AnimationLaptop';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Laptop, { LaptopHandles } from '../3d/Laptop';
import { degToRad } from 'three/src/math/MathUtils.js';

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

        tl.to(laptopRef.current.screen.rotation, { x: degToRad(-89), duration: 1 });
        tl.to(laptopRef.current.laptop.rotation, { y: degToRad(5), duration: 0.5 }, "<");
        tl.to(laptopRef.current.laptop.position, { x: -1.2, duration: 0.5 }, "<"); // "<" => en parallèle

        // Phase 2
        tl.to(laptopRef.current.laptop.rotation, { y: degToRad(-70), duration: 1 });
        tl.to(laptopRef.current.laptop.position, { x: 3, y: 1 , duration: 1 }, "<");

        // Phase 3
        tl.to(laptopRef.current.laptop.rotation, { y: degToRad(5), duration: 1 });
        tl.to(laptopRef.current.laptop.position, { x: -1, y: -0.5, duration: 1 }, "<");

        // const positionTween = gsap.to(laptopRef.current.laptop.position, {
        //     x: 6,
        //     z: 2,
        //     y: -1,
        //     scrollTrigger: {
        //         trigger: sectionRef.current,
        //         start: "30% top",
        //         end: "70% bottom",
        //         scrub: 1,
        //         markers: {
        //             startColor: "blue",
        //             endColor: "green"
        //         }
        //     },
        // });

        // const rotationScreen = gsap.to(laptopRef.current.screen.rotation, {
        //     x: -1.5,
        //     scrollTrigger: {
        //         trigger: sectionRef.current,
        //         start: "top top",
        //         end: "bottom bottom",
        //         scrub: 1,
        //     },
        // });

    }, { dependencies: [ready], scope: sectionRef, revertOnUpdate: true });

    

    return (
        <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
            <AnimationLaptop ref={canvasRef}>
                <Laptop ref={laptopRef} onReady={() => setReady(true)} />
            </AnimationLaptop>
           
            <div className='flex items-center justify-center container'>
                <div className='h-[100vh] w-2/3'></div>
                <div className='h-[100vh] w-1/3 flex flex-col gap-8 items-center justify-center text-lg lg:text-2xl'>
                    <h3 className='font-bold uppercase text-4xl text-cyan-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, reiciendis.</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque iure cupiditate, vero, itaque perspiciatis non commodi qui beatae harum nobis corrupti impedit doloremque ratione! Hic quas quos dignissimos quasi minus placeat ab similique maxime magnam voluptas! Consequuntur asperiores atque excepturi, accusamus nobis rerum ratione assumenda quibusdam. Vel expedita quis omnis?</p>
                </div>
            </div>

            <div className='flex items-center justify-center container'>                
                <div className='h-[100vh] w-1/3 flex flex-col gap-8 items-center justify-center text-lg lg:text-2xl text-right'>
                    <h3 className='font-bold uppercase text-4xl text-cyan-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, reiciendis.</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque iure cupiditate, vero, itaque perspiciatis non commodi qui beatae harum nobis corrupti impedit doloremque ratione! Hic quas quos dignissimos quasi minus placeat ab similique maxime magnam voluptas! Consequuntur asperiores atque excepturi, accusamus nobis rerum ratione assumenda quibusdam. Vel expedita quis omnis?</p>
                </div>
                <div className='h-[100vh] w-2/3'></div>
            </div>

            <div className='flex items-center justify-center container'>
                <div className='h-[100vh] w-2/3'></div>
                <div className='h-[100vh] w-1/3 flex flex-col gap-8 items-center justify-center text-lg lg:text-2xl'>
                    <h3 className='font-bold uppercase text-4xl text-cyan-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, reiciendis.</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque iure cupiditate, vero, itaque perspiciatis non commodi qui beatae harum nobis corrupti impedit doloremque ratione! Hic quas quos dignissimos quasi minus placeat ab similique maxime magnam voluptas! Consequuntur asperiores atque excepturi, accusamus nobis rerum ratione assumenda quibusdam. Vel expedita quis omnis?</p>
                </div>
            </div>
            
        </section>
    )
}

export default Mockup