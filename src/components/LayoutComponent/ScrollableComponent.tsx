"use client";
import { useEffect, ReactNode } from "react";
import useScroll from "@/hooks/useScroll";
import "@/styles/globals.css";

const ScrollableComponent = ({ children, selector }: { children: ReactNode, selector: string }) => {
  const isScrolling = useScroll(selector);

  useEffect(() => {
    const element = document.querySelector(selector);
    if (element) {
      if (isScrolling) {
        element.classList.add("scrolled");
      } else {
        element.classList.remove("scrolled");
      }
    }
  }, [isScrolling, selector]);

  return <div className={selector.replace('.', '')}>{children}</div>;
};

export default ScrollableComponent;
