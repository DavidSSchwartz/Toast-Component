import React from "react";

export const useEscapeKey= (callback) => {
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
       callback(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);
};
