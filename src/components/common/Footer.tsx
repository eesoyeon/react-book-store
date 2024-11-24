import logo from '../../assets/images/logo.png';
import styled from 'styled-components';

function Footer() {
    return (
        <FooterStyle>
            <h1 className="logo">
                <img src={logo} alt="book store" />
            </h1>
            <div>
                <p>copyright(c), 2024, book store.</p>
            </div>
        </FooterStyle>
    );
}

const FooterStyle = styled.header`
    width: 100%;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.layout.width.large};
    padding: 20px 0;
    border-top: 1px solid ${({ theme }) => theme.color.background};
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
        img {
            width: 140px;
        }
    }
    .copyright {
        p {
            font-size: 0.75rem;
            color: ${({ theme }) => theme.color.text};
        }
    }
`;

export default Footer;
