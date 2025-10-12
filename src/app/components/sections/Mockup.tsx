import React, { useEffect, useRef } from 'react'
import AnimationLaptop from '../3d/AnimationLaptop';
import gsap from 'gsap';
import Canvas from '../test/Canvas';
import { useGSAP } from '@gsap/react';
import Laptop, { LaptopHandles } from '../3d/Laptop';

function Mockup() {

    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const laptopRef = useRef<LaptopHandles>(null);

    useGSAP(() => {
        gsap.to(canvasRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: canvasRef.current
            }
        });

        // if (!laptopRef.current?.laptop) return;

        // gsap.to(laptopRef.current.laptop.rotation, {
        //     x: 10.5,
        //     scrollTrigger: {
        //         trigger: sectionRef.current,
        //         start: "top center",
        //         end: "center bottom",
        //         scrub: 1
        //     }
        // });

    })

    useEffect(() => {
        const checkInterval = setInterval(() => {
        if (!laptopRef.current?.laptop || !laptopRef.current?.screen) return;

        // Une fois prêt, on lance l’animation
        const rotationTween = gsap.to(laptopRef.current.laptop.rotation, {
            y: -0.8,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
        });

        const positionTween = gsap.to(laptopRef.current.laptop.position, {
            x: 1,
            z: -2,
            y: -1,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "30% top",
                end: "70% bottom",
                scrub: 1,
            },
        });

        const rotationScreen = gsap.to(laptopRef.current.screen.rotation, {
            x: -1.5,        
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
        });

        clearInterval(checkInterval); // stop polling

        return () => {
            rotationTween.scrollTrigger?.kill();
            rotationTween.kill();
            positionTween.scrollTrigger?.kill();
            positionTween.kill();
            rotationScreen.scrollTrigger?.kill();
            rotationScreen.kill();
        };

        }, 100);
    }, [laptopRef.current?.laptop, laptopRef.current?.screen]);

    

    return (
        <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
            <AnimationLaptop ref={canvasRef}>
                <Laptop ref={laptopRef} />
            </AnimationLaptop>

            {/* <Canvas ref={canvasRef} /> */}
           
            <div className='flex items-center justify-center container'>
                <div className='h-[100vh] w-2/3'></div>
                <div className='h-[100vh] w-1/3 flex items-center justify-center text-2xl'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque iure cupiditate, vero, itaque perspiciatis non commodi qui beatae harum nobis corrupti impedit doloremque ratione! Hic quas quos dignissimos quasi minus placeat ab similique maxime magnam voluptas! Consequuntur asperiores atque excepturi, accusamus nobis rerum ratione assumenda quibusdam. Vel expedita quis omnis?</p>
                </div>
            </div>

            <div className='flex items-center justify-center'>                
                <div className='h-[100vh] w-full flex items-center justify-center text-2xl'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque iure cupiditate, vero, itaque perspiciatis non commodi qui beatae harum nobis corrupti impedit doloremque ratione! Hic quas quos dignissimos quasi minus placeat ab similique maxime magnam voluptas! Consequuntur asperiores atque excepturi, accusamus nobis rerum ratione assumenda quibusdam. Vel expedita quis omnis?</p>
                </div>
                <div className='h-[100vh] w-full'></div>
            </div>
            
        </section>
    )
}

export default Mockup