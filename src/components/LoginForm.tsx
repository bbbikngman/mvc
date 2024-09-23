// src/components/LoginForm.tsx
'use client'; // 标记为客户端组件

import { Alert, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // 从 'next/navigation' 导入
import { LoginDto } from '../../../shared/user'; // 共享登录请求数据

const LoginForm = () => {
  const router = useRouter();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // 防止默认提交

    const input: LoginDto = { username, password };

    try {
      // 发送请求到 Next.js API 路由
      const { data } = await axios.post('/api/auth/login', input, {
        withCredentials: true, // 允许携带 Cookie
      });
      
      setMessage(data.message);
      console.log("登录成功推送到dashboard");
      
      // 重定向到仪表盘
      router.push('/dashboard');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          setMessage('Authentication failed. Please check your credentials.');
        } else {
          setMessage('Login failed. Please try again.');
        }
      } else {
        setMessage('An unexpected error occurred. Please try again.');
      }
    }
  }

  return (
    <div className="p-6 max-w-sm mx-auto bg-white shadow-md rounded-xl">
      <Typography variant="h2" component="h2" className="text-2xl font-bold">Login</Typography>
      {message && (
        <Alert severity={message === 'Login successful!' ? 'success' : 'error'}>
          {message}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          margin="normal"  
          fullWidth 
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)} // 将输入值绑定到状态
        />
        <TextField 
          id="password" 
          label="Password" 
          variant="outlined" 
          type="password" 
          margin="normal" 
          fullWidth 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 将输入值绑定到状态
        />
        <Button type="submit" variant="contained" color="primary">
          {message === '' ? 'Login' : 'Logging in...'}
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
