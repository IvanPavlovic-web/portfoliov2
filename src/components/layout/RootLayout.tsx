import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatedMenu } from "./AnimatedMenu";
import { Footer } from "./Footer";

export function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search, location.hash]);

  return (
    <>
      <AnimatedMenu />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
