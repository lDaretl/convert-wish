import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient()

export const AppQueryProvider = ({children}) => {
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}