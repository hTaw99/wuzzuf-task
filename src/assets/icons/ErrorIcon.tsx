type IconProps = {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
};

export default function ErrorIcon(props: IconProps) {
  const { size = 24, fillColor = "none", strokeColor = "#808080" } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 19"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 5.5V11.5M20.2169 18H1.78306C1.00213 18 0.522558 17.1449 0.929774 16.4786L10.1467 1.39628C10.5366 0.758213 11.4634 0.758212 11.8533 1.39628L21.0702 16.4785C21.4774 17.1449 20.9979 18 20.2169 18Z"
        stroke={strokeColor}
        stroke-linecap="round"
      />
      <circle cx="11" cy="14" r="1" fill={strokeColor} />
    </svg>
  );
}
