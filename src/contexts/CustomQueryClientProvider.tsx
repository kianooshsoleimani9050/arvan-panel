import { useMemo, memo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface CustomQueryClientProviderType {
  children: JSX.Element[] | JSX.Element;
}

const CustomQueryClientProvider = ({
  children,
}: CustomQueryClientProviderType) => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 30000,
            retry: 0,
            onError: (error) => {
              console.log(error);
            },
          },
          mutations: {
            onError: (error) => {
              console.log(error);
            },
          },
        },
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
export default memo(CustomQueryClientProvider);
