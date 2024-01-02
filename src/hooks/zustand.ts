import { useTheme } from "next-themes";
import { useEffect } from "react";
import { create } from "zustand";

interface storeBear {
  bears: number;
  darkMode: boolean;
}

const storeBear = create<storeBear>(set => ({
  bears: 0,
  darkMode: false,
}));

export const useBearStore = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const isBears = storeBear(e => e.bears);
  const isDarcMode = storeBear(e => e.darkMode);

  // useEffect((
  //   () => {
  //     theme == "dark" ?
  //     storeBear.setState({
  //       darkMode: false
  //     }) :
  //     storeBear.setState({
  //       darkMode: true
  //     })
  //   }
  // ), [theme])

  const setBear = (setBears: number) => {
    storeBear.setState({
      bears: setBears + 1,
    });
  };
  const setDarcMode = (setMode: boolean) => {
    setMode ? setTheme("dark") : setTheme("light");
    storeBear.setState({
      darkMode: setMode,
    });
  };

  return { isBears, isDarcMode, setBear, setDarcMode };
};
