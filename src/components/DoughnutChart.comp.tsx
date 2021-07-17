interface DoughnutChartProps {
  /** The amount which has been taken, this should be smaller than the total. */
  used: number;
  /** The total, which represents the 100%. */
  total: number;
}

export const DoughnutChart: React.FC<DoughnutChartProps> = ({
  used,
  total,
}) => {
  // Simply get the percentage of the balance that has been consumed.
  const percentage = total <= 0 ? 0 : Math.floor((used / total) * 10000) / 100;

  // We need to calculate an offset because 99% would fully fill the circle.
  const perWithOffset = percentage > 1 ? percentage - 0.6 : percentage;

  // Convert the percentage to degree's which ade being used to calculate. the circle.
  const degree = (perWithOffset / 100) * 360;

  // Calculate our radians which are used for the arc.
  const radian = (Math.PI * (360 - degree)) / 180;

  return (
    <div className="relative grid w-32 h-32 row-span-5 rounded-full bg-dark-700">
      <p className="absolute z-50 self-center text-lg text-center transform -translate-x-1/2 left-1/2">
        {percentage}%
      </p>
      <svg className="w-32 h-32 transform rotate-180 rounded-full">
        <circle
          className="fill-current text-accent-500"
          cx={64 + 56 * Math.sin(radian)}
          cy={64 + 56 * Math.cos(radian)}
          r="8"
        />
        <circle
          r="47"
          cx="50%"
          cy="50%"
          className="stroke-current text-accent-500"
          style={{
            strokeDasharray: `${(perWithOffset / 100) * (47 * (2 * Math.PI))} ${
              (1 - perWithOffset / 100) * (47 * (2 * Math.PI))
            }`,
            strokeDashoffset: "-73",
            strokeWidth: "36",
          }}
        />
        <circle
          r="48"
          cx="50%"
          cy="50%"
          className="fill-current text-dark-500"
        />
      </svg>
    </div>
  );
};
