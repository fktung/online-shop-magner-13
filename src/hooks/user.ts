import { ApiAxios } from "@/helpers/axios";
import { create } from "zustand";

type TUser = {
  membership: boolean;
  statusMembership?: string | null;
  avatar: string | null;
  cart: number;
};

const userStore = create<TUser>(() => ({
  membership: false,
  avatar: null,
  cart: 0,
}));

export const useUser = () => {
  const isMembership = userStore(e => e.membership);
  const isAvatar = userStore(e => e.avatar);
  const isStatusMembership = userStore(e => e.statusMembership);
  const isCart = userStore(e => e.cart);

  const setIsMembership = (set: boolean) => {
    userStore.setState({
      membership: set,
    });
  };

  const setIsStatusMembership = (status: string) => {
    userStore.setState({
      statusMembership: status,
    });
  };
  const setIsAvatar = (img: string | null) => {
    userStore.setState({
      avatar: img,
    });
  };
  const setDefaultUserMembership = () => {
    userStore.setState({
      membership: false,
      statusMembership: null,
      avatar: null,
    });
  };

  const setIsCard = (n: number) => {
    userStore.setState({
      cart: n,
    });
  };

  const getCountCart = async () => {
    try {
      const response = await ApiAxios.get("/user/count-cart");
      const countCard = response.data.data;
      setIsCard(countCard);
    } catch (error) {}
  };

  return {
    setDefaultUserMembership,
    isMembership,
    setIsMembership,
    isStatusMembership,
    setIsStatusMembership,
    isAvatar,
    setIsAvatar,
    getCountCart,
    isCart,
  };
};
