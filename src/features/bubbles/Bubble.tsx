import React from 'react';

import type { BubbleProps } from './interfaces';

const BubbleG: React.FC<BubbleProps> = (props) => {
  const cx =
    props.x +
    Math.sin(((performance.now() - props.start) / props.duration) * Math.PI * 2 * props.wiggleFrequency) *
      props.wiggleAmplitude;

  const specularR = props.r * 0.66;
  const specularCircumference = 2 * Math.PI * specularR;

  return (
    <g>
      <circle
        data-bubble-bg
        cx={cx}
        cy={props.y}
        r={props.r}
        fill={`var(--chakra-colors-blue-${props.color})`}
        opacity={0.25}
      />

      <circle
        data-bubble-fresnel
        cx={cx}
        cy={props.y}
        r={props.r}
        fill='none'
        stroke='currentColor'
        strokeWidth={0.6}
      />

      <circle
        data-bubble-specular
        cx={cx}
        cy={props.y}
        r={specularR}
        stroke='currentColor'
        strokeWidth={0.08 * props.r}
        fill='none'
        strokeDasharray={`${specularCircumference * 0.24}px, 1000px`}
        strokeDashoffset={`-${specularCircumference * 0.56}px`}
        strokeLinecap='round'
        opacity={0.85}
      />
    </g>
  );
};

export { BubbleG };
