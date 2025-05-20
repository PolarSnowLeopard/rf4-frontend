<template>
    <div id="global-header">
        <a-row :wrap="false">
            <a-col flex="200px">
                <div class="title-bar">
                    <img class="logo" src="../assets/fisherman.svg" alt="logo" />
                    <div class="title">俄钓4 钓鱼助手</div>
                </div>
            </a-col>
            <a-col flex="auto">
                <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="doMenuClick" />
            </a-col>
            <a-col flex="80px">
                <div class="user-login-status">
                    <a-button type="primary" href="/user/login">登录</a-button>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script setup>
import { h, ref, onMounted } from 'vue';
import { HomeOutlined, BookOutlined, ExperimentOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const current = ref(['home']);

const items = ref([
    {
        key: '/',
        icon: () => h(HomeOutlined),
        label: '主页',
        title: '主页',
    },
    {
        key: '/manue/fish',
        icon: () => h(BookOutlined),
        label: '图鉴',
        title: '图鉴',
        children: [
            {
                key: '/manue/fish',
                label: '鱼类图鉴',
            },
        ],
    },
    {
        key: '/agent',
        icon: () => h(ExperimentOutlined),
        label: '智能体',
        title: '智能体',
    },
    {
        key: '/user/login',
        label: '登录',
        title: '登录',
    },
]);

// 路由跳转事件
const doMenuClick = ({ key }) => {
    router.push(key);
};

// 组件挂载时，根据当前路由初始化选中状态
onMounted(() => {
    initSelectedMenu();
});

// 初始化选中菜单
const initSelectedMenu = () => {
    const currentPath = route.path;
    current.value = [currentPath];
};

// 监听路由变化，更新菜单选中状态
router.afterEach((to, from) => {
    current.value = [to.path];
});
</script>

<style scoped>
.title-bar {
    display: flex;
    align-items: center;
}

.title {
    color: black;
    font-size: 18px;
    margin-left: 16px;
}

.logo {
    height: 48px;
}
</style>
