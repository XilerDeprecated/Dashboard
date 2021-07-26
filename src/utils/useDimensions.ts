import { RefObject, useEffect, useState } from "react";

/**
 * Get the current window dimensions.
 *
 * @returns The width and height of the current browser window.
 */
const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

/**
 * A react hook which gets triggered when the x or y axis of the browser window changes.
 */
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

/**
 * A react hook which gets triggered when the x axis of the browser window changes.
 */
export const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

/** Property which is required on the container type. */
type container = { width: { baseVal: { value: number } } };

/**
 * A react hook which gets triggered when the width of the container changes.
 */
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
