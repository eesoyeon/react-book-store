import { styled } from 'styled-components';
import { FaSignInAlt, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCategory } from '../../hooks/useCategory';
import { useAuthStore } from '../../store/authStore';
import logo from '../../assets/images/logo.png';

const Header = () => {
    const { category } = useCategory();
    const { isLoggedIn, storeLogout } = useAuthStore();

    return (
        <HeaderStyle>
            <h1 className="logo">
                <Link to="/">
                    <img src={logo} alt="book store" />
                </Link>
            </h1>
            <nav className="category">
                <ul>
                    {category.map((item) => (
                        <li key={item.id}>
                            <Link
                                to={
                                    item.id === null
                                        ? `/books`
                                        : `/books?category_id=${item.id}`
                                }
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <nav className="auth">
                {isLoggedIn && (
                    <ul>
                        <li>
                            <Link to="/cart">장바구니</Link>
                            <Link to="/orderlist">주문 내역</Link>
                            <button onClick={storeLogout}>로그아웃</button>
                        </li>
                    </ul>
                )}
                {!isLoggedIn && (
                    <ul>
                        <li>
                            <a href="/login">
                                <FaSignInAlt />
                                로그인
                            </a>
                        </li>
                        <li>
                            <a href="/signup">
                                <FaRegUser />
                                회원가입
                            </a>
                        </li>
                    </ul>
                )}
            </nav>
        </HeaderStyle>
    );
};

const HeaderStyle = styled.header`
    width: 100%;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.layout.width.large};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid ${({ theme }) => theme.color.background};
    .logo {
        img {
            width: 200px;
        }
    }
    .category {
        ul {
            display: flex;
            gap: 32px;
            li {
                a {
                    font-size: 1.5rem;
                    font-weight: 600;
                    text-decoration: none;
                    color: ${({ theme }) => theme.color.text};

                    &:hover {
                        color: ${({ theme }) => theme.color.primary};
                    }
                }
            }
        }
    }
    .auth {
        ul {
            display: flex;
            gap: 16px;
            li {
                a {
                    font-size: 1rem;
                    font-weight: 600;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    line-height: 1;
                    background: none;
                    border: 0;
                    cursor: pointer;

                    svg {
                        margin-right: 4px;
                    }
                }
            }
        }
    }
`;

export default Header;
