<script setup lang="ts">
import { useRouter } from "vue-router";
import { useMenus } from "@/composables/useMenus";
const router = useRouter();
const { allMenus, getAllMenus, handleDelete } = useMenus();

getAllMenus();
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button type="primary" @click="router.push({ name: 'menu-create' })">新增選單</el-button>
      </div>
    </template>
    <el-table :data="allMenus" border style="width: 100%">
      <!-- type="index" 自動編號-->
      <el-table-column type="index" label="序" align="center" width="80px" />
      <el-table-column prop="name" label="名稱" align="center" />
      <el-table-column prop="level" label="層級" align="center" />
      <el-table-column prop="icon" label="圖示" align="center" />
      <el-table-column prop="orderNum" label="排序" align="center" />
      <!-- 用 slot scope 取得每次 allMenus 遍歷的資料 -->
      <el-table-column label="操作" align="center" v-slot="scope">
        <el-button type="primary">編輯</el-button>
        <el-button type="danger" @click="handleDelete(scope.row.id)">刪除</el-button>
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