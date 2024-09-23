import LoginForm from '@/components/LoginForm';


export default function Home() {
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginForm /> {/* 显示登录表单 */}
    </div>
  );
}
