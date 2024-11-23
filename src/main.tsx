import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "./router/AppRouter.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme={"dark"}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
);
