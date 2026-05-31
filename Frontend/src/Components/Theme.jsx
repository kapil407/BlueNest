import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setTheme } from "../redux/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const [localTheme, setLocalTheme] = useState(
    localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    if (localTheme === "dark") {
      document.body.style.background = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.background = "white";
      document.body.style.color = "black";
    }

    localStorage.setItem("theme", localTheme);
    dispatch(setTheme(localTheme)); //  plain value
  }, [localTheme, dispatch]);

  const toggleTheme = () => {
    setLocalTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={toggleTheme}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1D9BF0] text-white shadow-xl shadow-sky-500/30 transition hover:bg-sky-500"
        aria-label="Toggle theme"
      >
        {localTheme === "light" ? (
          <MdDarkMode size={22} />
        ) : (
          <MdLightMode size={22} />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
