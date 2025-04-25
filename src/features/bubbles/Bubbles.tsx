import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { v4 as getId } from 'uuid';

type Bubble = {
  id: number | string;
  color: number;
  x: number;
  y: number;
  r: number;
  start: number;
  duration: number;
  finalY: number;
  wiggleAmplitude: number;
  wiggleFrequency: number;
};

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t); // от 0 до 1

const Bubbles: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const animationRef = useRef<number>(0);

  // buble gen
  useEffect(() => {
    if (!wrapperRef.current) return;

    const { current: parentEl } = wrapperRef;

    const interval = setInterval(() => {
      const newBubble: Bubble = {
        id: getId(),
        color: (Math.floor(Math.random() * 3) + 1) * 100,
        x: parentEl.clientWidth * 0.72 + Math.random() * 48 - 24,
        y: parentEl.clientHeight - 32,
        r: Math.pow(Math.random() * 5, 2) + 3,
        start: performance.now(),
        duration: Math.random() * 12000 + 22000,
        finalY: -1 * Math.random() * 256,
        wiggleAmplitude: 4 + Math.random() * 16,
        wiggleFrequency: 10 + Math.random() * 40,
      };

      setBubbles((prev) => [...prev, newBubble]);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // buble animation
  useEffect(() => {
    if (!wrapperRef.current) return;

    const animate = (time: number) => {
      setBubbles(
        (prev) =>
          prev
            .map((b) => {
              const progress = (time - b.start) / b.duration;

              if (progress >= 1 || b.finalY / b.y >= 0.8) return null; // удалить пузырёк

              const eased = easeInOut(Math.min(progress, 1));

              return {
                ...b,
                y: b.y - eased * (b.y - b.finalY),
              };
            })
            .filter(Boolean) as Bubble[],
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current!);
  }, []);

  return (
    <Box ref={wrapperRef} w='100%' h='100%' flex='1 1 auto' position='absolute' top={0} left={0} color='fg'>
      {!!wrapperRef.current && (
        <svg
          width={wrapperRef.current.clientWidth}
          height={wrapperRef.current.clientHeight}
          viewBox={`0 0 ${wrapperRef.current.clientWidth} ${wrapperRef.current.clientHeight}`}
        >
          {bubbles.map((b) => {
            const cx =
              b.x +
              Math.sin(((performance.now() - b.start) / b.duration) * Math.PI * 2 * b.wiggleFrequency) *
                b.wiggleAmplitude;

            return (
              <g key={b.id}>
                <circle cx={cx} cy={b.y} r={b.r} fill={`var(--chakra-colors-blue-${b.color})`} opacity={0.3} />
                <circle cx={cx} cy={b.y} r={b.r} fill='none' stroke='currentColor' strokeWidth={1} />
              </g>
            );
          })}
        </svg>
      )}
    </Box>
  );
};

export { Bubbles };
