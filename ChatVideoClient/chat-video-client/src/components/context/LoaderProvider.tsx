import { createContext, useCallback, useState } from "react";

interface LoaderContextProps {
  children: React.ReactNode;
}

interface LoaderContextType {
  setLoader: (value: boolean) => void;
}

export const LoadingContext = createContext<LoaderContextType | undefined>(undefined);

function LoaderProvider({ children }: LoaderContextProps) {
  const [isLoading, setIsLoading] = useState(false);

  const setLoader = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);

  return (
    <>
      <LoadingContext.Provider value={{ setLoader }}>
        {children}
        {isLoading && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              pointerEvents: "all", // block clicks
            }}
          >
            <div
              style={{
                padding: "20px 30px",
                background: "white",
                borderRadius: "10px",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Loading...
            </div>
          </div>
        )}
      </LoadingContext.Provider>
    </>
  );
}

export default LoaderProvider;
