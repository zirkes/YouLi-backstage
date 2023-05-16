<template>
    <ZGrid :loading="loading" :actions="actions" :tools="tools" :filters="filters" :columns="columns" :data="valData.value"
        :pageData="pageData" @gridApi="gridApi"></ZGrid>
</template>

<script lang="tsx" setup>
import { TableV2FixedDir } from 'element-plus';
import { ref, resolveComponent, h } from 'vue';
import { goodsFn } from '@/hooks/goods';
const { loading, tools, actions, filters, valData, pageData, getGridData: gridApi, handleDeleteGood, handleEditGood, handleChangeExhibit } = goodsFn();

let ElTag = resolveComponent("ElTag");

const columns = ref<Object[]>([
    {
        key: 'select',
        title: '全选',
        width: 50,
        dataKey: 'select',
        cellRenderer: (data) => {
            // console.log(data.rowIndex);
            return (<el-checkbox size="large" />)
        },
        headerCellRenderer: (data) => {
            return (<el-checkbox size="large" />)
        }
    },
    {
        key: 'image',
        title: '图片',
        width: 100,
        dataKey: 'image',
        cellRenderer: ({ cellData }) => {
            return h('img', { src: cellData, style: 'width:50px' })
        }
    },
    { key: 'name', title: '商品名称', width: 200, dataKey: 'name' },
    {
        key: 'price', title: '价格', width: 100, dataKey: 'price', cellRenderer: ({ cellData }) => {
            return h(ElTag, { type: 'danger', effect: "plain" }, { default: () => cellData })
        }
    },
    {
        key: 'status', title: '状态', width: 100, dataKey: 'status', cellRenderer: ({ cellData }) => (
            <el-tag type={cellData === 1 ? 'success' : 'info'}>{cellData === 1 ? '上架' : '下架'}</el-tag>
        )
    },
    { key: 'stock', title: '库存', width: 100, dataKey: 'stock' },
    {
        key: 'exhibit', title: '首页展示', width: 100, dataKey: 'exhibit', cellRenderer: (data: Object) => (
            <el-switch v-model={data.rowData.exhibit} active-value={1} onClick={handleChangeExhibit.bind(this, data.rowData)} />
        )
    },
    { key: 'detail', title: '商品描述', width: 570, dataKey: 'detail' },
    {
        key: 'operate', title: '操作', width: 150, fixed: TableV2FixedDir.RIGHT, dataKey: 'operate', cellRenderer: (data: Object) => (
            <>
                <el-button icon="edit" size="small" type="primary" plain onClick={handleEditGood.bind(this, data.rowData)}>编辑</el-button>
                <el-button icon="delete" size="small" type="danger" plain onClick={handleDeleteGood.bind(this, data.rowData)}>删除</el-button>
            </>
        )
    }
])
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