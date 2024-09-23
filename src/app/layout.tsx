// src/app/layout.tsx

import "./globals.css";
import { Providers } from './Providers'; // 导入 Providers 组件
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children} {/* 确保渲染子组件 */}
        </Providers>
      </body>
    </html>
  );
}
