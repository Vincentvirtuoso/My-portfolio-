import React, { useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { LuChevronLeft, LuChevronRight, LuInfo } from "react-icons/lu";
import clsx from "clsx";

const GallerySlider = ({ gallery = [] }) => {
  const controls = useAnimation();
  const [index, setIndex] = useState(0);
  const [info, setInfo] = useState(null);

  const showInfo = (msg) => {
    setInfo(msg);
    setTimeout(() => setInfo(null), 2000);
  };

  const nextSlide = () => {
    if (index < gallery.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      controls.start({ x: `-${newIndex * 50}%` });
    } else {
      showInfo("You’re already at the last image.");
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      controls.start({ x: `-${newIndex * 50}%` });
    } else {
      showInfo("You’re already at the first image.");
    }
  };

  // Auto-snap after drag
  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -50 || velocity < -500) nextSlide();
    else if (offset > 50 || velocity > 500) prevSlide();
    else controls.start({ x: `-${index * 100}%` });
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-gray-700/40 bg-white/5">
      {/* Slider track */}
      <motion.div
        className="flex cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        transition={{ type: "spring", stiffness: 250, damping: 30 }}
        style={{ width: `${gallery.length * 100}%` }}
      >
        {gallery.map((img, i) => (
          <motion.div
            key={i}
            className="w-full flex-shrink-0 flex justify-center items-center"
            style={{ width: `${100 / gallery.length}%` }}
          >
            <img
              src={img}
              alt={`Screenshot ${i + 1}`}
              loading="lazy"
              className="rounded-xl object-cover w-full h-56 sm:h-64 md:h-72"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className={clsx(
          "absolute top-1/2 left-3 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur text-white transition hover:bg-black/60",
          { "opacity-40": index === 0 }
        )}
      >
        <LuChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        className={clsx(
          "absolute top-1/2 right-3 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur text-white transition hover:bg-black/60",
          { "opacity-40": index === gallery.length - 1 }
        )}
      >
        <LuChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {gallery.map((_, i) => (
          <div
            key={i}
            onClick={() => {
              setIndex(i);
              controls.start({ x: `-${i * 100}%` });
            }}
            className={clsx(
              "w-2.5 h-2.5 rounded-full cursor-pointer transition-all",
              i === index ? "bg-brand" : "bg-gray-500/50 hover:bg-gray-400"
            )}
          ></div>
        ))}
      </div>

      {/* Info Message */}
      {info && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
        >
          <LuInfo className="text-brand" />
          {info}
        </motion.div>
      )}
    </div>
  );
};

export default GallerySlider;
