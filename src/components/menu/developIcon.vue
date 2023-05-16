<template>
    <div class="icon-container">
        <el-tooltip placement="top" effect="light" :content="icon" v-for="icon in icons" :key="icon">
            <el-icon :class="[`el-icon-${icon}`]" @click="copyIconName(icon)" />
        </el-tooltip>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import { ElIcon, ElTooltip } from 'element-plus';

export default defineComponent({
    components: {
        ElIcon,
        ElTooltip
    },
    data() {
        return {
            icons: []
        };
    },
    created() {
        // 通过 import('element-plus/theme-chalk/icon.json') 导入图标列表数据
        // 然后将所有图标名称存储在 icons 数组中
        import('element-plus/theme-chalk/icon.json').then(iconData => {
            const { el, fa } = iconData;
            const allIcons = {
                ...el,
                ...fa
            };
            this.icons = Object.keys(allIcons);
        });
    },
    methods: {
        copyIconName(icon) {
            // 将图标名称复制到剪贴板
            navigator.clipboard.writeText(icon);
            // 弹出提示框，证明图标名称已复制到剪贴板
            this.$message({
                message: `已复制图标名称: ${icon}`,
                type: "success"
            });
        }
    }
});
</script>
  
<style>
.icon-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 20px;
}
</style>