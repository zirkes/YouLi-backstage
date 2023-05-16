import { defineStore } from 'pinia';

interface AdminStore {
    setAdminInfo: (value: object) => void;
    getAdminInfo: () => object | null;
}

export const useAdminStore = defineStore('admin', (): AdminStore => {

    const setAdminInfo = (value: Object): void => {
        let data = JSON.stringify(value)
        localStorage.setItem('admin', data);
    }
    const getAdminInfo = (): Object | null => {
        return localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null;
    }

    return {
        setAdminInfo,
        getAdminInfo
    }
})