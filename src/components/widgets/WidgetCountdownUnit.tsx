import React from "react";

interface IWidgetCountdownUnitProps {
  className?: string;
  animation: boolean;
  position: number;
  unitNumber: number[];
}

export const WidgetCountdownUnit = (props: IWidgetCountdownUnitProps) => {
  const { className, animation, position, unitNumber } = props;
  return (
    <div
      className={`absolute ${className} ${
        animation && "transition-all duration-300"
      }`}
      style={{
        top: -position,
      }}
    >
      {unitNumber.map((i, idx) => (
        <p key={idx}>{i}</p>
      ))}
    </div>
  );
};
