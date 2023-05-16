<template>
    <Particles id="tsparticles" :particlesInit="particlesInit" :options="particles" />
    <div class="container">
        <div class="login">
            <div class="login-head">
                <h2>YouLi商城后台管理系统</h2>
            </div>
            <div class="login-body">
                <el-col :span="15" class="user-name">
                    <el-icon :size="20" color="rgb(55,55,55)">
                        <User />
                    </el-icon>
                    <el-input type="text" placeholder="User Name" v-model="userName"></el-input>
                </el-col>
                <el-col :span="15" class="password">
                    <el-icon :size="20" color="rgb(55,55,55)">
                        <Lock />
                    </el-icon>
                    <el-input type="password" placeholder="Password" v-model="password"
                        @keyup.native.enter="login"></el-input>
                </el-col>
                <div class="login-button">
                    <el-button type="primary" @click="login">L O G I N</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// 粒子特效
import particles from './particles';
import { loadFull } from "tsparticles";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { adminLogin } from '@/api/index.js';
import { ElMessage } from 'element-plus';
import { setCookie } from '@/utils/cookie';
import { useAdminStore } from '@/stores/admin';

const router = useRouter();

let userName = ref<String>('')
let password = ref<String>('')

const adminStore = useAdminStore();

const login = async (): Promise<void> => {
    try {
        if (!userName.value.trim() || !password.value.trim()) {
            throw new Error('账号密码不能为空！');
        }
        let data = await adminLogin({ userName: userName.value, password: password.value })
        setCookie(data.data?.token, 'Token');
        adminStore.setAdminInfo(data.data?.adminInfo);
        if (data.code === 200) {
            router.replace({
                name: "homeIndex"
            })
        } else {
            throw new Error('账号或者密码错误！');
        }
    } catch (err: any) {
        ElMessage.warning(err.message)
    }
}

const particlesInit = async (engine: any): Promise<void> => {
    await loadFull(engine);
};
</script>


<style scoped lang="less">
.container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    padding: 0 0 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    border-radius: 16px;

    .login {
        z-index: 2;
        width: 100%;
        height: 100%;
        border-radius: 16px;
        box-shadow: 0 0 12px -2px rgb(255, 255, 255);

        .login-head {
            @titleHeight: 60px;
            text-align: center;
            width: 100%;
            height: @titleHeight;

            h2 {
                font-weight: 600;
                letter-spacing: 2px;
                color: rgb(55, 55, 55);
                line-height: @titleHeight;
            }
        }

        .login-body {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .user-name,
            .password {
                width: 100%;
                display: flex;
                align-items: center;
                margin: 10px 0;

                .el-icon {
                    margin: 0 10px;
                }
            }

            .login-button {
                margin-top: 20px;
            }
        }

        &::after {
            display: block;
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            border-radius: 16px;
            filter: blur(2px);
            backdrop-filter: blur(3px);
            background-color: rgba(255, 255, 255, 0.66);
        }
    }
}
</style>