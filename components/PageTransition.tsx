'use client'
import { motion } from "framer-motion"

function PageTransition({ children }: { children: React.ReactNode}) {
  return (
    <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.6 }}
    >
        { children }
    </motion.div>
  )
}

export default PageTransition