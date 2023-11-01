<script setup lang="ts">
import { form, dialogFormVisible, isCreate, msgText, onSubmit, allResourceCategory } from '@/composables/useResourceCategory';
import { FormInstance } from 'element-plus';
const formLabelWidth = '140px';

// 新建不傳 id、編輯要傳 id
const initAndShow = (id = 0) => {
  // 初始時清空表單，需搭配 prop="name"、prop="sort"
  formResourceCategory.value?.resetFields();
  dialogFormVisible.value = true;
  if (id) {
    isCreate.value = false;
    msgText.value = "更新";
    const resourceCategory = allResourceCategory.value.find(item => item.id === id);
    // 把 resourceCategory 裡的屬性賦值給 form，不會蓋過 form 的響應屬性
    Object.assign(form, resourceCategory);
  } else {
    isCreate.value = true;
    msgText.value = "新增";
  }
};

const formResourceCategory = ref<FormInstance>();

// 導出方法，讓所有使用這個組件時能調用 initAndShow
defineExpose({
  initAndShow
});
</script>

<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '資源類別'">
    <el-form :model="form" ref="formResourceCategory">
      <!-- prop="name" 可以用來重置表單 -->
      <el-form-item label="類別名稱" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
        <el-input v-model="form.sort" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">
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