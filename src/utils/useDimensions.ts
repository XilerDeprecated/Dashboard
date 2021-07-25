import { RefObject, useEffect, useState } from "react";

// TODO: Document this
// TODO: Make arrow func
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

// TODO: Document this
export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

// TODO: Document this
export const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

// TODO: Document this
type container = { width: { baseVal: { value: number } } };

// TODO: Document this
export const useContainerDimensions = <T extends container>(
  myRef: RefObject<T>
) => {
  const [dimension, setDimension] = useState(0);

  useEffect(() => {
    const getDimensions = () => myRef.current?.width.baseVal.value ?? 0;
    const handleResize = () => setDimension(getDimensions());

    if (myRef.current) setDimension(getDimensions());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [myRef]);

  return dimension;
};
