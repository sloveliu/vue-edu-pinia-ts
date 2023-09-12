<script setup lang="ts">
</script>

<template>
  <div class="common-layout">
    <el-container>
      <AppAside />
      <el-container class="header-and-main">
        <AppHeader />
        <el-main>
          <!-- 避免撐太長 -->
          <el-scrollbar>
            <!-- / 的子路由都會顯示在這 -->
            <RouterView />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.header-and-main {
  flex-direction: column; // 讓 header、main 垂直顯示
  height: 100vh;
}

.el-main {
  background-color: #f4f4f5;
  /* padding-right: 0; // el-main 有預設的 padding */
}
</style>