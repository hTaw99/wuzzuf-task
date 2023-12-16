type IconProps = {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
};

export default function SearchIcon(props: IconProps) {
  const { size = 24, fillColor = "none", strokeColor = "#808080" } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.0114 17.6101H18.7467L18.2985 17.1778C19.8674 15.3528 20.8119 12.9834 20.8119 10.4059C20.8119 4.65866 16.1532 0 10.4059 0C4.65866 0 0 4.65866 0 10.4059C0 16.1532 4.65866 20.8119 10.4059 20.8119C12.9834 20.8119 15.3528 19.8674 17.1778 18.2985L17.6101 18.7467V20.0114L25.6146 28L28 25.6146L20.0114 17.6101ZM10.4059 17.6101C6.41967 17.6101 3.20183 14.3922 3.20183 10.4059C3.20183 6.41967 6.41967 3.20183 10.4059 3.20183C14.3922 3.20183 17.6101 6.41967 17.6101 10.4059C17.6101 14.3922 14.3922 17.6101 10.4059 17.6101Z"
        fill={strokeColor}
      />
    </svg>
  );
}
