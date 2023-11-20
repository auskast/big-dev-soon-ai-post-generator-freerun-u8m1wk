import { IconProps } from "./types";

const TwitterIcon = ({ width = 24, height = 24, ...props }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M18.9014 1.15002H22.5816L14.5415 10.3393L24 22.8438H16.593L10.7924 15.2599L4.15519 22.8438H0.472813L9.07245 13.0149L0 1.15002H7.59282L12.836 8.08202L18.8992 1.15002H18.9014ZM17.6098 20.6411H19.649L6.48589 3.23708H4.29759L17.6098 20.6411Z" />
    </svg>
  );
};

export { TwitterIcon };
