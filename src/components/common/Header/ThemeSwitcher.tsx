import { useContext } from 'react';
// import { ThemeName } from '../../../style/theme';
import { ThemeContext } from '../../../context/themeContext';

// interface Props {
//     themeName: ThemeName;
//     setThemeName: (themeName: ThemeName) => void;
// }

function ThemeSwitcher() {
    const { themeName, toggleTheme } = useContext(ThemeContext);

    return (
        <>
            <button onClick={toggleTheme}>{themeName}</button>
        </>
    );
}

export default ThemeSwitcher;
