// import './App.css';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { GlobalStyle } from './style/global';
import { ThemeProvider } from 'styled-components';
import { dark, getTheme, light, ThemeName } from './style/theme';
import ThemeSwitcher from './components/common/Header/ThemeSwitcher';
import { useContext, useState } from 'react';
import { BookStoreThemeProvider, ThemeContext } from './context/themeContext';

function App() {
    // const { themeName, setThemeName } = useContext(ThemeContext); // 전역 상태

    // const [themeName, setThemeName] = useState<ThemeName>('light'); // 지역 상태
    return (
        <>
            <BookStoreThemeProvider>
                <ThemeSwitcher />
                <Layout>
                    <Home />
                </Layout>
            </BookStoreThemeProvider>
        </>
    );
}

export default App;
