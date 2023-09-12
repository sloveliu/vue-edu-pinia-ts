<script setup lang="ts">
import { getAll } from "@/api/menus";
import type { MenuItem } from "@/api/menus";

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
getAllMenus();
</script>

<template>
  <h1>選單列表</h1>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button type="primary">新增選單</el-button>
      </div>
    </template>
    <el-table :data="allMenus" border style="width: 100%">
      <!-- type="index" 自動編號-->
      <el-table-column type="index" label="序" align="center" width="80px" />
      <el-table-column prop="name" label="名稱" align="center" />
      <el-table-column prop="level" label="層級" align="center" />
      <el-table-column prop="icon" label="圖示" align="center" />
      <el-table-column prop="orderNum" label="排序" align="center" />
      <el-table-column label="操作" align="center">
        <el-button type="primary">編輯</el-button>
        <el-button type="danger">刪除</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
}
</style>