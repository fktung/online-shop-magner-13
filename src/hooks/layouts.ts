import { useTheme } from "next-themes";
import { create } from "zustand";

interface ILayoutStore {
  showSidebar: boolean;
  darkMode: boolean;
  loading: boolean;
  success: boolean;
  isError: boolean;
  message: string;
  modalSearch: boolean;
  modalNotif: boolean;
}

const layoutStore = create<ILayoutStore>(set => ({
  showSidebar: false,
  darkMode: false,
  loading: false,
  success: false,
  isError: false,
  message: "",
  modalSearch: false,
  modalNotif: false,
}));

export const useLayout = () => {
  const { theme, setTheme } = useTheme();
  const showSidebar = layoutStore(e => e.showSidebar);
  const isDarcMode = layoutStore(e => e.darkMode);
  const isLoading = layoutStore(e => e.loading);
  const isSuccess = layoutStore(e => e.success);
  const isError = layoutStore(e => e.isError);
  const isMessage = layoutStore(e => e.message);
  const isModalSearch = layoutStore(e => e.modalSearch);
  const isModalNotif = layoutStore(e => e.modalNotif);

  const setShowSidebar = (setMenu: boolean) => {
    layoutStore.setState({
      showSidebar: setMenu,
    });
  };
  const setDarcMode = (setMode: boolean) => {
    setMode ? setTheme("dark") : setTheme("light");
    layoutStore.setState({
      darkMode: setMode,
    });
  };
  const setIsloading = (setLoading: boolean) => {
    layoutStore.setState({
      loading: setLoading,
    });
  };

  const setIsSuccess = (setSuccess: boolean) => {
    layoutStore.setState({
      success: setSuccess,
    });
  };

  const setIsError = (setIsError: boolean) => {
    layoutStore.setState({
      isError: setIsError,
    });
  };

  const setIsMessage = (setMessage: string) => {
    layoutStore.setState({
      message: setMessage,
    });
  };

  const setIsModalSearch = (set: boolean) => {
    layoutStore.setState({
      modalSearch: set,
    });
  };

  const setIsModalNotif = (set: boolean) => {
    layoutStore.setState({
      modalNotif: set,
    });
  };

  return {
    theme,
    showSidebar,
    setShowSidebar,
    isDarcMode,
    setDarcMode,
    isLoading,
    setIsloading,
    isSuccess,
    setIsSuccess,
    isError,
    setIsError,
    isMessage,
    setIsMessage,
    isModalSearch,
    setIsModalSearch,
    isModalNotif,
    setIsModalNotif,
  };
};
