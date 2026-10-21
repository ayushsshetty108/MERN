import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import { FiPlusSquare } from "react-icons/fi";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <header className="site-header">
      <nav className="nav-content" aria-label="Main navigation">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span>Goods<span className="brand-accent">well</span></span>
        </Link>
        <div className="nav-actions">
          <Link className="nav-create" to="/create">
            <FiPlusSquare aria-hidden="true" />
            <span>Add product</span>
          </Link>
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {isDark ? <LuSun size={19} /> : <IoMoon size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar