import { create } from "zustand";

interface IProductStore {
  keySearch: string;
}

const productStore = create<IProductStore>(set => ({
  keySearch: "",
}));

export const useProduct = () => {
  const isKeySearch = productStore(e => e.keySearch);

  const setKeySearch = (search: string) => {
    productStore.setState({
      keySearch: search,
    });
  };
  return {
    isKeySearch,
    setKeySearch,
  };
};
