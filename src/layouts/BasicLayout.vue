<template>
    <div id="BasicLayout">
        <a-layout>
            <a-layout-header>Header</a-layout-header>
            <a-layout-content class="content">
                <router-view />
            </a-layout-content>
            <a-layout-footer class="footer">
                <a href="https://github.com/PolarSnowLeopard" target="_blank">
                    俄钓4助手 by 瀚海雪豹
                </a>
            </a-layout-footer>
        </a-layout>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const selectedKeys = ref(['2']);
</script>

<style scoped>
#BasicLayout {
    height: 100vh;
    width: 100vw;
}

#BasicLayout .footer {
    background-color: #efefef;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
}

#BasicLayout .content {
    padding: 16px;
    margin-bottom: 50px;
}
</style>
