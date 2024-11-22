import { Book, BookDetail } from '../models/book.model';
import { Pagination } from '../models/pagination.model';
import { httpClient } from './http';

// 쿼리 파라미터 타입 정의
interface FetchBooksParams {
    category_id?: number;
    news?: boolean;
    currentPage?: number;
    limit: number;
}

// API 응답 타입
interface FetchBooksResponse {
    books: Book[];
    pagination: Pagination;
}

// httpClient: API 요청을 보내는 역할
// params는 쿼리 파라미터로 전달되며, axios는 이를 자동으로 URL에 추가한다
// category_id =1 이라면, GET /books?category_id=1 이렇게 요청
export const fetchBooks = async (params: FetchBooksParams) => {
    try {
        const response = await httpClient.get<FetchBooksResponse>('/books', {
            params: params,
        });

        return response.data;
    } catch (error) {
        // api 요청에 실패하면 기본값 반환
        return {
            books: [],
            pagination: {
                totalCount: 0,
                currentPage: 1,
            },
        };
    }
};

// 라우터로 받아서 bookId를 string으로
export const fetchBook = async (bookId: string) => {
    const response = await httpClient.get<BookDetail>(`/books/${bookId}`);

    return response.data;
};

// 화면에서 직접 요청해서 bookId를 number로
export const likeBook = async (bookId: number) => {
    const response = await httpClient.post(`/likes/${bookId}`);

    return response.data;
};

export const unlikeBook = async (bookId: number) => {
    const response = await httpClient.delete(`/likes/${bookId}`);

    return response.data;
};
