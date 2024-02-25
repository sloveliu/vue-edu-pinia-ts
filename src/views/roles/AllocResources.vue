<script setup lang="ts">
import AllocCategory from './AllocCategory.vue';
import { getRoleResources, allocateRoleResources } from '@/api/roles';
import type { RoleCategoryItem } from "@/api/roles";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  roleId: {
    type: String,
    required: true,
  }
});
const roleResources = ref<RoleCategoryItem[]>();
const loadResources = async () => {
  const { data } = await getRoleResources(props.roleId);
  if (data.code === "000000") {
    roleResources.value = data.data.sort((c1, c2) => c1.id - c2.id);
  } else {
    const errMsg = `取得角色資源權限清單失敗 ${data.mesg}`;
    ElMessage.error(errMsg);
    throw new Error(errMsg);
  }
};
loadResources();
const onSave = async () => {
  // 取得所有被選中的資源
  const allCheckedIds = collectCheckedIds.reduce((acc: number[], curr) => {
    // 展開再合併
    return [...acc, ...curr.value];
  }, []);
  // 調用 api 傳回 server
  const { data } = await allocateRoleResources(props.roleId, allCheckedIds);
  if (data.code === "000000") {
    ElMessage.success("更新角色資源權限成功");
    router.push({ name: "roles" });
  } else {
    const errMsg = `更新角色資源權限失敗 ${data.mesg}`;
    ElMessage.error(errMsg);
    throw new Error(errMsg);
  }
};

const onClear = () => {
  collectCheckedIds.forEach(item => {
    item.value = [];

  });
};
// 儲存所有子組件的被選擇項目
const collectCheckedIds = [] as Ref<number[]>[];
// 處理子組件的事件訊息
const handleAddCheckedIds = (payload: Ref<number[]>) => {
  collectCheckedIds.push(payload);
};
</script>

<template>
  <AllocCategory v-for="category in roleResources" :key="category.id" :category="category"
    @postCheckedIdsRef="handleAddCheckedIds" />
  <div class="resources-btn">
    <el-button type="primary" @click="onSave">保存</el-button>
    <el-button @click="onClear">清空</el-button>
  </div>
</template>

<style lang="scss" scoped></style>