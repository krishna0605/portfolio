"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { usePersona } from "./PersonaProvider";

// Creative gallery images - Updated list
const galleryImages = [
  "/creativepics/IMG-20220524-WA0038.jpg",
  "/creativepics/IMG-20220524-WA0039.jpg",
  "/creativepics/IMG-20220524-WA0040.jpg",
  "/creativepics/IMG-20220524-WA0041.jpg",
  "/creativepics/IMG-20220524-WA0042.jpg",
  "/creativepics/Screenshot 2025-06-24 222240.png",
  "/creativepics/Screenshot 2025-06-24 222251.png",
  "/creativepics/Screenshot 2025-07-19 160729.png",
  "/creativepics/Screenshot 2025-07-21 155657.png",
  "/creativepics/Screenshot 2025-07-21 155733.png",
  "/creativepics/Screenshot 2025-07-21 155750.png",
  "/creativepics/Screenshot 2025-07-22 121016.png",
  "/creativepics/Screenshot 2025-07-22 121408.png",
  "/creativepics/Screenshot 2025-08-30 012912.png",
  "/creativepics/Screenshot 2025-09-05 122559.png",
  "/creativepics/Screenshot 2025-09-05 123141.png",
  "/creativepics/Screenshot 2026-01-12 210757.png",
];

const totalImages = galleryImages.length;

export const CreativeGallery = () => {
  const { persona } = usePersona();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, []);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  // Auto-play carousel (silent, no UI indicator)
  useEffect(() => {
    if (lightboxOpen || persona !== "creative") return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [lightboxOpen, nextSlide, persona]);

  // Only render in creative mode - AFTER all hooks
  if (persona !== "creative") return null;

  return (
    <>
      <section className="relative w-full bg-background border-b border-grid-line py-16 md:py-24 overflow-hidden">
        {/* Purple gradient glow */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.06), transparent 70%)`
          }}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-mono text-[11px] tracking-widest text-foreground/50 mb-3 uppercase"
            >
              {"// CREATIVE_SHOWCASE"}
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl font-medium text-foreground mb-4"
            >
              Gallery
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-foreground/50 text-sm max-w-md mx-auto"
            >
              A showcase of my ETS2 mods, 3D renders, and creative work
            </motion.p>
          </div>

          {/* Main Featured Image - Clean carousel without thumbnails */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-5xl mx-auto h-[350px] md:h-[550px] rounded-xl overflow-hidden border border-white/10 group cursor-pointer"
            onClick={() => openLightbox(currentIndex)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={galleryImages[currentIndex]}
                  alt={`Creative work ${currentIndex + 1}`}
                  fill
                  className="object-contain bg-black/20"
                  sizes="(max-width: 768px) 100vw, 1024px"
                  quality={95}
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Overlay with expand icon */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
            </div>

            {/* Image counter - subtle bottom right */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white/80 text-xs font-mono">
              {currentIndex + 1} / {totalImages}
            </div>

            {/* Navigation arrows - always visible on desktop, hover on mobile */}
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full text-white transition-all md:opacity-70 md:hover:opacity-100 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full text-white transition-all md:opacity-70 md:hover:opacity-100 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={28} />
            </button>

            {/* Dot indicators - minimal */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === index 
                      ? "bg-purple-500 w-6" 
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* Image counter */}
            <div className="absolute top-6 left-6 text-white/70 font-mono text-sm z-10">
              {lightboxIndex + 1} / {totalImages}
            </div>

            {/* Main lightbox image - high quality */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-[95vw] h-[90vh] max-w-7xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightboxIndex]}
                alt={`Creative work ${lightboxIndex + 1}`}
                fill
                sizes="95vw"
                quality={100}
                className="object-contain"
              />
            </motion.div>

            {/* Navigation */}
            <button
              onClick={(e) => { 
                e.stopPropagation(); 
                setLightboxIndex((prev) => (prev - 1 + totalImages) % totalImages);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full text-white transition-all z-10"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => { 
                e.stopPropagation(); 
                setLightboxIndex((prev) => (prev + 1) % totalImages);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full text-white transition-all z-10"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
