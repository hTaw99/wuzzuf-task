type IconProps = {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
};

export default function NotFoundIcon(props: IconProps) {
  const { size = 24, fillColor = "none", strokeColor = "#808080" } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 0.5H15C16.3807 0.5 17.5 1.61929 17.5 3V3.5H6.5V3C6.5 1.61929 7.61929 0.5 9 0.5Z"
        stroke={strokeColor}
      />
      <circle cx="12" cy="12" r="5.5" stroke={strokeColor} />
      <path
        d="M10 10L13.8284 13.8284"
        stroke={strokeColor}
        strokeLinecap="round"
      />
      <path
        d="M13.8286 10L10.0003 13.8284"
        stroke={strokeColor}
        strokeLinecap="round"
      />
      <path d="M12 18V24" stroke={strokeColor} strokeLinecap="round" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4H19C21.2091 4 23 5.79086 23 8V16C23 18.2091 21.2091 20 19 20H14V21H19C21.7614 21 24 18.7614 24 16V8C24 5.23858 21.7614 3 19 3H5C2.23858 3 0 5.23858 0 8V16C0 18.7614 2.23858 21 5 21H10V20H5C2.79086 20 1 18.2091 1 16V8C1 5.79086 2.79086 4 5 4Z"
        fill={strokeColor}
      />
    </svg>
  );
}
