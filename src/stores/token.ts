import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

interface Token {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  user_id: string;
}

export const useTokenStore = defineStore('token', () => {
  const tokenJson = ref("");
  const token = computed<Token>(() => {
    try {
      // 初始沒有先給空 "{}"，後續刷新先從 localStorage 或從 tokenJson 轉換
      return JSON.parse(tokenJson.value || localStorage.getItem("tokenInfo") || "{}");
    } catch (err) {
      ElMessage.error("token 解析失敗");
      // 避免 localStore 內是錯誤的
      localStorage.setItem("tokenInfo", "");
      throw err;
    }
  });
  const saveToken = (data: string) => {
    tokenJson.value = data;
    localStorage.setItem("tokenInfo", data);
  };
  return { token, saveToken };
});
