import { ref, reactive } from 'vue';
import { useAdminStore } from '@/stores/admin';
import { deleteCookie } from "@/utils/cookie";
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'

export const adminFn = (): Object => {
    const adminStore = useAdminStore();
    let adminInfo = reactive<Object>({});
    adminInfo = adminStore.getAdminInfo();

    const router = useRouter();

    let tools = ref<object[]>([
        { name: 1, label: "退出登录" }
    ])

    const handleSelectedDrop = async (name: Number): Promise<void> => {
        try {
            if (name === 1) {
                await ElMessageBox.confirm(
                    '确认要退出账号吗?',
                    '消息提示！',
                    {
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                    }
                )
                ElMessage({
                    type: 'success',
                    message: '操作成功！',
                })
                deleteCookie("Token");
                router.replace({ name: "Login" });
            }
        } catch (err) {
            ElMessage({
                type: 'info',
                message: "已取消退出",
            })
        }
    }

    return {
        adminInfo,
        tools,
        handleSelectedDrop
    }
}

