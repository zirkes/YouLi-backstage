<template>
    <div class="header-container">
        <div class="img">
            <img src="@/assets/images/YouLi.png" alt="重新加载">
        </div>
        <div class="title">
            <h1>商城后台管理系统</h1>
        </div>
        <div class="user">
            <User></User>
        </div>
    </div>
</template>

<script lang="ts" setup>
import User from './User.vue';
</script>

<style lang="less" scoped>
.header-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    .img {
        width: 80px;

        img {
            width: 100%;
        }
    }

    .title {
        h1 {
            padding-left: 10px;
            font-weight: 550;
            font-size: 36px;
            letter-spacing: 5px;
        }
    }

    .user {
        position: absolute;
        right: 20px;
    }
}</style>