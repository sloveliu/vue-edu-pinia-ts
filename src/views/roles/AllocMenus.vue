<script setup lang="ts">
import { getRoleMenus, allocateRoleMenus } from "@/api/roles";
import type { RoleMenuItem } from "@/api/roles";
import type { ElTree } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
// 第一種方式
// import { useRoute } from "vue-router";
// const route = useRoute();
// console.log(route.params.roleId);
// 第二種方式，搭配 route index 裡設定 props: true
const props = defineProps({
  roleId: {
    type: String,
    required: true,
  }
});
const roleMenus = ref<RoleMenuItem[]>();
// 預設被選中的 key
const checkedIds = ref<number[]>([]);
// 取得所有被選中的選單 Id
const getCheckedIds = (arrData: RoleMenuItem[]) => {
  arrData.forEach((roleMenu) => {
    console.log(roleMenu);
    if (roleMenu.subMenuList?.length) {
      // 選單底下有子選單則回調 getCheckedIds
      getCheckedIds(roleMenu.subMenuList);
    } else if (roleMenu.selected) {
      checkedIds.value?.push(roleMenu.id);
    }
  });
};
const loadRoleMenus = async () => {
  const { data } = await getRoleMenus(props.roleId);
  if (data.code === "000000") {
    roleMenus.value = data.data;
    getCheckedIds(data.data);
  } else {
    const errMsg = `獲取角色選單失敗 ${data.mesg}`;
    ElMessage.error(errMsg);
    throw new Error(errMsg);
  }
};
loadRoleMenus();

const menuTree = ref<InstanceType<typeof ElTree> | null>(null);
const onSave = async () => {
  // 取得當前最新核取的選項 getCheckedKeys el 官方提供的方法
  const currentCheckedIds: number[] | [] = menuTree.value?.getCheckedKeys() as any;
  const { data } = await allocateRoleMenus(props.roleId, currentCheckedIds);
  if (data.code === "000000" && data.data) {
    ElMessage.success("更新角色選單權限成功");
    router.push({ name: "roles" });
  } else {
    const errMsg = `更新角色選單權限失敗 + ${data.mesg}`;
    ElMessage.error(errMsg);
    throw new Error(errMsg);
  }
};

const onClear = () => {
  // 清空選項 setCheckedKeys el 官方提供的方法
  menuTree.value?.setCheckedKeys([]);
};
</script>

<template>
  <!-- default-expand-all 預設展開選單，node-key 唯一標識 -->
  <el-tree ref="menuTree" :data="roleMenus" :props="{ label: 'name', children: 'subMenuList' }"
    :default-checked-keys="checkedIds" show-checkbox default-expand-all node-key="id">
  </el-tree>
  <el-button type="primary" @click="onSave">儲存</el-button>
  <el-button type="" @click="onClear">清空</el-button>
</template>

<style lang="scss" scoped>
.el-tree {
  margin-bottom: 20px;
}
</style>