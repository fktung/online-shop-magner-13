import { TMenuLink } from "@/constant/layout";
import { useLayout } from "@/hooks/layouts";
import { useTranslationLocales } from "@/locales";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface IProps {
  data: TMenuLink;
}

export const SidebarItemsLink = (props: IProps) => {
  const pathNamer = usePathname();
  const { t } = useTranslationLocales();

  const { data } = props;
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

  const handleCloceSidebar = () => {
    setShowSidebar(false);
  };
  return (
    <>
      {Array.isArray(data.link) ? (
        <div className="collapse group">
          <input type="checkbox" onChange={handleClick} checked={open} />
          <div className="flex items-center justify-between pr-0 collapse-title">
            <p
              className={
                data.path === pathNamer
                  ? "active-sidebar"
                  : "group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:bottom-2 group-hover:before:w-full ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 group-hover:before:right-auto"
              }
            >
              {t(`${data.label}`)}
            </p>
            <div className="flex ml-2 shrink-0">
              <svg
                className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                  open && "rotate-180"
                }`}
                viewBox="0 0 12 12"
              >
                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
              </svg>
            </div>
          </div>
          <div className="collapse-content">
            {data.link.map((row, idx) => (
              <div key={idx} className="pl-4 mt-2">
                <Link href={row.link} onClick={handleCloceSidebar}>
                  {t(`${row.item}`)}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative py-4 pl-4 mt-2 mr-4 group">
          <Link href={data.link} onClick={handleCloceSidebar}>
            <p
              className={
                data.path === pathNamer
                  ? "active-sidebar"
                  : "group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:bottom-0 group-hover:before:w-full ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 group-hover:before:right-auto"
              }
            >
              {t(`${data.label}`)}
            </p>
          </Link>
        </div>
      )}
    </>
  );
};
