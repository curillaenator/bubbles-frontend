interface BubbleProps {
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
}

export type { BubbleProps };
