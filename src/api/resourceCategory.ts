import request from "@/utils/request";

type Common<T> = {
  code: string;
  data: T;
  mesg: string;
  time: string;
};

export type ResourceCategory = {
  id: number;
  createdBy: string;
  createdTime: string;
  name: string;
  operatorId: number | null;
  selected: boolean;
  sort: number;
  updatedBy: string;
  updatedTime: string;
};

export const getAll = () => {
  return request<Common<ResourceCategory[]>>({
    method: "GET",
    url: "/boss/resource/category/getAll"
  });
};

export type ResourceCategoryParams = Pick<ResourceCategory, "name" | "sort"> & { id?: number; };

export const saveOrderUpdate = (resourceCategoryInfo: ResourceCategoryParams) => {
  return request<Common<boolean>>({
    method: "POST",
    url: '/boss/resource/category/saveOrderUpdate',
    data: resourceCategoryInfo
  });
};

export const deleteCategory = (id: number) => {
  return request<Common<boolean>>({
    method: "DELETE",
    url: `/boss/resource/category/${id}`,
  });
};