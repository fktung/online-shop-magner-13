import { create } from "zustand";

type TQuery = {
  idAddress: string;
};

const queryStore = create<TQuery>(() => ({
  idAddress: "",
}));

export const useQuery = () => {
  const isIdAddress = queryStore(e => e.idAddress);

  const setIsIdAddress = (set: string) => {
    queryStore.setState({
      idAddress: set,
    });
  };

  return { isIdAddress, setIsIdAddress };
};
