import { NavLink, useNavigate } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import RootSidebar from "./RootSidebar";
import { useEffect, useState } from "react";
import ExButton from "../../lib/components/Button/ExButton";
import ExBadge from "../../lib/components/Badge/ExBadge";
import useExTheme from "../../lib/utils/useExTheme";

export default function RootHeader() {
  const { theme, setTheme } = useExTheme();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 flex w-full items-center justify-between px-5 pt-5 pb-5 lg:px-10 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/50 bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center gap-10">
          <div
            className="flex cursor-pointer items-center gap-1"
            onClick={() => navigate("/")}
          >
            <img className="w-7 dark:hidden" src="/orca-logo.svg" alt="logo" />
            <img
              className="hidden w-7 dark:block"
              src="/orca-logo-white.svg"
              alt="logo"
            />

            <h1 className="text-lg font-semibold tracking-widest">Orca</h1>
          </div>

          <div className="hidden items-center gap-5 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm transition-opacity hover:opacity-100 ${
                  isActive ? "font-medium" : "font-light opacity-70"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/docs"
              className={({ isActive }) =>
                `text-sm transition-opacity hover:opacity-100 ${
                  isActive ? "font-medium" : "font-light opacity-70"
                }`
              }
            >
              Documentation
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm transition-opacity hover:opacity-100 ${
                  isActive ? "font-medium" : "font-light opacity-70"
                }`
              }
            >
              About
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ExBadge variant="soft" color="secondary">
              v1.0.0
            </ExBadge>
          </div>
          <ExButton
            iconOnly
            variant="text"
            color="secondary"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
          </ExButton>

          <ExButton
            className="md:hidden"
            iconOnly
            size="sm"
            variant="text"
            color="secondary"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={13} />
          </ExButton>
        </div>
      </header>

      <RootSidebar isOpen={isOpen} onClosed={setIsOpen} />
    </>
  );
}
