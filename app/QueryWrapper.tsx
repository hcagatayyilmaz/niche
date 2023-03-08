"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface Props {
  children?: ReactNode;
}

const queryClient = new QueryClient();
const QueryWrapper = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};

export default QueryWrapper;
