import { useTranslationLocales } from "@/locales";
import { useRouter } from "next/navigation";
import React from "react";

type listLink = {
  id: number;
  title: string;
  path: string;
};

interface IWidgetLinks {
  widgetTitle: string;
  lists: listLink[];
}

interface IProps {
  data: IWidgetLinks;
}

export const WidgetLinks: React.FC<IProps> = ({ data }) => {
  const { widgetTitle, lists } = data;
  const router = useRouter();
  const { t } = useTranslationLocales();
  return (
    <div className="pb-3.5 sm:pb-0 col-span-1 xl:col-span-2 min-w-[15rem] md:min-w-min h-full">
      <h2 className="text-brand-dark dark:text-brand-light text-base lg:text-xl lg:leading-7 font-bold mb-4 sm:mb-5 lg:mb-6 pb-0.5">
        {t(`${widgetTitle}`)}
      </h2>
      <li className="flex flex-col space-y-3 text-sm lg:text-15px">
        {lists.map((row, idx) => (
          <ul key={idx} className="flex items-baseline">
            <button onClick={() => router.push(row.path)}>
              {t(`${row.title}`)}
            </button>
          </ul>
        ))}
      </li>
    </div>
  );
};
