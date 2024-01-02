import { useProduct } from "@/hooks/hookProduct";
import { useLayout } from "@/hooks/layouts";
import { TSearchStore } from "@/types";
import { t } from "i18next";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

interface IProps {
  className?: string;
}

export const InputSearchProduct: React.FC<IProps> = (props) => {
  const { className } = props;
  const { setIsModalSearch } = useLayout();
  const { isKeySearch, setKeySearch } = useProduct();
  const [isLoadSearchStore, setIsLoadSearchStore] = useState<TSearchStore[]>(
    []
  );
  const [isLoadSearchStoreFil, setIsLoadSearchStoreFil] = useState<
    TSearchStore[]
  >([]);
  const router = useRouter();
  const params = useParams();
  console.log(params);
  const { search, ...rest } = params;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getProductByKey();
  };

  const getProductByKey = async (keySearch: string = isKeySearch) => {
    let ctAll = "";
    if (rest) {
      ctAll =
        "&" +
        Object.keys(rest).map(
          (key) => `${key}=${encodeURIComponent(rest[key] as string)}`
        );
    }
    router.push(`/products?search=${keySearch}${ctAll}`);
    setIsModalSearch(false);
  };

  let loadDataSearch = "[]";
  if (typeof window !== "undefined") {
    loadDataSearch = localStorage.getItem("search-results") ?? "[]";
  }
  useEffect(() => {
    setIsLoadSearchStore(JSON.parse(loadDataSearch).slice().reverse());
    setIsLoadSearchStoreFil(JSON.parse(loadDataSearch).slice().reverse());
  }, [loadDataSearch]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = e.target.value;
    setKeySearch(valueInput);
    setIsLoadSearchStoreFil(
      isLoadSearchStore.filter((item) =>
        item.name.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase())
      )
    );
  };

  const handleSelectSuggestion = (name: string) => {
    setKeySearch(name);
    getProductByKey(name);
  };

  return (
    <div
      className={`justify-end w-full max-w-xl
      ${className ? className : "flex"}`}
    >
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          onChange={handleOnChange}
          value={isKeySearch}
          placeholder={`${t("common.searchProduct")}`}
          className="w-full transition-all duration-300 sm:opacity-100 input-bordered input"
        />
        <button type="submit" className="absolute top-0 bottom-0 right-4">
          <i className="text-2xl transition-all duration-300 hover:text-3xl">
            <BiSearch />
          </i>
        </button>
      </form>
      <div className="my-2 min-h-max max-h-[50vh] overflow-y-auto">
        {isLoadSearchStoreFil.map((item, idx) => (
          <div key={idx} className="my-1">
            <button
              className="w-full px-2 py-1 text-left transition-all duration-300 rounded-lg hover:bg-brand-muted/30"
              onClick={() => handleSelectSuggestion(item.name)}
            >
              {item.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
