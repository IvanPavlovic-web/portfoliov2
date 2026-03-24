import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatedMenu } from "./AnimatedMenu";
import { Footer } from "./Footer";

export function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    // Prevent the browser from restoring previous scroll position on reload/navigation.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    // Start at the top (Hero) instead of a browser-restored scroll position (e.g. footer).
    // Keep anchor navigation working for links like "#projects".
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
