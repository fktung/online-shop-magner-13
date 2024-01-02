import React from "react";
import { useBearStore } from "@/hooks/zustand";
import { useTheme } from "next-themes";

export const ButtonDarkMode = () => {
  // const currentTheme = theme === 'system' ? systemTheme : theme;
  const { isDarcMode, setDarcMode } = useBearStore();
  const { systemTheme, theme, setTheme } = useTheme();

  const handleDarkMode = () => {
    setDarcMode(!isDarcMode);
    // theme == "dark"? setTheme('light'): setTheme("dark");
  };
  // console.log(isDarcMode);

  // useEffect((
  //   () => {
  //     isDarcMode !== (theme == "dark") ? setDarcMode(false) : setDarcMode(true)
  //   }
  // ), [isDarcMode, theme])

  return (
    <div>
      <button onClick={handleDarkMode}>
        Drck Mode {isDarcMode ? "On" : "Off"}
      </button>
    </div>
  );
};
