<script setup lang="ts">
import { RouterView } from 'vue-router';
import zhTw from 'element-plus/es/locale/lang/zh-tw'
</script>

<template>
  <el-config-provider :locale="zhTw">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
