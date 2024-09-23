// src/app/Providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode } from 'react';

// 创建 React Query 客户端
const queryClient = new QueryClient();

// 创建 Material-UI 主题
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // 自定义主色
    },
    secondary: {
      main: '#dc004e', // 自定义次色
    },
  },
});

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
