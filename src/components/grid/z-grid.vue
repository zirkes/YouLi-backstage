<template>
    <div class="list">
        <div class="list-head">
            <GridHead :tools="tools" :filters="filters" :actions="actions"></GridHead>
        </div>
        <div class="list-body">
            <YlGridV2 v-loading="loading" :columns="columns" :data="data"></YlGridV2>
        </div>
        <div class="list-footer">
            <div class="pagination">
                <Pagination :pageData="pageData" :pageActions="pageActions"></Pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import GridHead from '@/components/grid/grid-head.vue';
import Pagination from '@/components/grid/pagination.vue';
import YlGridV2 from '@/components/grid/yl-grid-v2.vue';
import { reactive, onActivated, defineComponent } from 'vue';

export default defineComponent({
    name: 'z-Grid',
    components: {
        GridHead,
        YlGridV2,
        Pagination
    },
    props: {
        tools: {
            type: Array,
            required: true,
            default: () => []
        },
        actions: {
            type: Object,
            required: true
        },
        filters: {
            type: Array
        },
        loading: {
            type: Boolean,
            default: false
        },
        columns: {
            type: Array as PropType<any[]>,
            required: true,
            default: () => []
        },
        data: {
            type: Array as PropType<any[]>,
            required: true,
            default: () => ([])
        },
        pageData: {
            type: Object,
            required: true,
            default: {}
        },
    },
    emits: ['gridApi'],
    setup(props, { emit }) {
        const pageActions = reactive({
            handleSizeChange: (val: number): void => {
                props.pageData.pageSize = val;
                emit('gridApi');
            },
            handleCurrentChange: (val: number): void => {
                props.pageData.pageIndex = val;
                emit('gridApi');
            }
        });

        onActivated(() => {
            emit('gridApi');
        })
        return {
            pageActions
        }
    }
})

</script>

<style lang="less" scoped>
.list {
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 8px -4px gray;

    .list-head {
        height: 112px;
        padding: 10px;
    }

    .list-body {
        flex: 1;
        border-top: 1px solid var(--el-border-color);
        border-bottom: 1px solid var(--el-border-color);
    }

    .list-footer {
        .pagination {
            display: flex;
            justify-content: flex-end;
            padding-right: 20px;
            height: 60px;
        }
    }
}
</style>