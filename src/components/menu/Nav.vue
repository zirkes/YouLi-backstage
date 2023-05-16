<template>
    <div class="nav">
        <div class="icon">
            <el-icon size="26" class="icon-item" @click="handleChange(true)" v-if="!isCollapse">
                <Fold />
            </el-icon>
            <!-- color="#65a0f8" -->
            <el-icon size="26" class="icon-item" @click="handleChange(false)" v-else>
                <Expand />
            </el-icon>
        </div>
        <div class="menu">
            <el-menu :default-active="editableTabsValue.path" :router="true" :collapse="isCollapse" :unique-opened="true"
                @select="handleSelectMenu" class="el-menu-vertical-demo">
                <template v-for="(item, index) in routerList" :key="index">
                    <el-sub-menu :index="item.path" v-if="item.children">
                        <template #title>
                            <el-icon>
                                <component :is="item.icon" />
                            </el-icon>
                            <span>{{ item.label }}</span>
                        </template>
                        <el-menu-item v-for="(val, i) in item.children" :key="i" :index="val.path">{{
                            val.label }}</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item :index="item.path" v-else>
                        <el-icon>
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.label }}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouterStore } from '@/stores/router';

const routerStore = useRouterStore();
let isCollapse = ref<Boolean>(false);
let route: any = useRoute();

let emits = defineEmits(['getIsCollapse']);

const routerList: Object[] = routerStore.routerList;
let editableTabsValue: Object = routerStore.editableTabsValue

const handleChange = (data: Boolean) => {
    isCollapse.value = data;
    emits('getIsCollapse', isCollapse.value);
}

const handleSelectMenu = (key: string) => {
    try {
        let params: Object;
        for (let i = 0; i < routerList.length; i++) {
            if (routerList[i].children) {
                for (let j = 0; j < routerList[i].children.length; j++) {
                    if (routerList[i].children[j].path === key) {
                        params = routerList[i].children[j];
                        routerStore.addTab(params);
                        break;
                    }
                }
            }
            if (routerList[i].path === key) {
                params = routerList[i];
                routerStore.addTab(params);
                break;
            }
        }
    } catch (err) {
        console.log(err);
    }
}

onMounted(() => {
    if (route.path !== '/home/index') {
        handleSelectMenu(route.path)
    }
})
</script>
  
<style lang="less" scoped>
.nav {
    height: 100%;
    display: flex;
    flex-direction: column;

    .icon {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;
        margin: 10px 0;

        .icon-item {
            cursor: pointer;
            border-radius: 3px;
        }
    }

    .menu {
        flex: 1;

        .el-menu {
            border: 0;
        }
    }
}


.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>