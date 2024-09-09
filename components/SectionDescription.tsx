'use client'
import { motion } from "framer-motion"

function SectionDescription({ children }: { children: React.ReactNode}) {
  return (
    <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.8 }}
        viewport={{ once: true }}
    >
        { children }
    </motion.div>
  )
}

export default SectionDescription