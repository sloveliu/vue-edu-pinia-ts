import request from "@/utils/request";

export type Condition = Partial<{
  code: string;
  id: number;
  name: string;
  startCreateTime: string;
  endCreateTime: string;
  current: number;
  size: number;
}>;

type Common<T> = {
  code: string;
  data: T;
  mesg: string;
  time: string;
};

// 一開始都還沒建立時，回傳會是空的，所以用 Partial
export type QueryResult = Partial<{
  current: number;
  hitCount: boolean;
  optimizeCountSql: boolean;
  orders: any[];
  pages: number;
  records: Role[] | [];
  searchCount: boolean;
  size: number;
  total: number;
}>;

export type Role = {
  code: string;
  createdBy?: string;
  createdTime?: string;
  description: string;
  id?: number;
  name: string;
  operatorId?: number | null;
  updatedBy?: string;
  updatedTime?: string;
};

export const getRolePages = (condition: Condition) => {
  return request<Common<QueryResult>>({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data: condition
  });
};

type RoleParams = Pick<Role, 'code' | 'description' | 'name' | 'id'>;
export const saveOrUpdate = (role: RoleParams) => {
  return request<Common<boolean>>({
    method: "POST",
    url: "/boss/role/saveOrUpdate",
    data: role
  });
};

export const deleteRole = (id: number) => {
  return request<Common<boolean>>({
    method: "DELETE",
    url: `/boss/role/${id}`
  });
};

export const getRoleById = (id: number) => {
  return request<Common<Role>>({
    method: "GET",
    url: `/boss/role/${id}`
  });
};

export type RoleMenuItem = {
  createdBy: string,
  createdTime: string,
  description: string,
  href: string,
  icon: string,
  id: number,
  level: number,
  name: string,
  operatorId: number | null,
  orderNum: number,
  parentId: number,
  selected: boolean,
  shown: boolean,
  subMenuList: RoleMenuItem[] | null,
  updatedBy: string,
  updatedTime: string,
};


// 取得角色的選單資訊
export const getRoleMenus = (roleId: string) => {
  return request<Common<RoleMenuItem[]>>({
    method: "GET",
    url: "/boss/menu/getRoleMenus",
    // 等同/?roleId=id
    params: {
      roleId
    }
  });
};