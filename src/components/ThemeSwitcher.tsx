"use client";
import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { GoMoon, GoSun } from "react-icons/go";

const ThemeSwitcher: React.FC = () => {
  // const [isDark, setIsDark] = useState<boolean>(
  //   JSON.parse(localStorage.getItem("isDark") || "false")
  // );
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      // localStorage.setItem("isDark", "true");
    } else {
      document.body.classList.remove("dark");
      // localStorage.setItem("isDark", "false");
    }
  }, [isDark]);

  return (
    <Toggle aria-label="Toggle bold" onClick={() => setIsDark((pv) => !pv)}>
      {isDark ? <GoSun size={24} /> : <GoMoon size={24} />}
    </Toggle>
  );
};

export default ThemeSwitcher;
