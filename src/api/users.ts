import { queryCondition } from './../composables/useResources';
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
};

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

// 共用類型
type Common<T> = {
  code: string;
  data: T;
  mesg: string;
  time: string;
};

// 每個用戶的類型
type UserItem = {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  createTime: string;
  credentialsNonExpired: boolean;
  id: number;
  isDel: boolean;
  name: string;
  password: string;
  phone: string;
  portrait: string | null;
  regIp: string | null;
  status: "ENABLE" | "DISABLE";
  updateTime: string;
};

// 用戶查詢結果類型
// export type QueryResult = Common<{
export type QueryResult = {
  current: number;
  hitCount: boolean;
  optimizeCountSql: boolean;
  orders: any[];
  pages: number;
  records: UserItem[];
  searchCount: boolean;
  size: number;
  total: number;
};

// Partial 每一個查詢條件都是可選項
export type QueryCondition = Partial<{
  currentPage: number;
  pageSize: number;
  phone: string;
  userId: number;
  startCreateTime: string;
  endCreateTime: string;
}>;

// 取得用戶列表
export const getUserPages = (queryCondition: QueryCondition = {}) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data: queryCondition,
  });
};

// 啟用用戶
export const enableUser = (userId: number) => {
  return request<Common<boolean>>({
    method: 'GET',
    url: '/boss/user/enableUser',
    params: {
      userId,
    },
  });
};

// 停用用戶
export const forbidUser = (userId: number) => {
  return request<Common<boolean>>({
    method: 'POST',
    url: '/boss/user/forbidUser',
    data: {
      userId,
    },
  });
};