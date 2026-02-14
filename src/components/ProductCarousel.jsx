import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductCarousel({ images }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full md:w-1/2 h-80 overflow-hidden rounded">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Product ${index}`}
          className="w-full h-full object-cover rounded"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2"
      >
        ◀
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2"
      >
        ▶
      </button>
    </div>
  );
}
