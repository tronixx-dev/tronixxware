import { createContext, useContext, useState } from "react";

const FlyingImageContext = createContext();

export const FlyingImageProvider = ({ children }) => {
  const [flyingImages, setFlyingImages] = useState([]);

  const addFlyingImage = (imgRef, cartIconRef) => {
    if (!imgRef.current || !cartIconRef.current) return;

    const startRect = imgRef.current.getBoundingClientRect();
    const endRect = cartIconRef.current.getBoundingClientRect();

    const newFly = {
      id: Date.now(),
      src: imgRef.current.src,
      start: { x: startRect.left, y: startRect.top },
      end: { x: endRect.left, y: endRect.top },
    };

    setFlyingImages((prev) => [...prev, newFly]);
  };

  const removeFlyingImage = (id) => {
    setFlyingImages((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <FlyingImageContext.Provider
      value={{ flyingImages, addFlyingImage, removeFlyingImage }}
    >
      {children}
    </FlyingImageContext.Provider>
  );
};

export const useFlyingImage = () => useContext(FlyingImageContext);
