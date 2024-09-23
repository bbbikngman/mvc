// src/components/DashboardClient.tsx (客户端组件)
'use client';  // 标记为客户端组件

import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import axios from 'axios';

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 处理登出逻辑，清除 cookie，重定向到首页
      await axios.post('/api/auth/logout', {}, { withCredentials: true});
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button variant='contained' color='secondary' onClick={handleLogout}>
      Logout
    </Button>
  );
}
