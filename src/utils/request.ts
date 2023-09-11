import { useTokenStore } from './../stores/token';
import axios from 'axios';
const request = axios.create({
  // baseURL: import.meta.env.VITE_API_URL, // 注解掉後，會直接打當前本地 http://localhost:4000/，但在 vite.config.ts 配置 proxy
});

// 請求攔截器
request.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers = {} as AxiosRequestHeaders;
  }
  const store = useTokenStore();
  config.headers.Authorization = store.token?.access_token;

  return config;
});

export default request;