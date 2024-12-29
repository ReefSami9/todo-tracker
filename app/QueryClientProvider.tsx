'use client';
import React, { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {

      return (
            <div>
                  <ReactQueryClientProvider client={queryClient}>
                        {children}
                  </ReactQueryClientProvider>
            </div>
      )
}

export default QueryClientProvider
