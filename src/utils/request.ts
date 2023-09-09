import axios from 'axios';
const request = axios.create({
  // baseURL: import.meta.env.VITE_API_URL, // 注解掉後，會直接打當前本地 http://localhost:4000/，但在 vite.config.ts 配置 proxy
});

export default request;