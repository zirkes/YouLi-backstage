<template>
    <div class="common-layout">
        <el-container class="container">
            <el-header class="header">
                <Header></Header>
            </el-header>
            <el-container class="body">
                <el-aside class="nav">
                    <Nav @getIsCollapse="handleGetIsCollapse"></Nav>
                </el-aside>
                <div class="main" :style="isCollapse ? 'max-width:calc(100vw - 64px)' : 'max-width:calc(100vw - 200px)'">
                    <Tabs>
                        <template v-slot>
                            <el-main class="content">
                                <router-view name="main" v-slot="{ Component }">
                                    <keep-alive>
                                        <Component :is="Component" />
                                    </keep-alive>
                                </router-view>
                            </el-main>
                        </template>
                    </Tabs>
                </div>
            </el-container>
        </el-container>
    </div>
</template>
  
<script lang="ts" setup>
import Nav from '@/components/menu/Nav.vue';
import Header from '@/components/menu/Header.vue';
import Tabs from '@/components/menu/Tabs.vue';
import { ref } from 'vue';

let isCollapse = ref<Boolean>();
const handleGetIsCollapse = (data: Boolean): void => {
    isCollapse.value = data;
}


</script>

<style lang="less" scoped>
@height: 80px;

.container {

    .header {
        background-color: white;
        box-shadow: 0 0 8px -4px gray;
        z-index: 1;
        height: @height;
    }

    .body {
        height: calc(100vh - @height);
        background-color: white;

        .nav {
            width: auto;
            transition: all .5s;
        }

        .main {
            flex: 1;
            display: flex;
            flex-direction: column;
            transition: all .5s;
            min-width: 1000px;

            .el-main {
                padding: 15px;
            }

            .content {
                height: 100%;
            }
        }
    }
}
</style>