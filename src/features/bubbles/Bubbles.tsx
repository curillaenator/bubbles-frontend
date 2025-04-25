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
        r: Math.random() * 24 + 2,
        start: performance.now(),
        duration: Math.random() * 10000 + 24000,
        finalY: -1 * Math.random() * 256,
        wiggleAmplitude: 4 + Math.random() * 16, // от 10 до 15 px в стороны
        wiggleFrequency: 10 + Math.random() * 40, // от 2 до 4 колебаний за подъем
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
    <Box
      ref={wrapperRef}
      w='100%'
      h='100%'
      flex='1 1 auto'
      position='absolute'
      top={0}
      left={0}
      // zIndex={-1}
    >
      {!!wrapperRef.current && (
        <svg
          width={wrapperRef.current.clientWidth}
          height={wrapperRef.current.clientHeight}
          viewBox={`0 0 ${wrapperRef.current.clientWidth} ${wrapperRef.current.clientHeight}`}
          style={{
            display: 'block',
          }}
        >
          {bubbles.map((b) => {
            // const bubbleProgress = (performance.now() - b.start) / b.duration;
            // const bubbleEased = easeInOut(Math.min(bubbleProgress * 4, 1));
            // const bubbleOpacity = 1 - bubbleEased; // fade out

            return (
              <>
                <circle
                  key={b.id}
                  cx={
                    b.x +
                    Math.sin(((performance.now() - b.start) / b.duration) * Math.PI * 2 * b.wiggleFrequency) *
                      b.wiggleAmplitude
                  }
                  cy={b.y}
                  r={b.r}
                  fill={`var(--chakra-colors-blue-${b.color})`}
                  opacity={0.75}
                />

                <circle
                  key={b.id + '123'}
                  cx={
                    b.x +
                    Math.sin(((performance.now() - b.start) / b.duration) * Math.PI * 2 * b.wiggleFrequency) *
                      b.wiggleAmplitude
                  }
                  cy={b.y}
                  r={b.r}
                  fill='none'
                  stroke='#fff'
                  strokeWidth={2}
                />
              </>
            );
          })}
        </svg>
      )}
    </Box>
  );
};

export { Bubbles };
