<script setup lang="ts">
const form = reactive({
  name: 'qoo',
  password: '123456',
});
const onSubmit = () => {
  ElMessage.success('已送出');
};
</script>

<template>
  <div class="login">
    <!-- label-position top 標籤位置在上，size="large" 輸入框大小 -->
    <el-form :model="form" label-width="120px" label-position="top" size="large">
      <h2>登入</h2>
      <el-form-item label="帳號">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="密碼">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登入</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  background-color: #ccc;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-form {
    width: 300px;
    background: #fff;
    padding: 30px;
    border-radius: 10px;
  }

  .el-form-item {
    margin-top: 20px;
  }

  .el-button {
    width: 100%;
    margin-top: 20px;
  }
}
</style>