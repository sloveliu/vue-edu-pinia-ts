<script setup lang="ts">
import { isCollapse } from './isCollapse';
</script>

<template>
  <el-aside>
    <!-- 包起來隱藏 scrollbar 滾動條 -->
    <el-scrollbar>
      <!-- router 讓 menu index 作用連結 route。unique-opened 同時只展開一個子選單。collapse 摺疊選單 -->
      <el-menu router unique-opened :collapse="isCollapse">
        <a href="/" class="logo">
          <img src="@/assets/logo.svg" alt="">
          <h1>Vue Demo</h1>
        </a>
        <!-- 有子選單用 el-sub-menu -->
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <IEpSetting />
            </el-icon> <span>權限管理</span>
          </template>
          <el-menu-item index="/roles">
            <el-icon>
              <IEpSetting />
            </el-icon> <span>角色列表</span>
          </el-menu-item>
          <el-menu-item index="/menus">
            <el-icon>
              <IEpSetting />
            </el-icon> <span>選單列表</span>
          </el-menu-item>
          <el-menu-item index="resources">
            <el-icon>
              <IEpSetting />
            </el-icon> <span>資源列表</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/users">
          <el-icon>
            <IEpSetting />
          </el-icon> <span>用戶管理</span>
        </el-menu-item>
        <el-menu-item index="/course">
          <el-icon>
            <IEpSetting />
          </el-icon> <span>課程管理</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <IEpSetting />
            </el-icon> <span>廣告管理</span>
          </template>
          <el-menu-item index="/ads">
            <el-icon>
              <IEpSetting />
            </el-icon> <span>廣告列表</span>
          </el-menu-item>
          <el-menu-item index="/ads-space">
            <el-icon>
              <IEpSetting />
            </el-icon> <span>位置管理</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none; // 去 a link 底線
  color: black;
  height: 60px;

  img {
    width: 32px;
    height: 32px;
  }
}

.el-aside {
  background-color: #e9e9eb;
  height: 100vh;
  width: auto;
}

.el-menu {
  background-color: #e9e9eb;
  border-right: none;
  width: 200px;

  &.el-menu--collapse {
    // & 表示父元素 .el-menu 等同 .el-menu.el-menu--collapse
    width: 60px;

    & h1 {
      display: none; // 摺疊時隱藏文字
    }
  }
}
</style>
