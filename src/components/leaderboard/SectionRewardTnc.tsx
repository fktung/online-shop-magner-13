import React, { ReactNode } from "react";

type TSectionRewardTncProps = {
  data: string;
};

export const SectionRewardTnc = (props: TSectionRewardTncProps) => {
  return (
    <React.Fragment>
      <div
        className="grid gap-2 text-center"
        dangerouslySetInnerHTML={{ __html: props.data }}
      />
    </React.Fragment>
  );
};
