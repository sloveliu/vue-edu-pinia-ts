import { getUserPages } from "@/api/users";
import type { QueryCondition, QueryResult } from "@/api/users";

export const queryCondition = ref({} as QueryCondition);
export const queriedResult = ref({} as QueryResult);
export const queryUsers = async (params: QueryCondition = {}) => {
  Object.assign(queryCondition.value, params);
  const { data } = await getUserPages(queryCondition.value);
  if (data.code === "000000") {
    queriedResult.value = data.data;
  } else {
    ElMessage.error(`查詢用戶清單失敗: ${data.mesg}`);
    throw new Error(`查詢用戶清單失敗: ${data.mesg}`);
  }
};