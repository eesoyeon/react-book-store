// import './App.css';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ThemeSwitcher from './components/common/Header/ThemeSwitcher';
import { BookStoreThemeProvider } from './context/themeContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './components/common/Error';
import SingUp from './pages/SingUp';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Layout>
                <Home />
            </Layout>
        ),
        errorElement: <Error />, // 루트가 잘못됐을 경우 에러 페이지
    },
    {
        path: '/books',
        element: (
            <Layout>
                <div>도서 목록</div>
            </Layout>
        ),
    },
    {
        path: '/signup',
        element: (
            <Layout>
                <SingUp />
            </Layout>
        ),
    },
    {
        path: '/reset',
        element: (
            <Layout>
                <ResetPassword />
            </Layout>
        ),
    },
    {
        path: '/login',
        element: (
            <Layout>
                <Login />
            </Layout>
        ),
    },
]);

function App() {
    return (
        <BookStoreThemeProvider>
            <ThemeSwitcher />
            <RouterProvider router={router} />
        </BookStoreThemeProvider>
    );
}

export default App;
