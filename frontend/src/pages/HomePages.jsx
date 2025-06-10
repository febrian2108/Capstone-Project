import { React, useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';

export default function HomePages() {
    const navigate = useNavigate();
    const buildKeyframes = (from, steps) => {
        const keys = new Set([
            ...Object.keys(from),
            ...steps.flatMap((s) => Object.keys(s)),
        ]);

        const keyframes = {};
        keys.forEach((k) => {
            keyframes[k] = [from[k], ...steps.map((s) => s[k])];
        });
        return keyframes;
    };

    const BlurText = ({
        text = '',
        delay = 200,
        className = '',
        animateBy = 'words',
        direction = 'top',
        threshold = 0.1,
        rootMargin = '0px',
        animationFrom,
        animationTo,
        easing = (t) => t,
        onAnimationComplete,
        stepDuration = 0.35,
    }) => {
        const elements = text.split(animateBy === 'words' ? ' ' : '');
        const [inView, setInView] = useState(false);
        const ref = useRef(null);

        useEffect(() => {
            if (!ref.current) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                        observer.unobserve(ref.current);
                    }
                },
                { threshold, rootMargin }
            );
            observer.observe(ref.current);
            return () => observer.disconnect();
        }, [threshold, rootMargin]);

        const defaultFrom = useMemo(
            () =>
                direction === 'top'
                    ? { filter: 'blur(10px)', opacity: 0, y: -50 }
                    : { filter: 'blur(10px)', opacity: 0, y: 50 },
            [direction]
        );

        const defaultTo = useMemo(
            () => [
                {
                    filter: 'blur(5px)',
                    opacity: 0.5,
                    y: direction === 'top' ? 5 : -5,
                },
                { filter: 'blur(0px)', opacity: 1, y: 0 },
            ],
            [direction]
        );

        const fromSnapshot = animationFrom ?? defaultFrom;
        const toSnapshots = animationTo ?? defaultTo;

        const stepCount = toSnapshots.length + 1;
        const totalDuration = stepDuration * (stepCount - 1);
        const times = Array.from({ length: stepCount }, (_, i) =>
            stepCount === 1 ? 0 : i / (stepCount - 1)
        );

        return (
            <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
                {elements.map((segment, index) => {
                    const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

                    const spanTransition = {
                        duration: totalDuration,
                        times,
                        delay: (index * delay) / 1000,
                    };
                    spanTransition.ease = easing;

                    return (
                        <motion.span
                            className="inline-block will-change-[transform,filter,opacity] text-5xl"
                            key={index}
                            initial={fromSnapshot}
                            animate={inView ? animateKeyframes : fromSnapshot}
                            transition={spanTransition}
                            onAnimationComplete={
                                index === elements.length - 1 ? onAnimationComplete : undefined
                            }
                        >
                            {segment === ' ' ? '\u00A0' : segment}
                            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
                        </motion.span>
                    );
                })}
            </p>
        );
    };

    return (
        <main className="h-screen bg-black text-white">
            <Navbar />

            <section className="relative flex justify-center items-center w-full h-full">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="./src/assets/panggung.jpg"
                        alt="background-netflix"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-10 text-center text-white px-4 mb-40">
                    <div className="mt-5">
                        <BlurText
                            text="         Unlock Hidden Gems"
                            animateBy="words"
                            direction="top"
                            delay={50}
                            easing={(t) => t}
                            stepDuration={0.35}
                            onAnimationComplete={() => console.log('Animation Complete')}
                        />
                    </div>
                    <div className="mt-5">
                        <BlurText
                            text="Find Your Next Favorite Movies"
                            animateBy="words"
                            direction="top"
                            delay={200}
                            easing={(t) => t}
                            stepDuration={0.35}
                            onAnimationComplete={() => console.log('Animation Complete')}
                        />
                    </div>
                    <button
                        onClick={() => {
                            const token = localStorage.getItem('token');
                            token ? navigate('/question') : navigate('/login');
                        }}
                    className="bg-red-600 text-white py-3 px-6 rounded-full text-lg hover:bg-red-400 transition-colors duration-300 mt-8"
                >
                Get Started
            </button>
        </div>
    </section>
    <Footer />
</main>
);
}