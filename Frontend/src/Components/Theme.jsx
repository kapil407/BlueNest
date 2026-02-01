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
    dispatch(setTheme(localTheme)); // ✅ plain value
  }, [localTheme, dispatch]);

  const toggleTheme = () => {
    setLocalTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="fixed left-3 top-1/2 w-[8%] -translate-y-1/2 z-50 ml-8">
      <button
        onClick={toggleTheme}
        className="p-3 rounded-xl bg-gray-200 text-black shadow-lg transition w-full"
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
