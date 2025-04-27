import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, chakra } from '@chakra-ui/react';
import { v4 as getId } from 'uuid';

import { BubbleG } from './Bubble';

import { BubbleProps } from './interfaces';

const Svg = chakra('svg');

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t); // от 0 до 1

const Bubbles = () => {
  const location = useLocation();
  const isRoot = location.pathname === '/';
  const isShare = location.pathname === '/share';

  const [bubbles, setBubbles] = useState<BubbleProps[]>([]);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number>(0);

  // buble gen
  useEffect(() => {
    if (!wrapperRef.current || !(isRoot || isShare)) return;

    const { current: parentEl } = wrapperRef;

    const interval = setInterval(() => {
      const newBubble: BubbleProps = {
        id: getId(),
        color: (Math.floor(Math.random() * 3) + 1) * 100 + 100,
        x: parentEl.clientWidth * 0.68 + Math.random() * 72 - 32,
        y: parentEl.clientHeight - 48,
        r: Math.pow(Math.random() * 5, 2) + 3,
        start: performance.now(),
        duration: Math.random() * 12000 + 22000,
        finalY: -1 * Math.random() * 256,
        wiggleAmplitude: 4 + Math.random() * 16,
        wiggleFrequency: 10 + Math.random() * 40,
      };

      setBubbles((prev) => [...prev, newBubble]);
    }, 160);

    return () => clearInterval(interval);
  }, [isRoot, isShare]);

  // buble animation
  useEffect(() => {
    if (!wrapperRef.current) return;

    const animate = (time: number) => {
      setBubbles(
        (prev) =>
          prev
            .map((b) => {
              const progress = (time - b.start) / b.duration;

              if (progress >= 1 || b.finalY / b.y >= 0.8) return null; // pop bubble

              const eased = easeInOut(Math.min(progress, 1));

              return {
                ...b,
                y: b.y - eased * (b.y - b.finalY),
              };
            })
            .filter(Boolean) as BubbleProps[],
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
      position='absolute'
      top={0}
      left={0}
      color='fg'
      pointerEvents='none'
      zIndex={10}
    >
      {!!wrapperRef.current && (
        <Svg
          display='block'
          width={wrapperRef.current.clientWidth}
          height={wrapperRef.current.clientHeight}
          viewBox={`0 0 ${wrapperRef.current.clientWidth} ${wrapperRef.current.clientHeight}`}
        >
          {bubbles.map((bbl) => (
            <BubbleG key={bbl.id} {...bbl} />
          ))}
        </Svg>
      )}
    </Box>
  );
};

export { Bubbles };
