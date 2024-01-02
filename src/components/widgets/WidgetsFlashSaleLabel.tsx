import React from "react";

export const WidgetsFlashSaleLabel = () => {
  return (
    <React.Fragment>
      <div className="absolute top-2.5 -right-2.5 z-10 bg-[#fdcc00] px-2 rounded-sm">
        <p className="text-sm font-black text-red-500">Flash Sale</p>
      </div>
      <div
        className="absolute -right-2.5 top-7"
        style={{
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: "10px 10px 0 0",
          borderColor: "#816700 transparent transparent transparent",
        }}
      />
    </React.Fragment>
  );
};
