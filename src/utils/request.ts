import { useTokenStore } from '@/stores/token';
import { refreshToken } from '@/api/users';
import router from '@/router/index';
import axios from 'axios';
const request = axios.create({
  // baseURL: import.meta.env.VITE_API_URL, // 注解掉後，會直接打當前本地 http://localhost:4000/，但在 vite.config.ts 配置 proxy
});

// 請求攔截器，config 為請求設定
request.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers = {} as AxiosRequestHeaders;
  }
  const store = useTokenStore();
  config.headers.Authorization = store.token.access_token;
  return config;
});

// 響應攔截器，當碰到 401 則更新 token
request.interceptors.response.use(res => res, async (err) => {
  if (err.response.status === 401) {
    const { data } = await refreshToken();
    if (data.success) {
      // 更新 token 並重發 request
      useTokenStore().saveToken(data.content);
      return request(err.config);
    } else {
      ElMessage.error("請重新登入");
      router.push({ name: "login" });
      return;
    }
  }
  return Promise.reject(err);
});

export default request;