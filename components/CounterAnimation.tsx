'use client'

import { motion, useMotionValue, animate, useTransform, MotionValue } from "framer-motion";
import { useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { numberFormatter } from '@/components/functions/numberFormat'

function useFormattedValue(value: MotionValue<number>) {
    const rounded = useTransform(value, (val: number) => numberFormatter.format(Math.round(val)));
    return rounded;
}

function CounterAnimation({ number }: {number: number}) {
    const count = useMotionValue(0);
    const formattedCount = useFormattedValue(count);
    const { ref, inView } = useInView({ triggerOnce: true }); 

    useEffect(() => {
        if (inView) {
            const animation = animate(count, number, { duration: 2 });
            return animation.stop;
        }
    }, [inView, count, number]);

    return (
        <motion.h1 ref={ref} animate={{ opacity: inView ? 1 : 0 }} style={{ opacity: 0 }} className='text-center text-4xl font-bold text-cyan-500'>
            { formattedCount }
        </motion.h1>
    )
}

export default CounterAnimation;
