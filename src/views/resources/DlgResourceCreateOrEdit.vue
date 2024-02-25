<script setup lang="ts">
import { saveOrUpdate, getResourceById } from "@/api/resources";
import { allResourceCategory, getAllResourceCategory } from "@/composables/useResourceCategory";
import { queryResources } from "@/composables/useResources";

// 因為這裡多數屬性、方法不會被複用，所以沒有提取到 useResource.ts，也要考慮程式可讀性

getAllResourceCategory();
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';
// 返回一個 obj，每次調用會取得一個新的，就像使用 useXXX() 都會 return 一個新的物件
const initData = () => ({
  id: undefined,
  name: "",
  categoryId: 1,
  url: "",
  description: "",
});
const form = reactive(initData());
const isCreate = ref(true);
const msgText = ref("");
const initAndShow = async (id = 0) => {
  // 或改用 ref form.value = initData()
  Object.assign(form, initData());
  dialogFormVisible.value = true;
  if (id) {
    isCreate.value = false;
    msgText.value = "更新";
    const { data } = await getResourceById(id);
    if (data.code = "000000") {
      Object.assign(form, data.data);
    } else {
      const errMsg = `獲取 Id:${id} 資源失敗 ${data.mesg}`;
      ElMessage.error(errMsg);
      throw new Error(errMsg);
    }
  } else {
    isCreate.value = true;
    msgText.value = "建立";
  }
};
defineExpose({
  initAndShow
});

const onSubmit = async () => {
  const { data } = await saveOrUpdate(form).finally(() => dialogFormVisible.value = false);
  if (data.code === "000000") {
    ElMessage.success(`${msgText.value}資源成功`);
    queryResources({ current: 1 });
  } else {
    const errMsg = `${msgText.value}資源失敗 ${data.mesg}`;
    ElMessage.error(errMsg);
    throw new Error(errMsg);
  }
};
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '資源'">
    <el-form :model="form">
      <el-form-item label="資源名稱" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="資源路徑" :label-width="formLabelWidth" prop="url">
        <el-input v-model="form.url" autocomplete="off" />
      </el-form-item>
      <el-form-item label="資源類別" :label-width="formLabelWidth" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="資源類別">
          <!-- <el-option label="空" value="" /> -->
          <el-option v-for="category in allResourceCategory" :key="category.id" :label="category.name"
            :value="category.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="資源描述" :label-width="formLabelWidth" prop="description">
        <el-input type="textarea" v-model="form.description" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button @click="onSubmit" type="primary">確定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>