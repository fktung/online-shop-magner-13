import { ApiAxios } from "@/helpers/axios";
import { create } from "zustand";
import { getCookie } from "cookies-next";
import { useUser } from "./user";

type IPhone = {
  verification: boolean;
  number: string;
};

type TAuth = {
  id: string;
  auth: boolean;
  name: string;
  email: string;
  phone: IPhone;
  status: string;
  balance: number;
  order_balance: number;
  referral_code: string;
  previousUrl: string;
  referral_edit: boolean;
};

const authStore = create<TAuth>(() => ({
  id: "",
  auth: false,
  name: "",
  email: "",
  previousUrl: "",
  status: "",
  balance: 0,
  order_balance: 0,
  referral_code: "",
  referral_edit: false,
  phone: {
    verification: false,
    number: "",
  },
}));

export const useAuth = () => {
  const {
    setIsMembership,
    setIsStatusMembership,
    setIsAvatar,
    setDefaultUserMembership,
    getCountCart,
  } = useUser();
  const isId = authStore(e => e.id);
  const isAuth = authStore(e => e.auth);
  const isPreviousUrl = authStore(e => e.previousUrl);
  const isPhone = authStore(e => e.phone);
  const isName = authStore(e => e.name);
  const isEmail = authStore(e => e.email);
  const isStatus = authStore(e => e.status);
  const isBalance = authStore(e => e.balance);
  const isOrderBalance = authStore(e => e.order_balance);
  const isReferral_code = authStore(e => e.referral_code);
  const isReferral_edit = authStore(e => e.referral_edit);
  const token = getCookie("_MToken");

  const getMeCheck = async () => {
    let getAuth = false;
    try {
      const response = await ApiAxios.get(`/auth/user/me`);
      const getMe = await response.data.data;
      authStore.setState({
        auth: true,
        id: getMe.id,
        name: getMe.name,
        email: getMe.email,
        status: getMe.status,
        balance: getMe.balance,
        order_balance: getMe.order_balance,
        referral_code: getMe.referral_code,
        referral_edit: getMe.referral_edit,
        phone: {
          verification: true,
          number: getMe.phone,
        },
      });
      if (getMe.membership !== null) {
        setIsMembership(true);
        setIsStatusMembership(getMe.membership.status);
      }
      setIsAvatar(getMe.avatar);
      getAuth = true;
      getCountCart();
    } catch (error: any) {
      console.log("error catch", error);
      // deleteCookie("_MToken");
      setIsAuth(false);
    }
    return getAuth;
  };
  const getAuthMe = async () => {
    if (isAuth) return;
    if (!token) return;
    return await getMeCheck();
  };

  const setIsAuth = (set: boolean) => {
    authStore.setState({
      auth: set,
    });
  };

  const setIsName = (set: string) => {
    authStore.setState({
      name: set,
    });
  };

  const setIsPreviousUrl = (url: string) => {
    authStore.setState({
      previousUrl: url,
    });
  };

  const setIsPhone = (setPhone: IPhone) => {
    authStore.setState({
      phone: setPhone,
    });
  };

  const setIsLogout = () => {
    authStore.setState({
      auth: false,
      name: "",
      email: "",
      status: "",
      balance: 0,
      order_balance: 0,
      referral_code: "",
      phone: {
        verification: false,
        number: "",
      },
    });
    setDefaultUserMembership();
  };

  return {
    isId,
    isName,
    isEmail,
    isStatus,
    isBalance,
    isOrderBalance,
    isReferral_code,
    isReferral_edit,
    isAuth,
    setIsAuth,
    setIsName,
    isPreviousUrl,
    setIsPreviousUrl,
    isPhone,
    setIsPhone,
    getAuthMe,
    setIsLogout,
    getMeCheck,
  };
};
