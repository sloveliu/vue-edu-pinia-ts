<script setup lang="ts">
import { timeFormatter } from "@/utils/timeHandlers";
import { queryRoles, queryCondition, queriedResult } from "@/composables/useRoles";
import DlgRoleCreateOrEdit from "@/views/roles/DlgRoleCreateOrEdit.vue";
import { deleteRole } from '@/api/roles';
queryRoles();
const dlgCreateOrEdit = ref<InstanceType<typeof DlgRoleCreateOrEdit> | null>(null);
const handleDelete = async (id: number) => {
  await ElMessageBox.confirm("確認是否刪除？", "刪除提示", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    type: 'warning'
  }).catch(() => {
    ElMessage.success("取消刪除");
    // 避免往下繼續執行，給一個 pending 狀態
    return new Promise(() => { });
  });
  const { data } = await deleteRole(id);
  if (data.code = "000000") {
    ElMessage.success("刪除角色成功");
    queryRoles({ current: 1 });
  } else {
    const errMsg = "刪除角色失敗" + data.mesg;
    ElMessage.error(errMsg);
    throw new Error(errMsg);
  }
};
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <el-button @click="dlgCreateOrEdit?.initAndShow()">新增角色</el-button>
      <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
        <el-form-item label="輸入搜尋">
          <el-input v-model="queryCondition.name" placeholder="角色名稱" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="" @click="queryRoles({ name: '' })">重置</el-button>
          <!-- click 預設會傳 event，所以用 queryRoles 會被傳進去，所以要用()-->
          <el-button type="primary" @click="queryRoles({ current: 1 })">查詢</el-button>
        </el-form-item>
      </el-form>
    </template>

    <el-table :data="queriedResult?.records" border style="width: 100%">
      <el-table-column type="index" label="序號" align="center" />
      <el-table-column prop="name" label="角色名稱" align="center" />
      <el-table-column prop="description" label="描述" align="center" />
      <el-table-column prop="createdTime" :formatter="timeFormatter" label="建立時間" align="center" />
      <el-table-column label="操作" align="center" width="150" v-slot="{ row }">
        <el-button type="primary" link
          @click="$router.push({ name: 'alloc-menus', params: { roleId: row.id } })">分配選單</el-button>
        <el-button type="primary" link
          @click="$router.push({ name: 'alloc-resources', params: { roleId: row.id } })">分配資源</el-button>
        <el-button type="primary" link @click="dlgCreateOrEdit?.initAndShow(row.id)">編輯</el-button>
        <el-button type="primary" link @click="handleDelete(row.id)">刪除</el-button>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="queryCondition.current" v-model:page-size="queryCondition.size"
      :page-sizes="[5, 10, 20, 30]" layout="total, sizes, prev, pager, next, jumper" :total="queriedResult.total"
      @size-change="size => queryRoles({ size, current: 1 })" @current-change="current => queryRoles({ current })" />
    <DlgRoleCreateOrEdit ref="dlgCreateOrEdit" @role-change="queryRoles({ current: 1 })" />
  </el-card>
</template>

<style lang="scss" scoped>
.el-form {
  float: right;
}

.el-table {
  margin-bottom: 18px;
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