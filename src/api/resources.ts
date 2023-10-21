import request from "@/utils/request";

type Common<T> = {
  code: string;
  data: T;
  mesg: string;
  time: string;
};

export type QueriedResult = {
  current: number;
  hitCount?: false;
  optimizeCountSql?: boolean;
  orders?: any[];
  pages?: number;
  records: Resource[] | [];
  searchCount?: boolean;
  size: number;
  total: number;
};

export type Resource = {
  categoryId: number;
  createdBy: string;
  createdTime: string;
  description: string;
  id: number;
  name: string;
  operatorId: number | null;
  selected: boolean;
  updatedBy: string;
  updatedTime: string;
  url: string;
};

// Partial 後，每個屬性都加上 ?，依 API 文件，非必要傳遞
export type Condition = Partial<{
  id: number;
  name: string;
  startCreateTime: string;
  url: string;
  categoryId: number | "";
  endCreateTime: string;
  current: number;
  size: number;
}>;

export const getResourcePages = (condition: Condition) => {
  return request<Common<QueriedResult>>({
    method: "POST",
    url: "/boss/resource/getResourcePages",
    data: condition
  });
};

// 另一種加上可選方式，直接在這裡加 Partial
export const saveOrUpdate = (resource: Partial<Resource>) => {
  return request<Common<boolean>>({
    method: "POST",
    url: "/boss/resource/saveOrUpdate",
    data: resource
  });
};

export const deleteResource = (id: number) => {
  return request<Common<boolean>>({
    method: "DELETE",
    url: `/boss/resource/${id}`,
  });
};

export const getResourceById = (id: number) => {
  return request<Common<Resource>>({
    method: "GET",
    url: `/boss/resource/${id}`,
  });
};