// 用戶相關的 api 都寫在這
import request from "@/utils/request";
import { useTokenStore } from "@/stores/token";

// 請求類型
type LoginInfo = {
  phone: string;
  code?: string;
  password: string;
};

// 定義泛型 T 型參，傳入實際參數
type CommonReturn<T = string> = {
  success: boolean;
  message: string;
  state: number;
  content: T;
};

// 返回類型，傳入實參 string
// type LoginResult = CommonReturn;

export const login = (loginInfo: LoginInfo) => {
  return request<CommonReturn>({
    method: "POST",
    url: "/front/user/login",
    // 因為請求類型是 application/x-www-form-urlencoded，所以 data 必須用拼接，若是 application/json 則 data: loginInfo 即可
    data: `phone=${loginInfo.phone}&password=${loginInfo.password}`
  });
};;

type UserInfo = CommonReturn<{
  isUpdatePassword: boolean;
  portrait: string;
  userName: string;
}>;

export const getInfo = () => {
  return request<UserInfo>({
    method: "GET",
    url: "/front/user/getInfo"
  });
};

export const logout = () => {
  return request({
    method: 'POST',
    url: '/front/user/logout'
  });
};

// type RefreshToken = CommonReturn;

// 避免同時更新 token
let promiseRT: Promise<any>;
let isRefreshing = false;
export const refreshToken = () => {
  if (isRefreshing) {
    return promiseRT;
  }
  isRefreshing = true;
  promiseRT = request<CommonReturn>({
    method: 'POST',
    url: '/front/user/refresh_token',
    params: {
      refreshtoken: useTokenStore().token?.refresh_token,
    }
  }).finally(() => {
    isRefreshing = false;
  });
  return promiseRT;
};