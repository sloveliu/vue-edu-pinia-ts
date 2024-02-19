<script setup lang="ts">
import { saveOrUpdate, getRoleById } from '@/api/roles';

const dialogFormVisible = ref(false);
const formLabelWidth = '100px';

const initData = () => ({
  code: "",
  name: "",
  description: ""
});

const form = reactive(initData());

const isCreate = ref(true);
const msgText = ref('');
const initAndShow = async (id: number = 0) => {
  dialogFormVisible.value = true;
  Object.assign(form, initData());
  if (id) {
    isCreate.value = false;
    msgText.value = "更新";
    const { data } = await getRoleById(id);
    if (data.code === "000000") {
      Object.assign(form, data.data);
    } else {
      const errMsg = `獲取 ID 為:${id} 角色資訊失敗 ${data.mesg}`;
      ElMessage.error(errMsg);
      throw new Error(errMsg);
    }
  } else {
    isCreate.value = true;
    msgText.value = "建立";
  }
};

// 對 defineEmits<T> 傳入型態
// https://cn.vuejs.org/api/sfc-script-setup.html#type-only-props-emit-declarations
const emit = defineEmits<{
  // ()表示函數，沒有返回
  (e: "role-change"): void;
  // (e: "role-change", id: number 給父組件傳值): void
}>();
const onSubmit = async () => {
  const { data } = await saveOrUpdate(form).finally(() => { dialogFormVisible.value = false; });
  if (data.code === "000000") {
    // 通知父組件成功去更新
    emit("role-change");
    ElMessage.success(`${msgText.value}角色成功`);
  } else {
    const errMsg = `${msgText.value}角色失敗 ${data.mesg}`;
    ElMessage.error(errMsg);
    throw new Error(errMsg);
  }
};
// 要從子組件調用此方法，需要暴露出去
defineExpose({
  initAndShow
})

</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '角色'">
    <el-form :model="form">
      <el-form-item label="角色名稱" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" prop="name" />
      </el-form-item>
      <el-form-item label="角色編號" :label-width="formLabelWidth">
        <el-input v-model="form.code" autocomplete="off" prop="code" />
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input v-model="form.description" autocomplete="off" type="textarea" prop="description" />
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit()">
          確定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>