import React from 'react';
import styled from 'styled-components';
import { useCategory } from '../../hooks/useCategory';
import Button from '../common/Button';
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '../../constants/querystring';

const BooksFilter = () => {
    // 상태
    // 1. 카테고리
    // 2. 신간 여부 true, false
    // -> 쿼리 스트링 (재사용성, 상태 공유, 유니크값)

    const { category } = useCategory();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleCategory = (id: number | null) => {
        const newSearchParams = new URLSearchParams(searchParams);

        // category_id 스트링 상수화 하기
        if (id === null) {
            newSearchParams.delete(QUERYSTRING.CATEGORY_ID); // null 이면 제거?
        } else {
            newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString()); // 새로 생성
        }

        // 실질적으로 업데이트
        setSearchParams(newSearchParams);
    };

    // const currentCategory = searchParams.get('category_id');

    const handleNews = () => {
        const newSearchParams = new URLSearchParams(searchParams);

        if (newSearchParams.get(QUERYSTRING.NEWS)) {
            newSearchParams.delete(QUERYSTRING.NEWS);
        } else {
            newSearchParams.set(QUERYSTRING.NEWS, 'true');
        }
        setSearchParams(newSearchParams);
    };

    return (
        <BooksFilterStyle>
            <div className="category">
                {category.map((item) => (
                    <Button
                        size="medium"
                        scheme={item.isActive ? 'primary' : 'normal'}
                        key={item.id}
                        onClick={() => handleCategory(item.id)}
                    >
                        {item.name}
                    </Button>
                ))}
            </div>
            <div className="new">
                <Button
                    size="medium"
                    scheme={searchParams.get('news') ? 'primary' : 'normal'}
                    onClick={() => handleNews()}
                >
                    신간
                </Button>
            </div>
        </BooksFilterStyle>
    );
};

const BooksFilterStyle = styled.div`
    display: flex;
    gap: 24px;

    .category {
        display: flex;
        gap: 8px;
    }
`;

export default BooksFilter;
