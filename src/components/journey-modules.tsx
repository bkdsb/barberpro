'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type PointerEvent } from 'react';

type CourseModule = {
  title: string;
  text: string;
  image: string;
};

type JourneyModulesProps = {
  modules: CourseModule[];
};

const MOBILE_BREAKPOINT = 900;

export function JourneyModules({ modules }: JourneyModulesProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const startXRef = useRef<number | null>(null);
  const deltaXRef = useRef(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % modules.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + modules.length) % modules.length);
  };

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const sync = () => {
      const mobile = media.matches;
      setIsMobile(mobile);
      setActiveIndex((prev) => (mobile ? prev % modules.length : 0));
    };

    sync();
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', sync);
      return () => media.removeEventListener('change', sync);
    }
    media.addListener(sync);
    return () => media.removeListener(sync);
  }, [modules.length]);

  useEffect(() => {
    if (!isMobile || modules.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % modules.length);
    }, 4400);
    return () => window.clearInterval(timer);
  }, [isMobile, modules.length]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    startXRef.current = event.clientX;
    deltaXRef.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isMobile || startXRef.current === null) return;
    deltaXRef.current = event.clientX - startXRef.current;
  };

  const onPointerEnd = () => {
    if (!isMobile || startXRef.current === null) return;
    const delta = deltaXRef.current;
    const threshold = 46;

    if (delta <= -threshold) nextSlide();
    else if (delta >= threshold) prevSlide();

    startXRef.current = null;
    deltaXRef.current = 0;
  };

  if (isMobile) {
    return (
      <div className="journey-slider" role="region" aria-label="Módulos do curso">
        <button type="button" className="journey-arrow prev" aria-label="Módulo anterior" onClick={prevSlide}>
          ‹
        </button>

        <div
          className="journey-viewport"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          onPointerLeave={onPointerEnd}
        >
          <div className="journey-track" style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}>
            {modules.map((module, index) => (
              <article key={module.title} className="journey-card journey-slide">
                <div className="journey-card-media">
                  <Image
                    src={module.image}
                    alt={`Módulo ${index + 1} - ${module.title}`}
                    width={640}
                    height={960}
                    sizes="(max-width: 900px) 100vw, 25vw"
                    quality={84}
                    className="journey-image"
                  />
                  <div className="journey-image-vignette" aria-hidden="true" />
                </div>
                <div className="journey-card-body">
                  <h3>{module.title}</h3>
                  <p>{module.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button type="button" className="journey-arrow next" aria-label="Próximo módulo" onClick={nextSlide}>
          ›
        </button>
      </div>
    );
  }

  return (
    <>
      {modules.map((module, index) => (
        <article key={module.title} className="journey-card">
          <div className="journey-card-media">
            <Image
              src={module.image}
              alt={`Módulo ${index + 1} - ${module.title}`}
              width={640}
              height={960}
              sizes="(max-width: 900px) 100vw, 25vw"
              quality={84}
              className="journey-image"
            />
            <div className="journey-image-vignette" aria-hidden="true" />
          </div>
          <div className="journey-card-body">
            <h3>{module.title}</h3>
            <p>{module.text}</p>
          </div>
        </article>
      ))}
    </>
  );
}
