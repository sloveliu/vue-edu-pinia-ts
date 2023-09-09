<script setup lang="ts">
const form = reactive({
  name: 'qoo',
  password: '123456',
});
const formRef = ref<FormInstance>(); // 名稱要對應到 ref="formRef"
const onSubmit = async () => {
  // 發送驗證，預設回傳 Promise。
  await formRef.value?.validate().catch(err => { // 只抓失敗 catch err
    ElMessage.error('表單驗證失敗');
    throw err; // 錯誤往外拋，程式就不會往下執行
    // return new Promise(() => { }); // 不想拋錯出去用這樣攔截
  });
  // 成功發送請求出去

};
// 表單驗證
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "請輸入帳號", trigger: "blur" }, // 失去焦點時檢查
    { pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,30}$/, message: "請輸入 6 位以上，須包含英文大小寫", trigger: "blur" } // https://blog.miniasp.com/post/2008/05/09/Using-Regular-Expression-to-validate-password
  ],
  password: [
    { required: true, message: "密碼不能為空", trigger: "blur" },
    { min: 6, max: 18, message: "請輸入 6-18 位密碼", trigger: "blur" }
  ]
});
</script>

<template>
  <div class="login">
    <!-- label-position top 標籤位置在上，size="large" 輸入框大小 -->
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px" label-position="top" size="large">
      <h2>登入</h2>
      <!-- prop="name" 採用 rules name 的驗證規則 -->
      <el-form-item label="帳號" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="密碼" prop="password">
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