<script setup lang="ts">
import { useMenus } from "@/composables/useMenus";
const { getAllMenus, topMenus, form, onSubmit } = useMenus();

getAllMenus();
// 過濾頂級選單，等 allMenus 取得值時進行過濾回傳

</script>

<template>
  <!-- Todo 補驗證規則 -->
  <el-form :model="form" label-width="120px" size="large">
    <el-form-item label="選單名稱">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="選單路徑">
      <el-input v-model="form.href" />
    </el-form-item>
    <el-form-item label="上層選單">
      <el-select v-model="form.parentId" placeholder="please select your zone">
        <el-option label="頂層選單" :value="-1" />
        <el-option v-for="menu in topMenus" :key="menu.id" :label="menu.name" :value="menu.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="form.description" />
    </el-form-item>
    <el-form-item label="圖示名稱">
      <el-input v-model="form.icon" />
    </el-form-item>
    <el-form-item label="是否顯示">
      <el-radio-group v-model="form.shown">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="form.orderNum" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">建立</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.el-form {
  background-color: #fff;
  padding: 70px;
}
</style>