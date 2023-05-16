<template>
    <div class="head-btn">
        <el-button size="small" v-for="(item, index) in tools" :key="index" :icon="item.icon" :type="item.type || 'primary'"
            :plain="item.plain || false" @click="handleClick(item.name)">{{ item.label }}</el-button>
    </div>
    <div class="head-filters">
        <el-row :gutter="16" class="filters">
            <div class="filters-item" v-for="(item, index) in filters" :key="index">
                <div>{{ item.label }}:</div><el-input size="small" class="input" v-model="item.value"
                    @keyup.native.enter="handleClick('query')"></el-input>
            </div>
        </el-row>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'GridHead',
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
        filters: Array
    },
    setup(props) {
        const handleClick = async (name: String): void => {
            try {
                if (props.actions[name]) {
                    if (name === "query") {
                        let params = props.filters?.filter(item => item.value ? item : null);
                        props.actions[name](params);
                    } else {
                        props.actions[name]();
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
        return {
            handleClick
        }
    }
})
</script>

<style lang="less">
.head-filters {
    width: 100%;
    padding: 10px;
    font-size: 14px;

    .filters {
        width: 100%;

        .filters-item {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;

            div {
                text-align: center;
                min-width: 80px;
            }

            .input {
                min-width: 166px;
            }
        }
    }
}
</style>