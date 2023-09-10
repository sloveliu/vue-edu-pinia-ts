<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { login } from "@/api/users.ts";
const form = reactive({
  phone: '18201288771',
  password: '111111',
});
const formRef = ref<FormInstance>(); // 名稱要對應到 ref="formRef"
const onSubmit = async () => {
  // 發送驗證，預設回傳 Promise
  await formRef.value?.validate().catch(err => { // 只抓失敗 catch err
    ElMessage.error('表單驗證失敗');
    throw err; // 錯誤往外拋，程式就不會往下執行
    // return new Promise(() => { }); // 不想拋錯出去用這樣攔截
  });
  // 成功發送請求出去
  const { content } = await login(form).then(res => {
    if (!res.data.success) {
      ElMessage.error("登入失敗");
      throw new Error("登入資訊錯誤");
    }
    return res.data;
  });
  console.log(content);
};
// 表單驗證
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: "請輸入手機號碼", trigger: "blur" }, // 失去焦點時檢查
    { pattern: /^1\d{10}$/, message: "手機號碼必須是11位數字", trigger: "blur" }
    // { pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,30}$/, message: "請輸入 6 位以上，須包含英文大小寫", trigger: "blur" } // https://blog.miniasp.com/post/2008/05/09/Using-Regular-Expression-to-validate-password
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
      <!-- prop="phone" 採用 rules phone 的驗證規則 -->
      <el-form-item label="手機號碼" prop="phone">
        <el-input v-model="form.phone" />
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