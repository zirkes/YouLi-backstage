<template>
    <div class="container">
        <el-row :gutter="10" class="box">
            <el-col :span="8">
                <div class="statistic-card">
                    <el-statistic :value="98500">
                        <template #title>
                            <div class="card-header">
                                每日活跃用户
                                <el-tooltip effect="dark" content="一天内登录该产品的用户数" placement="top">
                                    <el-icon style="margin-left: 4px" :size="12">
                                        <Warning />
                                    </el-icon>
                                </el-tooltip>
                            </div>
                        </template>
                    </el-statistic>
                    <div class="statistic-footer">
                        <div class="footer-item">
                            <span>比昨天</span>
                            <span class="green">
                                24%
                                <el-icon>
                                    <CaretTop />
                                </el-icon>
                            </span>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="statistic-card">
                    <el-statistic :value="693700">
                        <template #title>
                            <div class="card-header">
                                每月活跃用户
                                <el-tooltip effect="dark" content="一个月内登录该产品的用户数" placement="top">
                                    <el-icon style="margin-left: 4px" :size="12">
                                        <Warning />
                                    </el-icon>
                                </el-tooltip>
                            </div>
                        </template>
                    </el-statistic>
                    <div class="statistic-footer">
                        <div class="footer-item">
                            <span>比上个月</span>
                            <span class="red">
                                12%
                                <el-icon>
                                    <CaretBottom />
                                </el-icon>
                            </span>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="statistic-card">
                    <el-statistic :value="72000" title="New transactions today">
                        <template #title>
                            <div class="card-header">
                                今日新增交易
                            </div>
                        </template>
                    </el-statistic>
                    <div class="statistic-footer">
                        <div class="footer-item">
                            <span>比昨天</span>
                            <span class="green">
                                16%
                                <el-icon>
                                    <CaretTop />
                                </el-icon>
                            </span>
                        </div>
                        <div class="footer-item">
                            <el-icon :size="14">
                                <ArrowRight />
                            </el-icon>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="16" class="content-txt">
            <el-col :span="10" class="user">
                <div class="user-head">
                    <h2>{{ adminInfo.adminName }}</h2>
                    <h5>权限：{{ adminInfo.role === 1 ? '超级管理员' : '管理员' }}</h5>
                </div>
                <el-divider style="margin-top:0;" />
                <div class="user-body">
                    <ul>
                        <li>日志-事件-时间</li>
                        <li>日志-事件-时间</li>
                        <li>日志-事件-时间</li>
                        <li>日志-事件-时间</li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="14" class="region">
                <el-calendar />
            </el-col>
        </el-row>
    </div>
</template>
  
<script lang="ts" setup>
import { useAdminStore } from '@/stores/admin';

const adminStore = useAdminStore();
let adminInfo = adminStore.getAdminInfo();

</script>
  
<style scoped lang="less">
.container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .box,
    .content-txt {
        max-width: 100%;
        margin-left: 0 !important;
        margin-right: 0 !important;
    }

    .content-txt {
        margin-top: 10px;
        display: flex;
        flex-wrap: nowrap;
        flex: 1;

        .user,
        .region {
            margin: 0 4px;
            border-radius: 6px;
            box-shadow: 0 0 8px -4px gray;
        }

        .user {
            .user-body,
            .user-head {
                padding: 10px;
            }
            .user-head {
                display: flex;
                align-items: baseline;
                justify-content: space-between;
            }
        }

        .region {
            flex: 1;
            margin-left: 8px;
        }
    }
}

:global(h2#card-usage ~ .example .example-showcase) {
    background-color: var(--el-fill-color) !important;
}

.card-header {
    font-size: 16px;
    display: inline-flex;
    align-items: center
}

.el-statistic {
    --el-statistic-content-font-size: 36px;
}

.statistic-card {
    height: 100%;
    padding: 20px;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);
    box-shadow: 0 0 8px -4px gray;
}

.statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 14px;
    color: var(--el-text-color-regular);
    margin-top: 16px;
}

.statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
}

.green {
    color: var(--el-color-success);
}

.red {
    color: var(--el-color-error);
}
</style>
  