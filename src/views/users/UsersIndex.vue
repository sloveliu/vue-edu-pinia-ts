<script setup lang="ts">
import { enableUser, forbidUser } from "@/api/users";
import { queryCondition, queryUsers, queriedResult } from '@/composables/useUsers';
import { timeFormatter } from '@/utils/timeHandlers';
queryUsers();
// 預設用戶頭像
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
// 切換用戶狀態
const handlerChange = async (act: "ENABLE" | "DISABLE", userId: number) => {
  // 用可擴展方式寫
  let actions = {
    ENABLE: { msg: "啟用", fn: enableUser },
    DISABLE: { msg: "停用", fn: forbidUser },
  };
  const { data } = await actions[act].fn(userId);
  if (data.code === "000000") {
    ElMessage.success(`${actions[act].msg}用戶成功`);
  } else {
    ElMessage.error(`用戶${actions[act].msg}失敗`);
    throw new Error(`用戶${actions[act].msg}失敗`);
  }
};
</script>

<template>
  <el-card class="box-card">
    <template>
      <div class="card-header">
        <span>Card name</span>
        <el-button class="button" text>Operation</el-button>
      </div>
    </template>
    <el-table :data="queriedResult.records" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" align="center" />
      <!-- 直接解構 row 出來 -->
      <el-table-column label="頭像" width="180" align="center" v-slot="{ row }">
        <!-- 頭像不存在，顯示預設 -->
        <el-avatar :size="50" :src="row.portrait || circleUrl" />
      </el-table-column>
      <el-table-column prop="name" label="用戶名稱" width="180" align="center" />
      <el-table-column prop="phone" label="手機號碼" align="center" />
      <el-table-column prop="createTime" label="註冊時間" align="center" :formatter="timeFormatter" />
      <el-table-column prop="status" label="狀態" align="center" v-slot="{ row }">
        <el-switch class="mb-2" v-model="row.status" active-value="ENABLE" inactive-value="DISABLE" active-text="啟用"
          inactive-text="停用" @change="handlerChange($event as 'ENABLE' | 'DISABLE', row.id)" />
      </el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="default">分配角色</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped>
.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
}
</style>