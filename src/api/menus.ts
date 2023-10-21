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

// Partial 後，每個屬性都加上 ?
// type CreateOrEditMenu = Partial<MenuItem>;
// Pick 則挑選需要的，可再進行調整或追加
export type CreateOrEditMenu = Pick<MenuItem, "parentId" | "name" | "href" | "icon" | "orderNum" | "description" | "shown"> & { id?: number; };
// Omit 刪去不要的
// export type CreateOrEditMenu = Omit<MenuItem, "createdBy" | "createdTime" | "level" | "operatorId" | "updatedBy" | "updatedTime"> & { id?: number; };

// 新增選單帶 id，修改選單不帶 id
export const saveOrUpdate = (menuInfo: CreateOrEditMenu) => {
  return request<CommonReturn<boolean>>({
    method: "POST",
    url: "/boss/menu/saveOrUpdate",
    data: menuInfo
  });
};

export const deleteMenu = (id: string) => {
  return request<CommonReturn<boolean>>({
    method: "DELETE",
    url: `/boss/menu/${id}`
  });
};

// SubMenuList 有多層嵌套，但也可能是 null
type SubMenuList = MenuItem & {
  subMenuList: SubMenuList[] | null;
};

type EditMenuInfo = CommonReturn<{
  menuInfo: MenuItem;
  parentMenuList: MenuItem[];
}>;

export const getEditMenuInfo = (id: string) => {
  return request<EditMenuInfo>({
    method: "GET",
    url: `/boss/menu/getEditMenuInfo`,
    params: {
      id
    }
  });
};