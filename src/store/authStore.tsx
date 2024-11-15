import { create } from 'zustand';

interface StoreState {
    isLoggedIn: boolean;
    storeLogin: (token: string) => void;
    storeLogout: () => void;
}

// 토큰 설정
export const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
};

const setToken = (token: string) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const useAuthStore = create<StoreState>((set) => ({
    isLoggedIn: getToken() ? true : false, // 초기값
    storeLogin: (token: string) => {
        set({ isLoggedIn: true });
        setToken(token);
    },
    storeLogout: () => {
        set({ isLoggedIn: false });
        removeToken();
    }, // 액션
}));
