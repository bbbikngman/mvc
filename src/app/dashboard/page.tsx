import { Container, Typography, Box } from '@mui/material';
import Logout from '@/components/Logout';


// Define the data type from the API
interface DashboardData {
  message: string;
  stats: {
    users: number;
    posts: number;
    comments: number;
  };
}

export default async function DashboardPage() {
  let data: DashboardData | null = null;
  let error: string | null = null;
 

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard/data`, {
      // cache: 'no-store' if you don't want to cache the response
       credentials: 'include' 
    });
    console.log("dashboard服务端组件获取服务器状态为：" + res.status);
    
    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }

    data = await res.json();
    console.log("dashboard服务端组件获取服务器内容为：" + data);
  } catch (err) {
    console.error(err);
    error = 'An unexpected error occurred while fetching dashboard data.';
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data.message}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {`Users: ${data.stats.users}, Posts: ${data.stats.posts}, Comments: ${data.stats.comments}`}
        </Typography>
        <Logout />
      </Box>
    </Container>
  );
}
