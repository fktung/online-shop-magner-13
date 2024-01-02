import React, { useEffect, useState } from "react";

interface IPaginationProps {
  total_pages: number;
  getIsPage: (props: string) => void;
  currenPage?: number;
}

export const Pagination = (props: IPaginationProps) => {
  const { total_pages, getIsPage, currenPage } = props;
  let [num, setNum] = useState(1);
  let [cur, setCur] = useState(currenPage || 1);

  useEffect(() => {
    if (currenPage && currenPage != cur) {
      setCur(currenPage || 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currenPage]);

  const pages = [
    { page: num },
    { page: num + 1 },
    { page: num + 2 },
    { page: num + 3 },
  ];
  function right() {
    num < total_pages - 3 && setNum(++num);
  }
  function left() {
    num > 1 && setNum(--num);
  }

  const leftBack = () => {
    if (cur <= 1) return;
    const newCur = --cur;
    setCur(newCur);
    getIsPage(newCur.toString());
    if (cur < num + 1) {
      left();
    }
  };

  const rightNext = () => {
    if (cur >= total_pages) return;
    const newCur = ++cur;
    setCur(newCur);
    getIsPage(newCur.toString());
    if (cur > num + 2) {
      right();
    }
  };

  const handleBtn = (i: number) => {
    setCur(i);
    getIsPage(i.toString());
  };
  return (
    <div className="flex rounded-lg">
      <button
        className="hidden h-12 px-4 transition-all duration-300 border-2 border-r-0 border-black rounded-l-lg sm:inline-block hover:bg-black hover:text-white"
        onClick={leftBack}
      >
        prev
      </button>
      {total_pages > 4 && (
        <button
          onClick={left}
          className="w-12 h-12 transition-all duration-300 border-2 border-r-0 border-black rounded-l-lg sm:rounded-l-none hover:bg-black hover:text-white"
        >
          <svg className="w-4 h-4 mx-auto fill-current" viewBox="0 0 20 20">
            <path
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
      )}
      {pages.map(
        (pg, i) =>
          i < total_pages && (
            <button
              key={i}
              onClick={() => handleBtn(pg.page)}
              className={`h-12 border-2 sm:border-r-0 border-black
            w-12 ${cur === pg.page && "bg-black text-white"} ${
              i + 1 != total_pages && "border-r-0"
            }`}
            >
              {pg.page}
            </button>
          ),
      )}
      {total_pages > 4 && (
        <button
          onClick={right}
          className="w-12 h-12 transition-all duration-300 border-2 border-black rounded-r-lg sm:rounded-r-none sm:border-r-0 hover:bg-black hover:text-white"
        >
          <svg className="w-4 h-4 mx-auto fill-current" viewBox="0 0 20 20">
            <path
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
      )}
      <button
        className="hidden h-12 px-4 transition-all duration-300 border-2 border-black rounded-r-lg sm:inline-block hover:bg-black hover:text-white"
        onClick={rightNext}
      >
        next
      </button>
    </div>
  );
};
