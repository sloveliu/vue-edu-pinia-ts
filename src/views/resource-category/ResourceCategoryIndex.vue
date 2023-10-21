<script setup lang="ts">
import { allResourceCategory, getAllResourceCategory, handleDelete } from "@/composables/useResourceCategory";
import { timeFormatter } from "@/utils/timeHandlers";
import DlgResourceCategoryCreateOrEdit from "./DlgResourceCategoryCreateOrEdit.vue";
getAllResourceCategory();
const dlgCreateOrEdit = ref<InstanceType<typeof DlgResourceCategoryCreateOrEdit> | null>();

</script>
<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h3>資源類別列表</h3>
        <el-button class="button" type="primary" @click="dlgCreateOrEdit?.initAndShow()">建立類別</el-button>
      </div>
    </template>
    <el-table :data="allResourceCategory" border style="width: 100%">
      <el-table-column type="index" label="序號" align="center" />
      <el-table-column prop="name" label="類別名稱" align="center" />
      <!-- npm i dayjs formatter 看一下官方教學，會帶 4 個參數進 func 裡-->
      <el-table-column prop="createdTime" :formatter="timeFormatter" label="建立時間" align="center" />
      <el-table-column prop="sort" label="排序" align="center" />
      <!-- 直接解構 slot 取 row -->
      <el-table-column label="操作" align="center" v-slot="{ row }">
        <!-- 不直接塞 row 進去是怕實際數據會有變化 -->
        <el-button type="primary" @click="dlgCreateOrEdit?.initAndShow(row.id)">編輯</el-button>
        <el-button type="danger" @click="handleDelete(row.id)">刪除</el-button>
      </el-table-column>
    </el-table>
    <DlgResourceCategoryCreateOrEdit ref="dlgCreateOrEdit" />
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