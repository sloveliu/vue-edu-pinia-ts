<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { login } from "@/api/users.ts";
import { useTokenStore } from "@/stores/token";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
// 解構注意一下，computed 返回的也是 ref 物件，所以不要直接解構取
// const { token, saveToken } = useTokenStore();
const store = useTokenStore()
const form = reactive({
  phone: '18201288771',
  password: '111111',
});
// 名稱要對應到 ref="formRef"
const formRef = ref<FormInstance>();
const isLoading = ref(false);
const onSubmit = async () => {
  isLoading.value = true;
  // 發送驗證，預設回傳 Promise，只抓失敗 catch err
  await formRef.value?.validate().catch(err => {
    ElMessage.error('表單驗證失敗');
    isLoading.value = false;
    // 錯誤往外拋，程式就不會往下執行
    throw err;
    // return new Promise(() => { }); // 不想拋錯出去用這樣攔截
  });

  const { content } = await login(form).then(res => {
    if (!res.data.success) {
      ElMessage.error("登入失敗");
      isLoading.value = false;
      throw new Error("登入資訊錯誤");
    }
    return res.data;
  });
  store.saveToken(content);
  isLoading.value = false;
  ElMessage.success("登入成功");
  router.push(route.query.redirect as string || "/");
};

// 表單驗證
const rules = reactive<FormRules>({
  phone: [
    // 失去焦點時檢查
    { required: true, message: "請輸入手機號碼", trigger: "blur" },
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
        <el-button type="primary" @click="onSubmit" :loading="isLoading">登入</el-button>
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