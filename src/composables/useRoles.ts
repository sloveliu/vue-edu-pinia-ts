import { getRolePages } from "@/api/roles";
import type { Condition, QueryResult, Role } from "@/api/roles";

export const queryCondition = reactive<Condition>({
  name: "",
  size: 5
});

export const queriedResult = ref<QueryResult>({
  current: 1,
  records: [],
  pages: 0,
  size: 0,
  total: 0,
});

export const queryRoles = async (params: Condition = {}) => {
  Object.assign(queryCondition, params);
  const { data } = await getRolePages(queryCondition);
  if (data.code === "000000") {
    queriedResult.value = data.data;
  } else {
    const errMsg = `查詢角色資訊失敗 ${data.mesg}`;
    ElMessage.error(errMsg);
    throw new Error(errMsg);
  }
};