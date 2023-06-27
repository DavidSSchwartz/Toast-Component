import React from "react";
import { useEscapeKey } from "../../hooks/use-escape-key";

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
  const handleEscape = React.useCallback(() => setToasts([]), []);
  
  useEscapeKey(handleEscape);

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
