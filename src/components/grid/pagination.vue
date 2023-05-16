<template>
    <el-pagination v-model:current-page="pageData.pageIndex" v-model:page-size="pageData.pageSize"
        :page-sizes="[10, 20, 50, 100, 200]" :small="true" :background="true"
        layout="total, sizes, prev, pager, next, jumper" :total="pageData.count" @size-change="pageActions.handleSizeChange"
        @current-change="pageActions.handleCurrentChange" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Pagination',
    props: {
        pageData: {
            type: Object,
            required: true,
            default: {}
        },
        pageActions: {
            type: Object,
            required: true
        }
    },
})
</script>

<style lang="less"></style>