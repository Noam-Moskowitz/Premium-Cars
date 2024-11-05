import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./store/store";
import { Provider } from "react-redux";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  //<StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster richColors />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
  // </StrictMode>
);
