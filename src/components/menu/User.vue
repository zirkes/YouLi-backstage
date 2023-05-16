<template>
    <el-dropdown trigger="click">
        <span class="el-dropdown-link user-container">
            <el-avatar icon="UserFilled" />
            <span class="user-name">{{ adminInfo.adminName }}</span>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="(item, index) in tools" :key="index" :divided="index !== 0"
                    @click="handleSelectedDrop(item.name)">{{ item.label
                    }}</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts" setup>
import { adminFn } from '@/hooks/admin';

const { tools, adminInfo, handleSelectedDrop } = adminFn();

</script>

<style lang="less" scope>
.user-container {
    display: flex;
    align-items: center;
    border: 0;
    cursor: pointer;

    .user-name {
        user-select: none;
        margin-left: 10px;
    }
}
</style>