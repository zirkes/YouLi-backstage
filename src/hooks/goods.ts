import { ref, reactive } from "vue";
import { goodsListPage } from '@/api/index';

type Page = {
    pageIndex: Number,
    pageSize: Number,
    count: Number,
    pageTotal: Number
}

export const goodsFn = (): Object => {
    let loading = ref<Boolean>(false);
    let pageData = reactive<Page>({
        pageIndex: 1,
        pageSize: 10,
        count: 0,
        pageTotal: 0
    })
    // 头部按钮
    let tools = ref<Object>([
        { label: '查询', name: 'query', icon: 'Search' },
        { label: '刷新', name: 'reset', icon: 'Refresh' },
        { label: '添加商品', name: 'add', icon: 'plus' },
        { label: '批量删除', name: 'deletePart', icon: 'delete', type: 'danger', plain: true },
        { label: '批量上架', name: 'upPart', icon: 'upload' },
        { label: '批量下架', name: 'downpart', icon: 'download', type: 'info', plain: true },
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
    const filters = ref<Object[]>([
        { label: "商品名称", name: 'name', value: '' },
        { label: "状态", name: 'status', value: '' },
        { label: "首页展示", name: 'exhibit', value: '' },
    ])

    // 商品表格数据
    const valData = reactive<Object>({
        value: []
    })
    // 获取表格数据
    const getGridData = async (params: Object = pageData) => {
        loading.value = true;
        try {
            // console.log(params);

            let { data } = await goodsListPage(params);

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