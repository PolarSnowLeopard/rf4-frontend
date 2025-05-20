<template>
    <div id="userLoginPage">
        <h2 class="title">用户登录</h2>
        <a-form style="max-width: 480px; margin: 0 auto" label-align="left" :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }" :model="form" @finish="handleSubmit">
            <a-form-item name="userAccount" label="账号" :rules="[{ required: true, message: '请输入账号' }]">
                <a-input v-model:value="form.userAccount" placeholder="请输入账号" />
            </a-form-item>
            <a-form-item name="userPassword" label="密码" :rules="[
                { required: true, message: '请输入密码' },
                { min: 8, message: '密码不少于 8 位' },
            ]">
                <a-input-password v-model:value="form.userPassword" placeholder="请输入密码" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
                <a-button type="primary" html-type="submit">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginUserStore } from '@/store/user';
import { userLogin } from '@/api/user';
import { message } from 'ant-design-vue';

const router = useRouter();
const loginUserStore = useLoginUserStore();

const form = ref({
    username: '',
    password: '',
});

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
    // 创建普通对象而不是直接传递响应式对象
    const params = {
        username: form.value.username,
        password: form.value.password
    };

    try {
        const res = await userLogin(params);
        // 登录成功，跳转到主页
        if (res.data.code === 0 && res.data.data) {
            await loginUserStore.fetchLoginUser();
            message.success("登录成功");
            router.push({
                path: "/",
                replace: true,
            });
        } else {
            message.error("登录失败");
        }
    } catch (error) {
        console.error("登录请求失败:", error);
        message.error("登录失败");
    }
};

</script>

<style scoped>
#userLoginPage {
    padding: 20px;
}
</style>