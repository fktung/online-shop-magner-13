import React from "react";

interface Iprops {
  className?: string;
  color?: string;
}

export const IconList = (props: Iprops) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        d="M15.5 3H2.5C1.94772 3 1.5 3.44772 1.5 4V20C1.5 20.5523 1.94772 21 2.5 21H15.5C16.0523 21 16.5 20.5523 16.5 20V4C16.5 3.44772 16.0523 3 15.5 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 1V4M12 1V4M5 8.5H13M5 12.5H11M5 16.5H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
