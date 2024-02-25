<script setup lang="ts">
import { ref } from "vue";
// import type { Ref } from "vue";
import type { CheckboxValueType } from "element-plus";
import type { RoleCategoryItem } from '@/api/roles';
// 接收數據
const props = defineProps<{
  category: RoleCategoryItem;
}>();
// 發送目前選取狀態給父組件
const emit = defineEmits<{
  // 函數是啥、函數返回值 void 都不返回
  // post 發送出去、要發送的東西、是 ref
  (e: "postCheckedIdsRef", payload: Ref<number[]>): void,
}>();
// 初始化
const checkAll = ref(props.category.selected);
// 已選擇的
const checkedIds = ref([] as number[]);
// 所有選項
const allItemIds = [] as number[];
// 標示半選狀態
const isIndeterminate = ref(checkedIds.value.length > 0 && checkedIds.value.length < allItemIds.length);
// 取得初始的值
props.category.resourceList?.forEach(resource => {
  allItemIds.push(resource.id);
  resource.selected && checkedIds.value.push(resource.id);
});
// 在 setup 執行時，立即發送息與數據，因為資料是響應式的
emit("postCheckedIdsRef", checkedIds);
// 當群組內沒有任何項目被選中時，將全選/全部選，改為 false
watchEffect(() => {
  if (checkedIds.value.length === 0) checkAll.value = false;
});

const handleCheckAllChange = (value: CheckboxValueType) => {
  checkedIds.value = value ? allItemIds : [];
  isIndeterminate.value = false;
};


const handleCheckedItemChange = (checkedItems: CheckboxValueType[]) => {
  const checkedCount = checkedItems.length;
  checkAll.value = checkedCount === allItemIds.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < allItemIds.length;
};

</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">{{
          props.category.name }}</el-checkbox>
      </div>
    </template>
    <el-checkbox-group v-model="checkedIds" @change="handleCheckedItemChange">
      <el-row>
        <el-col :span="8" v-for="resource in category.resourceList" :key="resource.id">
          <el-checkbox :label="resource.id">{{ resource.name }}</el-checkbox>
        </el-col>
      </el-row>
    </el-checkbox-group>
  </el-card>
</template>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 30px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
}
</style>