import { render } from '@testing-library/react';
import React from 'react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import BookItem from './BookItem';
import { Book } from '../../models/book.model';

const dummyBook: Book = {
    id: 1,
    title: 'Dummy Book',
    img: 5,
    category_id: 1,
    form: 'parperback',
    isbn: 'Dummy ISBN',
    summary: 'Dummy Summary',
    detail: 'Dummy Detail',
    author: 'Dummy Author',
    pages: 100,
    contents: 'Dummy Contents',
    price: 10000,
    likes: 1,
    pubDate: '2021-01-01',
};

describe('BookItem 컴포넌트 테스트', () => {
    it('렌더를 확인', () => {
        // 1 렌더
        const { getByText, getByAltText } = render(
            <BookStoreThemeProvider>
                <BookItem book={dummyBook} />
            </BookStoreThemeProvider>
        );

        // 2 확인
        expect(getByText(dummyBook.title)).toBeInTheDocument(); // 제목을 가져와서, 화면상에 있는지 확인
        expect(getByText(dummyBook.summary)).toBeInTheDocument();
        expect(getByText(dummyBook.author)).toBeInTheDocument();
        expect(getByText('10,000원')).toBeInTheDocument();
        expect(getByText(dummyBook.likes)).toBeInTheDocument();
        expect(getByAltText(dummyBook.title)).toHaveAttribute(
            'src',
            `https://picsum.photos/id/${dummyBook.img}/600/600`
        );
    });
});
