<script setup lang="ts">
import { deleteResource } from "@/api/resources";
import DlgResourceCreateOrEdit from "@/views/resources/DlgResourceCreateOrEdit.vue";
import { queryCondition, queriedResult, queryResources } from "@/composables/useResources";
import { allResourceCategory, getAllResourceCategory } from "@/composables/useResourceCategory";
import { timeFormatter } from '@/utils/timeHandlers';
import { FormInstance } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
queryResources();
getAllResourceCategory();
const queryForm = ref<FormInstance>();
const dlgCreateOrEdit = ref<InstanceType<typeof DlgResourceCreateOrEdit> | null>(null);
const handleDelete = async (id: number) => {
  await ElMessageBox.confirm("確定刪除？", "刪除提醒", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    type: "warning",
  }).catch(() => {
    ElMessage.info("刪除動作取消");
    return new Promise(() => { });
  });
  const { data } = await deleteResource(id);
  if (data.code = "000000") {
    ElMessage.success("刪除資源成功");
    queryResources();
  } else {
    const errMsg = "刪除資源失敗" + data.mesg;
    ElMessage.error(errMsg);
    throw new Error(errMsg);
  }
};
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <el-form :inline="true" :model="queryCondition" class="demo-form-inline" ref="queryForm">
        <el-form-item label="資源名稱" prop="name">
          <el-input v-model="queryCondition.name" placeholder="資源名稱" clearable />
        </el-form-item>
        <el-form-item label="資源路徑" prop="url">
          <el-input v-model="queryCondition.url" placeholder="資源路徑" clearable />
        </el-form-item>
        <el-form-item label="資源分類" prop="categoryId">
          <el-select v-model="queryCondition.categoryId" placeholder="資源分類" clearable>
            <el-option label="不限" value="" />
            <el-option v-for="category in allResourceCategory" :key="category.id" :label="category.name"
              :value="category.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="" @click="queryForm?.resetFields()">重置</el-button>
          <el-button type="primary" @click="queryResources()">查詢</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-button size="large" @click="dlgCreateOrEdit?.initAndShow()">新增資源</el-button>
    <el-button size="large" @click="router.push({ name: 'resource-category' })">資源類別</el-button>
    <el-table :data="queriedResult.records" border style="width: 100%">
      <el-table-column type="index" align="center" />
      <el-table-column prop="name" label="資源名稱" align="center" />
      <el-table-column prop="url" label="資源路徑" align="center" />
      <el-table-column prop="description" label="描述" align="center" />
      <el-table-column prop="createdTime" label="新增時間" align="center" :formatter="timeFormatter" />
      <el-table-column label="操作" align="center" v-slot="{ row }">
        <el-button type="primary" @click="dlgCreateOrEdit?.initAndShow(row.id)">編輯</el-button>
        <el-button type="danger" @click="handleDelete(row.id)">刪除</el-button>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="queriedResult.current" v-model:page-size="queriedResult.size"
      :page-sizes="[10, 20, 30, 50]" layout="total, sizes, prev, pager, next, jumper" :total="queriedResult.total"
      @size-change="(size) => { queryResources({ size, current: 1 }); }"
      @current-change="(current) => { queryResources({ current }); }" />
    <!-- current-change 頁面變化觸發 callback、size-change 每頁大小變化觸發 callback -->
    <DlgResourceCreateOrEdit ref="dlgCreateOrEdit" />
  </el-card>
</template>

<style lang="scss" scoped>
.el-table {
  margin-top: 16px;
}

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
</style>