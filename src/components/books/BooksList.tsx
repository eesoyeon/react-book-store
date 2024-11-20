import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookItem from './BookItem';
import { Book } from '../../models/book.model';
import { useLocation } from 'react-router-dom';
import { QUERYSTRING } from '../../constants/querystring';
import { ViewMode } from './BooksViewSwitcher';

// const dummyBook: Book = {
//     id: 1,
//     title: 'Dummy Book',
//     img: 5,
//     category_id: 1,
//     form: 'parperback',
//     isbn: 'Dummy ISBN',
//     summary: 'Dummy Summary',
//     detail: 'Dummy Detail',
//     author: 'Dummy Author',
//     pages: 100,
//     contents: 'Dummy Contents',
//     price: 10000,
//     likes: 1,
//     pubDate: '2021-01-01',
// };

interface Props {
    books: Book[];
}

const BooksList = ({ books }: Props) => {
    const [view, setView] = useState<ViewMode>('grid');
    // location.search에서 그리드 정보 가져옴
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if (params.get(QUERYSTRING.VIEW)) {
            setView(params.get(QUERYSTRING.VIEW) as ViewMode);
        }
    }, [location.search]);

    return (
        <BooksListStyle view={view}>
            {/* <BookItem book={dummyBook} /> */}
            {books?.map((item) => (
                <BookItem key={item.id} book={item} view={view} />
            ))}
        </BooksListStyle>
    );
};

interface BooksListStyleProps {
    view: ViewMode;
}

const BooksListStyle = styled.div<BooksListStyleProps>`
    display: grid;
    grid-template-columns: ${({ view }) =>
        view === 'grid' ? 'repeat(4, 1fr)' : 'repeat(1, 1fr)'};
    gap: 24px;
`;

export default BooksList;
