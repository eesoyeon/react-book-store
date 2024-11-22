import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Book } from '../models/book.model';
import { Pagination } from '../models/pagination.model';
import { fetchBooks } from '../api/books.api';
import { QUERYSTRING } from '../constants/querystring';
import { LIMIT } from '../constants/pagination';

export const useBooks = () => {
    const location = useLocation(); // 감지

    const [books, setBooks] = useState<Book[]>([]);

    const [pagination, setPagination] = useState<Pagination>({
        totalCount: 0,
        currentPage: 1,
    });

    const [isEmpty, setIsEmpty] = useState(true);

    // api
    useEffect(() => {
        const params = new URLSearchParams(location.search);

        // console.log('params', params.get('category_id'));
        // fetchbooks에 줄 url params를 url 쿼리 스트링을 통해 넣어주자
        fetchBooks({
            category_id: params.get(QUERYSTRING.CATEGORY_ID)
                ? Number(params.get(QUERYSTRING.CATEGORY_ID))
                : undefined,
            news: params.get(QUERYSTRING.NEWS) ? true : undefined,
            currentPage: params.get(QUERYSTRING.PAGE)
                ? Number(params.get(QUERYSTRING.PAGE))
                : 1,
            limit: LIMIT,
        }).then(({ books, pagination }) => {
            setBooks(books);
            setPagination(pagination);
            setIsEmpty(books.length === 0);
        });
    }, [location.search]);

    return { books, pagination, isEmpty };
};
