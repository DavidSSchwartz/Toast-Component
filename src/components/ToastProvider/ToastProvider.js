import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const createToast = React.useCallback((message, variant) => {
    setToasts((current) => [
      ...current,
      { message, variant, id: crypto.randomUUID() },
    ]);
  }, []);

  const dismissToast = React.useCallback(
    (id) => {
      let nextToasts = toasts.filter((toast) => toast.id !== id);
      setToasts(nextToasts);
    },
    [toasts]
  );

  React.useEffect(() => {
    const dismissAllToasts = (event) => {
      if (event.code === "Escape") {
        setToasts([]);
      }
    };

    document.addEventListener("keydown", dismissAllToasts);
    return ()=> {
      document.removeEventListener("keydown", dismissAllToasts);
    }
  }, []);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        createToast,
        dismissToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
