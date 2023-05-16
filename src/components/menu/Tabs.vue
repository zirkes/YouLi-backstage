<template>
    <el-tabs v-model="editableTabsValue.name" type="border-card" class="demo-tabs" @tab-remove="removeTab"
        @tab-click="handleSelectedTab">
        <el-tab-pane class="tab-pane" v-for="item in editableTabs" :key="item.name" :label="item.title"
            :closable="item.name !== 'homeIndex'" :name="item.name">
            <slot></slot>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useRouterStore } from '@/stores/router';

const routerStore: any = useRouterStore();
const router: any = useRouter();

let editableTabsValue: Object = computed(() => routerStore.editableTabsValue)
let editableTabs: Object[] = routerStore.editableTabs;

const removeTab = routerStore.removeTab;

const handleSelectedTab = (pane: any, ev: Event) => {
    routerStore.setEditableTabsValue(pane.props.name);
    router.push({ name: pane.props.name })
}
</script>

<style scoped lang="less">
.demo-tabs {
    flex: 1;

    :deep(.el-tabs__content) {
        height: calc(100% - 40px) !important;
        padding: 0;

        .el-tab-pane {
            height: 100%;
        }
    }
}
</style>