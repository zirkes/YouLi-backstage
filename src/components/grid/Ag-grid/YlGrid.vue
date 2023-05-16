<template>
  <div ref="agGrid" class="ag-theme-alpine" style="height: 100%;">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';

interface AgGridProps {
  columnDefs: any[];
  rowData: any[];
  gridOptions?: any;
}

export default defineComponent({
  name: 'YlGrid',
  extends: AgGridVue,    // 继承AgGridVue
  props: {
    columnDefs: {
      type: Array,
      required: true
    },
    rowData: {
      type: Array,
      required: true,
      default: () => []
    },
    // 可以在gridOptions里面添加自定义方法或者属性
    gridOptions: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props: AgGridProps, ctx) {
    const agGrid = ref<HTMLElement | null>(null);

    // 当rowData变化时，实时更新表格
    watchEffect(() => {
      if (agGrid.value) {
        agGrid.value.api.setRowData(props.rowData);
      }
    });

    ctx.expose({
      agGrid,
      ...props,
      ...ctx.attrs
    });

    return {};
  }
});
</script>
<style>
.ag-center-cols-clipper .ag-cell,
.ag-center-cols-clipper .ag-header-cell {
  display: flex;
  align-items: center;
}
</style>