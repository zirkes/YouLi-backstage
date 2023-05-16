<template>
    <div class="list">
        <div class="list-head">
            <div class="head-btn">
                <el-button type="primary" size="small" v-for="(item, index) in tools" :key="index" :icon="item.icon"
                    @click="handleClick(item.name)">{{ item.label }}</el-button>
            </div>
            <div class="head-fileds">

            </div>
        </div>
        <div class="list-body">
            <Yl-Grid v-loading="loading" :columnDefs="columnDefs.value" :rowData="rowData.value" :rowHeight="66"
                :defaultColDef="defaultColDef" rowSelection="multiple" animateRows="true" :rowStyle="rowStyle"
                @cell-clicked="cellWasClicked" @cell-double-clicked="handleDoubleClick" @grid-ready="onGridReady"></Yl-Grid>
        </div>
        <div class="list-footer">
            
        </div>
    </div>
</template>

<script lang="ts" setup>
import { goodsListPage } from '@/api/index';
import { ref, reactive, onMounted } from 'vue';

let tools = ref([
    { label: '查询', name: 'query', icon: 'Search' },
    { label: '刷新', name: 'reset', icon: 'RefreshLeft' },
])
let loading = ref(false);
const rowData = reactive({
    value: []
});
const columnDefs = reactive({
    value: [
        {
            field: 'image',
            headerName: '图片',
            width: 100,
            flex: 0,
            cellRenderer: (params: Object) => {
                return `<div style="max-width:50px;max-height:50px;">
                            <img src="${params.data.image}" style="max-width: 100%; max-height: 100%;">
                        </div>`
            },
            sortable: false,
            filter: false,
            cellStyle: () => cellStyle
        },
        { field: 'name', headerName: '商品名称', minWidth: 200, flex: 0 },
        {
            field: 'price', headerName: '价格', maxWidth: 100, cellRenderer: (params: Object) => {
                return `<span class="el-tag el-tag--danger el-tag--plain">
                            <span class="el-tag__content">${params.data.price}</span>
                        </span>`
            }
        },
        {
            field: 'status', headerName: '状态', sortable: false, maxWidth: 100, cellRenderer: (params: Object) => {
                if (params.data.status === 1) {
                    return '上架'
                } else {
                    return '下架'
                }
            }
        },
        { field: 'stock', headerName: '库存', maxWidth: 100 },
        {
            field: 'exhibit', headerName: '首页展示', maxWidth: 120, cellRenderer: (params: Object) => {
                if (params.data.exhibit === 1) {
                    return '是'
                } else {
                    return '否'
                }
            }
        },
        { field: 'detail', headerName: '商品描述' }
    ]
});
// 默认通用的列属性
const defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1
};

const gridApi = ref(null); // Optional - for accessing Grid's API

// 行样式
const rowStyle = {
    'background': 'white'
}
const cellStyle = {
    display: 'flex',
    'align-items': 'center',
}

// Obtain API from grid's onGridReady event
const onGridReady = (params: any) => {
    gridApi.value = params.api;
};
const handleClick = (name: String) => {
    console.log(name);
}
// grid双击事件
const handleDoubleClick = () => {
    console.log('双击事件')
}
// 点击表格事件
const cellWasClicked = (event: any) => {
    console.log("cell was clicked", event);
};
const getGridData = async () => {
    let params = {
        pageIndex: 3,
        pageSize: 10
    }
    let data = await goodsListPage(params);
    data.data?.list.forEach(item => {
        item.price = parseFloat(item.price)
    })

    rowData.value = data.data.list;
}

onMounted(() => {
    getGridData();
})
</script>

<style lang="less" scoped>
.list {
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 8px -4px gray;

    .list-head {
        height: 100px;
        padding: 10px;
    }

    .list-body {
        flex: 1;
    }

    .list-footer {
        height: 100px;
    }
}
</style>