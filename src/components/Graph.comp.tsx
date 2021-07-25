import { SVGProps, createRef, useEffect, useState } from "react";

import { useContainerDimensions } from "@utils/useDimensions";

// TODO: Document this
type OverPopup = {
  x: number;
  y: number;

  right: boolean;

  value: string;
  extra?: string;

  isShowingStubs: boolean;
};

const OverPopupEl: React.FC<OverPopup> = (props) => {
  const text = createRef<SVGTextElement>();
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    // TODO: Document this
    const w = Math.ceil(text.current?.getBBox().width ?? 0);
    if (w !== width) setWidth(w);
  }, [text, width]);

  // TODO: Document this a bit
  return (
    <g>
      <rect
        className="fill-current text-dark-800"
        x={props.x - 8 - (props.right ? 0 : width ?? 0)}
        y={props.y - 48}
        width={(width ?? 0) + 16}
        height="27"
        rx="7"
      />
      <path
        className="fill-current text-dark-800"
        d={`M${props.x - (props.right ? 7 : 14)},${props.y - 31} l0,8,${
          props.right ? 8 : 14
        },13,${props.right ? 13 : 7},-13,0,-8 z`}
      />
      <text
        ref={text}
        className="z-20 fill-current text-primary-500"
        x={props.x - (props.right ? 0 : width ?? 0)}
        y={props.y - 30}
      >
        {props.value}
        {props.extra === undefined
          ? ""
          : props.isShowingStubs
          ? window.innerWidth < 1536
            ? ` - ${props.extra}`
            : ""
          : ` - ${props.extra}`}
      </text>
    </g>
  );
};

// TODO: Document this
type GraphProps = {
  title: string;
  data: number[];
  subs?: string[];
  showSubs?: boolean;
};

export const Graph: React.FC<GraphProps> = (props) => {
  const [isOver, setIsOver] = useState<OverPopup | null>(null);
  const svg = createRef<SVGSVGElement>();
  const width = useContainerDimensions<SVGSVGElement>(svg);

  const max = Math.max(...props.data);

  const bars: SVGProps<SVGRectElement>[] = [];
  const subs: SVGProps<SVGTextElement>[] = [];

  // TODO: Document this a bit
  const elSpacing = width / props.data.length;
  const elWidth = (width * 0.8) / props.data.length;
  const elHalf = elWidth / 2;
  const dataLengthHalf = props.data.length / 2;

  useEffect(() => setIsOver(null), [width]);

  for (let i = 0; i < props.data.length; i++) {
    bars.push(
      <rect
        key={i}
        y="20"
        x={elSpacing * i}
        width={elWidth}
        height="250"
        className="transition-colors hover:text-dark-600"
        onMouseEnter={() =>
          setIsOver({
            // TODO: Document this a bit
            x: elSpacing * i + elHalf + 0.1,
            y: 250 - (200 * (props.data[i] / max) - 5),
            value: props.data[i].toLocaleString(),
            extra: props?.subs?.[i],
            right: i < dataLengthHalf,
            isShowingStubs: !!props.showSubs,
          })
        }
      />
    );

    if (props.showSubs)
      subs.push(
        <text key={i} x={elSpacing * i} y="285" textLength={elWidth}>
          {props?.subs?.[i]}
        </text>
      );
  }

  const lines: SVGProps<SVGLineElement>[] = [];

  for (let i = 1; i < props.data.length; i++)
    // TODO: Document this a bit
    lines.push(
      <line
        key={i}
        x1={elSpacing * (i - 1) + elHalf - 0.2}
        y1={250 - (200 * (props.data[i - 1] / max) - 5)}
        x2={elSpacing * i + elHalf + 0.1}
        y2={250 - (200 * (props.data[i] / max) - 5)}
      />
    );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      ref={svg}
      className="w-full"
      height="311"
    >
      <text x="0" y="10" className="text-sm fill-current text-primary-600">
        {props.title}
      </text>

      {/* Background */}
      <g className="fill-current text-dark-700">{bars}</g>

      {/* Subs */}
      <g className="invisible text-xs fill-current text-primary-600 2xl:visible">
        {subs}
      </g>

      {/* Graph */}
      <g className="stroke-current stroke-2 text-secondary-500">{lines}</g>

      {isOver !== null && <OverPopupEl {...isOver} />}
    </svg>
  );
};
