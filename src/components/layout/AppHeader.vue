<script setup lang="ts">
// 引入共用變數 isCollapse
import { isCollapse } from './isCollapse';
import { getInfo } from "@/api/users.ts";

const userInfo = ref({
  portrait: "",
  userName: ""
});

getInfo().then(res => {
  userInfo.value = res.data.content;
  console.log(userInfo.value);
});
</script>

<template>
  <el-header>
    <el-icon @click="isCollapse = !isCollapse">
      <!-- 對照 element plus 時，記得加前綴 IEp -->
      <IEpExpand v-show="isCollapse" />
      <IEpFold v-show="!isCollapse" />
      <!-- 用 v-if else 會銷毀 -->
    </el-icon>
    <!-- 麵包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 下拉選單 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="32" :src="userInfo.portrait" />
        <el-icon class="el-icon--right">
          <i-ep-arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
          <el-dropdown-item divided>登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>


<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  background-color: #dedfe0;

  .el-icon {
    margin-right: 18px;
  }
}

.el-dropdown {
  margin-left: auto;
  /* 讓下拉選單靠右 */

  .el-dropdown-link {
    /* 水平+垂直置中 */
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>