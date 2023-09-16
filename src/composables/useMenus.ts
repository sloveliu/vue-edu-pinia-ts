import { getAll, saveOrUpdate, deleteMenu } from "@/api/menus";
import type { MenuItem, CreateOrEditMenu } from "@/api/menus";
import router from "@/router/index";
export const useMenus = () => {
  // 不直接 export allMenus getAllMenus 避免多個地方操作同一份會互相影響
  // 儲存回傳的資料，預設 MenuItem 類型空陣列
  const allMenus = ref([] as MenuItem);
  const getAllMenus = async () => {
    const { data } = await getAll();
    if (data.code === "000000") {
      allMenus.value = data.data;
    } else {
      ElMessage.error("取得選單資料失敗");
      throw new Error("取得選單資料失敗");
    }
  };
  const topMenus = computed(() => allMenus.value.filter(menu => menu.level === 0));

  // 表單數據
  const form = ref<CreateOrEditMenu>({
    name: "",
    href: "",
    parentId: -1,
    description: "",
    icon: "",
    shown: true,
    orderNum: 0
  });
  // 提交事件
  const onSubmit = async () => {
    const { data } = await saveOrUpdate(form.value);
    if (data.code === "000000") {
      ElMessage.success("建立成功");
      router.push({ name: "menus" });
    } else {
      ElMessage.error("建立失敗");
      throw new Error("建立失敗");
    }
  };
  // 刪除選單
  const handleDelete = async (id: string) => {
    await ElMessageBox.confirm("確認刪除？", "刪除提醒", {
      confirmButtonText: "確定",
      cancelButtonText: "取消"
    }).catch(() => {
      ElMessage.info("取消刪除");
      return new Promise(() => { }); // 給 pending 狀態
    });
    const { data } = await deleteMenu(id);
    if (data.code === "000000" && data.data === true) {
      ElMessage.success("刪除成功");
      getAllMenus();
    } else {
      ElMessage.error("刪除失敗");
      throw new Error("刪除失敗");
    }
  };
  return { allMenus, getAllMenus, topMenus, form, onSubmit, handleDelete };
};