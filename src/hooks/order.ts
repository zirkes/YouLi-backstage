import { ref, reactive } from "vue";
import { ordersListPage } from '@/api/index';

interface Page {
    pageIndex: Number,
    pageSize: Number,
    count: Number,
    pageTotal: Number
}

export const ordersFn = () => {
    let loading = ref<Boolean>(false);
    let pageData = reactive<Page>({
        pageIndex: 1,
        pageSize: 10,
        count: 0,
        pageTotal: 0
    })
    // 头部按钮
    let tools = ref<Array<Object>>([
        { label: '查询', name: 'query', icon: 'Search' },
        { label: '刷新', name: 'reset', icon: 'Refresh' }
    ])
    // 头部按钮的对应事件
    const actions: Object = {
        query: (params) => {
            let obj = {}
            params.forEach(item => {
                obj[item.name] = item.value
            })

            getGridData({
                ...pageData,
                ...obj
            });
        }
    };
    // filters 筛选器
    const filters = ref<Array<Object>>([
        { label: "订单编号", name: 'orderNumber', value: '' },
        { label: "状态", name: 'status', value: '' }
    ])

    // 商品表格数据
    const valData = reactive({
        value: []
    })
    // 获取表格数据
    const getGridData = async (params: Object = pageData) => {
        loading.value = true;
        try {
            let { data } = await ordersListPage(params);

            pageData.pageIndex = data.pageIndex;
            pageData.pageSize = data.pageSize;
            pageData.count = data.count;

            valData.value = data.list;

        } catch (err) {
            console.log(err);
        } finally {
            loading.value = false
        }
    }
    const handleDeleteGood = (data) => {
        console.log(data);
    }
    const handleEditGood = (data) => {
        console.log(data);
    }
    const handleChangeExhibit = (data) => {
        console.log(data);
    }
    return {
        loading,
        tools,
        actions,
        valData,
        filters,
        pageData,
        handleDeleteGood,
        handleEditGood,
        handleChangeExhibit,
        getGridData
    }
}