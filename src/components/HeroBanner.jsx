import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <motion.div
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-12 rounded my-4 mx-4 md:mx-0"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Welcome to Tronixxware
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        Find the best products across electronics and fashion.
      </motion.p>
    </motion.div>
  );
}
