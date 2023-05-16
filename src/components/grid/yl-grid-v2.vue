<template>
    <el-auto-resizer>
        <template #default="{ height, width }">
            <el-table-v2 v-loading="loading" :row-height="54" :columns="columns" :data="data" :width="width"
                :height="height" fixed />
        </template>
    </el-auto-resizer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'YlGridV2',
    props: {
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
        }
    }
})
</script>
