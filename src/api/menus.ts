import request from "@/utils/request";

type CommonReturn<T> = {
  code: string;
  data: T;
  mesg: string;
  time: string;
};

export type MenuItem = {
  createdBy: string;
  createdTime: string;
  description: string;
  href: string;
  icon: string;
  id: number;
  level: number;
  name: string;
  operatorId: number | null;
  orderNum: number;
  parentId: number;
  shown: boolean;
  updatedBy: string;
  updatedTime: string;
};

export const getAll = () => {
  return request<CommonReturn<MenuItem[]>>({
    method: "GET",
    url: "/boss/menu/getAll"
  });
};
