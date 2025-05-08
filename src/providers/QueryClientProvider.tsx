import React from 'react';
import { QueryClient, QueryClientProvider as QCProvider } from '@tanstack/react-query';

const qc = new QueryClient();

const QueryClientProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <QCProvider client={qc}>{children}</QCProvider>;
};

export { QueryClientProvider };
