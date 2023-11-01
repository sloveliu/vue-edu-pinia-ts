import { getAll, saveOrderUpdate, deleteCategory } from "@/api/resourceCategory";

import type { ResourceCategory } from "@/api/resourceCategory";
// 為什麼沒用一個物件包裝以下方法？為了不同元件操作時，是使用時同一個實例，而不是生成新的
export const allResourceCategory = ref<ResourceCategory[]>([]);

export const getAllResourceCategory = async () => {
  const { data } = await getAll();
  if (data.code === "000000") {
    allResourceCategory.value = data.data;
  } else {
    const errMsg = `獲取資源失敗 ${data.mesg}`;
    ElMessage.error(errMsg);
    throw new Error(errMsg);
  }
};

export const form = reactive({
  name: '',
  sort: 0,
});

export const dialogFormVisible = ref(false);
export const isCreate = ref(true);
export const msgText = ref('');

export const onSubmit = async () => {
  const { data } = await saveOrderUpdate(form).finally(() => dialogFormVisible.value = false);
  if (data.code === '000000') {
    ElMessage.success(`${msgText.value} 資源類別成功`);
    // 更新資源類別類表
    getAllResourceCategory();
    // 清空 form
  } else {
    const errMsg = `${msgText.value} 資源類型失敗 ${data.mesg}`;
    ElMessage.error(errMsg);
    throw new Error(errMsg);
  }
};

export const handleDelete = async (id: number) => {
  await ElMessageBox.confirm("確定是否刪除？", "刪除提醒", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    type: "warning",
  }).catch(() => {
    ElMessage.info("取消刪除");
    // 阻止拋出成功的 promise 繼續往下
    return new Promise(() => { });
  });
  const { data } = await deleteCategory(id);
  if (data.code === "000000") {
    ElMessage.success("刪除資源類型成功");
    getAllResourceCategory();
  } else {
    const errMsg = `刪除資源類型失敗 ${data.mesg}`;
    ElMessage.error(errMsg);
    throw new Error(errMsg);
  }
};