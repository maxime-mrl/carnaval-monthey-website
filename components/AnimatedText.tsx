"use client"

import { motion } from "framer-motion";

type TextProps = {
    text: string;
    className?: string;
}

const quote = {
    initial: {
        opacity: 1,
    },
}

const AnimatedText = ({text, className=""}: TextProps) => {
    return (
        <div className="w-full mx-auto py-2 flex items-center justify-center text-center
         overflow-hidden sm:py-0">
            <motion.h1
                className={`inline-block p-2 w-full tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-yellow-300
                 ${className}`}
                variants={quote}
                initial="initial"
                animate="animate"
            >
                {text.split('').map((letter, letterIndex) => (
                    <motion.span
                        key={letter + '-' + letterIndex}
                        initial={{opacity: 1}}
                        animate={{scale: [1, 1.5, 1], opacity: 1}}
                        transition={{duration: 0.1, delay: letterIndex * 0.07}} // Delay each letter by 0.1 seconds
                    >
                        {letter}
                    </motion.span>
                ))}
                &nbsp;
            </motion.h1>
            <motion.h1
                className={`inline-block p-2 w-full  tracking-wide absolute -z-10
                 ${className}`}
                variants={quote}
                initial="initial"
                animate="animate"
            >
                {text.split('').map((letter, letterIndex) => (
                    <motion.span
                        key={letter + '-' + letterIndex}
                        initial={{opacity: 1}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.1, delay: letterIndex * 0.07}} // Delay each letter by 0.1 seconds
                        className="text-shadow"
                    >
                        {letter}
                    </motion.span>
                ))}
                &nbsp;
            </motion.h1>
        </div>
    );
};

export default AnimatedText;