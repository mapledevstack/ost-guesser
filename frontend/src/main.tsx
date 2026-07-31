import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { ThemeProvider } from "@/providers/theme-provider.tsx"
import { RouterProvider } from "@tanstack/react-router"
import router from "./config/tanstack-router.ts"
import { IS_DEV } from "./constants/env.ts"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "./config/query-client.ts"
import { TooltipProvider } from "./components/ui/tooltip.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
        {IS_DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
)
