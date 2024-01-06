import { useLayout } from "@/hooks/layouts";
import React, { ReactNode, useEffect, useState } from "react";

type IPorops = {
  children: (handleClick: () => void, open: boolean) => ReactNode;
  activecondition: boolean;
};

const SidebarLinkGroup: React.FC<IPorops> = (props) => {
  const { children, activecondition } = props;
  const [open, setOpen] = useState(true);
  const { setShowSidebar, showSidebar } = useLayout();

  useEffect(() => {
    if (!showSidebar) {
      setOpen(false);
    }
  }, [showSidebar]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li className={`py-2 rounded-sm mb-0.5 last:mb-0`}>
      {children(handleClick, open)}
    </li>
  );
};

export default SidebarLinkGroup;
