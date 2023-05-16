import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

export const useRouterStore = defineStore('router', (): Object => {
    // 左侧菜单栏属性
    const routerList = ref([
        {
            name: 'homeIndex',
            label: '首页',
            icon: 'HomeFilled',
            path: '/home/index',
        },
        {
            name: 'goods',
            label: '商品管理',
            icon: 'GoodsFilled',
            path: '/home/goods',
            children: [
                {
                    name: 'goodsList',
                    label: '商品列表',
                    path: '/home/goods/list'
                }
            ]
        },
        {
            name: 'orders',
            label: '订单管理',
            icon: 'List',
            path: '/home/orders'
        },
        {
            name: 'users',
            label: '用户管理',
            icon: 'UserFilled',
            path: '/home/users'
        }
    ]);
    // 顶部tab栏属性
    let tabIndex = ref<Number>(1);
    let editableTabsValue = reactive<Object>({
        name: 'homeIndex',
        path: 'home/index'
    });
    let editableTabs = ref<Object[]>([
        {
            title: '首页',
            name: 'homeIndex',
            path: '/home/index'
        }
    ])
    // 根据左侧导航添加顶部Tab栏
    const addTab = (route: string): void => {
        try {
            let flag = editableTabs.value.some((item): Boolean => {
                return item.name === route.name
            })
            if (route.name !== 'homeIndex' && !flag) {
                editableTabs.value.push({
                    title: route.label,
                    name: route.name,
                    path: route.path
                })
                ++tabIndex.value;
                editableTabsValue.name = route.name;
                editableTabsValue.path = route.path;
            } else if (flag) {
                editableTabsValue.name = route.name;
                editableTabsValue.path = route.path;
            }
        } catch (err) {
            console.log(err);
        }
    }
    let router = useRouter();
    // 移除顶部Tab栏
    const removeTab = (targetName: string): void => {
        for (let i = 0; i < editableTabs.value.length; i++) {
            if (editableTabs.value[i].name === targetName) {
                editableTabsValue.name = editableTabs.value[i + 1] ? editableTabs.value[i + 1].name : editableTabs.value[i - 1].name;
                editableTabsValue.path = editableTabs.value[i + 1] ? editableTabs.value[i + 1].path : editableTabs.value[i - 1].path;
                router.push({ path: editableTabsValue.path })
                editableTabs.value.splice(i, 1);
                tabIndex.value--;
            }
        }
    }
    // 点击顶部Tab栏选取Tabs栏激活状态属性值, 顶部和左侧的激活状态需要根据editableTabsValue的值
    const setEditableTabsValue = (val): void => {
        for (let i = 0; i < editableTabs.value.length; i++) {
            if (val === editableTabs.value[i].name) {
                editableTabsValue.name = editableTabs.value[i].name;
                editableTabsValue.path = editableTabs.value[i].path;
                break;
            }
        }
    }
    return {
        routerList,
        tabIndex,
        editableTabsValue,
        editableTabs,
        addTab,
        removeTab,
        setEditableTabsValue
    }
})