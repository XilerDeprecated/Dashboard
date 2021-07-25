import { SVGProps, createRef, useEffect, useState } from "react";

import { useContainerDimensions } from "@utils/useDimensions";

/**
 * The popup props.
 */
type OverPopupProps = {
  /** The horizontal axis location fir the popup. */
  x: number;
  /** The vertical axis location fir the popup. */
  y: number;

  /** Whether the text should be displayed on the right side of the popup. */
  right: boolean;

  /** The value of that location. */
  value: string;
  /** An extra detail of that location. */
  extra?: string;

  /** If stubs should be be shown. */
  isShowingStubs: boolean;
};

const OverPopup: React.FC<OverPopupProps> = (props) => {
  const text = createRef<SVGTextElement>();
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    // We have to ceil the number to an integer to prevent weird behavior with floating point numbers.
    const w = Math.ceil(text.current?.getBBox().width ?? 0);
    if (w !== width) setWidth(w);
  }, [text, width]);

  return (
    <g>
      {/* The text background. */}
      <rect
        className="fill-current text-dark-800"
        x={props.x - 8 - (props.right ? 0 : width ?? 0)}
        y={props.y - 48}
        width={(width ?? 0) + 16}
        height="27"
        rx="7"
      />
      {/* The pointing corner. */}
      <path
        className="fill-current text-dark-800"
        d={`M${props.x - (props.right ? 6 : 13)},${props.y - 31} l0,8,${
          props.right ? 7 : 13
        },13,${props.right ? 12 : 6},-13,0,-8 z`}
      />
      {/* The text. */}
      <text
        ref={text}
        className="z-20 fill-current text-primary-500"
        x={props.x - (props.right ? 0 : width ?? 0)}
        y={props.y - 30}
      >
        {props.value}
        {/* Only show the extra if no stubs are being displayed bcs of screen size. */}
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

/**
 * The chart props.
 */
type GraphProps = {
  /** Represents what the current chart is about. */
  title: string;
  /** All the data of the chart. */
  data: number[];
  /** Optional extra data which relates to the chart. */
  subs?: string[];
  /** Whether the subs should be displayed under the chart. */
  showSubs?: boolean;
};

export const Graph: React.FC<GraphProps> = (props) => {
  const [isOver, setIsOver] = useState<OverPopupProps | null>(null);
  const svg = createRef<SVGSVGElement>();
  const width = useContainerDimensions<SVGSVGElement>(svg);

  const max = Math.max(...props.data);

  const bars: SVGProps<SVGRectElement>[] = [];
  const subs: SVGProps<SVGTextElement>[] = [];

  // Make the with of the bars dynamic by the amount of bars we have.
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
    // Skip the first line and calculate the coords.
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
      className="w-full select-none"
      height={props.showSubs && window.innerWidth >= 1536 ? "311" : "278"}
      onMouseLeave={() => setIsOver(null)}
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

      {isOver !== null && <OverPopup {...isOver} />}
    </svg>
  );
};
