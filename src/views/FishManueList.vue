<template>
  <div class="container">
    <h1>鱼类图鉴</h1>
    <div class="fish-card-container" v-if="!loading">
      <a-card v-for="fish in manueList" :key="fish.id" class="fish-card" :hoverable="true">
        <template #cover>
          <img :src="fish.img" :alt="fish.name" class="fish-image" />
        </template>
        <a-card-meta :title="fish.name">
          <template #description>
            <div class="fish-info">
              <p class="fish-class">类别：{{ fish.fish_class }}</p>
              <p>稀有重量：{{ fish.rare_weight }}</p>
              <p>超稀有重量：{{ fish.super_rare_weight }}</p>
              <!-- <p class="fish-description">{{ fish.description }}</p> -->
            </div>
          </template>
        </a-card-meta>
      </a-card>
    </div>
    <div v-else class="loading">
      <a-spin tip="加载中..."></a-spin>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { getFishManueList } from '@/api/manue'
const manueList = ref([])
const loading = ref(true)

onMounted(() => {
  fetchFishManueList()
})

const fetchFishManueList = async () => {
  try {
    loading.value = true
    const res = await getFishManueList()
    
    // 判断返回的数据结构
    if (res && res.data) {
      manueList.value = res.data
    } else if (res) {
      manueList.value = res
    }
    
  } catch (error) {
    console.error('获取鱼类图鉴失败:', error)
    manueList.value = [] // 确保即使出错也设置为空数组
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}

.fish-card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.fish-card {
  width: 100%;
  margin-bottom: 20px;
}

.fish-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.fish-info {
  margin-top: 10px;
}

.fish-class {
  font-weight: bold;
  color: #1890ff;
}

.fish-description {
  margin-top: 10px;
  text-align: justify;
  max-height: 100px;
  overflow-y: auto;
}

.loading {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
</style>