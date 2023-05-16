<template>
    <ZGrid :loading="loading" :actions="actions" :tools="tools" :filters="filters" :columns="columns" :data="valData.value"
        :pageData="pageData" @gridApi="gridApi"></ZGrid>
</template>

<script lang="tsx" setup>
import { TableV2FixedDir } from 'element-plus';
import { ref } from 'vue';
import { ordersFn } from '@/hooks/order';
const { loading, tools, actions, filters, valData, pageData, getGridData: gridApi, handleDeleteGood, handleEditGood } = ordersFn();

const columns = ref<object[]>([
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
    { key: 'orderNumber', title: '订单号', width: 230, dataKey: 'orderNumber' },
    {
        key: 'status', title: '状态', width: 100, dataKey: 'status',
        // cellRenderer: ({ cellData }) => (
        //     <el-tag type={cellData === 1 ? 'success' : 'info'}>{cellData === 1 ? '上架' : '下架'}</el-tag>
        // )
    },
    { key: 'amount', title: '金额', width: 100, dataKey: 'amount' },
    { key: 'shopsRemarks', title: '备注', width: 570, dataKey: 'shopsRemarks' },
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