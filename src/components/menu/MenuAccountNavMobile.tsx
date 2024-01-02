import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

type TOption = {
  name: string;
  slug: string;
  icon?: JSX.Element;
};

export const MenuAccountNavMobile = ({ options }: { options: TOption[] }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname } = router;
  const currentSelectedItem = pathname
    ? options.find(o => o.slug === pathname)!
    : options[0];
  const [selectedItem, setSelectedItem] =
    useState<TOption>(currentSelectedItem);

  useEffect(() => {
    setSelectedItem(currentSelectedItem);
  }, [currentSelectedItem]);

  function handleItemClick(slugs: any) {
    setSelectedItem(slugs);
    router.push(slugs.slug);
  }

  return (
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }) => (
        <div className="relative w-full font-body">
          <Listbox.Button className="relative flex items-center w-full gap-4 p-4 border rounded cursor-pointer ltr:text-left rtl:text-right focus:outline-none border-border-base">
            {selectedItem?.icon}
            <span className="flex truncate items-center text-sm md:text-15px font-medium ltr:pl-2.5 rtl:pr-2.5 relative">
              {t(selectedItem?.name)}
            </span>
            <span className="absolute inset-y-0 flex items-center pointer-events-none right-4 rtl:left-4 md:right-5">
              <FaChevronDown
                className="w-3 md:w-3.5 h-3 md:h-3.5 text-opacity-70"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute z-20 w-full py-2.5 mt-1.5 overflow-auto bg-brand-light dark:bg-dark-components rounded-md shadow-dropDown max-h-72 focus:outline-none text-sm md:text-15px"
            >
              {options?.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `cursor-pointer relative py-3 px-4 md:px-5 ${
                      active
                        ? "bg-fill-dropdown-hover dark:bg-brand-muted"
                        : "bg-brand-light dark:bg-dark-components"
                    }`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <span className="flex items-center gap-4">
                      {option?.icon}
                      <span
                        className={`${
                          option?.icon ? "font-bold" : "ml-9"
                        } block truncate ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-3 md:rtl:pr-3`}
                      >
                        {t(option?.name)}
                      </span>
                      {selected ? (
                        <span
                          className={`${active && "text-amber-600"}
                            absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3`}
                        />
                      ) : null}
                    </span>
                  )}
                </Listbox.Option>
              ))}
              <button className="flex items-center w-full px-4 py-3 text-sm cursor-pointer lg:text-15px md:px-5 focus:outline-none">
                {/* <span className="flex justify-center shrink-0">
                  <LogoutIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />
                </span> */}
                <span className="block truncate ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-3 md:rtl:pr-3">
                  {t("text-logout")}
                </span>
              </button>
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};
