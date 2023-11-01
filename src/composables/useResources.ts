import { getResourcePages } from '@/api/resources';
import type { Condition, QueriedResult } from "@/api/resources";

// 查詢條件
export const queryCondition = reactive<Condition>({
  name: "",
  url: "",
  categoryId: "", // 一般用 -1 or 0，但這個 api 不接受，所以先用空字串
  current: 1,
  size: 5
});

// 查詢結果
export const queriedResult = ref<QueriedResult>({
  current: 1,
  records: [],
  size: 0,
  total: 0,
});

// 查詢方法
export const queryResources = async (params: Condition = {}) => {
  // params 用來調用該函數時，傳遞補充條件，與基本條件做合併
  Object.assign(queryCondition, params);
  const { data } = await getResourcePages(queryCondition).catch((err) => {
    ElMessage.error("取得資源失敗");
    throw new Error(err);
  });
  if (data.code === "000000") {
    queriedResult.value = data.data;
  } else {
    const errMsg = `取得資源失敗 ${data.mesg}`;
    ElMessage.error(errMsg);
    throw new Error(errMsg);
  }
};