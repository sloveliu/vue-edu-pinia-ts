// 用戶相關的 api 都寫在這
import request from "@/utils/request";

// 請求類型
type LoginInfo = {
  phone: string;
  code?: string;
  password: string;
};
// 返回類型
type LoginResult = {
  success: boolean;
  state: number;
  message: string;
  content: string;
};

export const login = (loginInfo: LoginInfo) => {
  return request<LoginResult>({
    url: "/front/user/login",
    method: "POST",
    // 因為請求類型是 application/x-www-form-urlencoded，所以 data 必須用拼接，若是 application/json 則 data: loginInfo 即可
    data: `phone=${loginInfo.phone}&password=${loginInfo.password}`
  });
};;