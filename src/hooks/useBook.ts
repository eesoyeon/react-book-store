import { useEffect, useState } from 'react';
import { BookDetail } from '../models/book.model';
import { fetchBook, likeBook, unlikeBook } from '../api/books.api';
import { useAuthStore } from '../store/authStore';
import { useAlert } from './useAlert';
import { addCart } from '../api/carts.api';

export const useBook = (bookId: string | undefined) => {
    // 책 상세 정보 가져오기
    const [book, setBook] = useState<BookDetail | null>(null);
    const { isLoggedIn } = useAuthStore();
    const { showAlert } = useAlert();
    const [cartAdded, setCartAdded] = useState(false);

    // 좋아요 버튼
    const likeToggle = () => {
        // 권한 확인
        if (!isLoggedIn) {
            showAlert('로그인이 필요합니다.');
            return;
        }
        if (!book) return;

        const previousBook = { ...book };
        if (book.liked) {
            // 라이크 상태 => 언라이크 실행
            setBook({
                ...book,
                liked: false,
                likes: book.likes - 1,
            });
            unlikeBook(book.id).catch(() => {
                setBook(previousBook);
                showAlert('좋아요 취소에 실패했습니다.');
            });
        } else {
            // 언라이크 상태 => 라이크 실행
            // 성공 처리
            setBook({
                ...book,
                liked: true,
                likes: book.likes + 1, //낙관적 업데이트???
            });
            likeBook(book.id).catch(() => {
                // 요청 실패 시 복원
                setBook(previousBook);
                showAlert('좋아요에 실패했습니다.');
            });
        }
    };

    const addToCart = (quantity: number) => {
        if (!book) return;

        addCart({
            book_id: book.id,
            quantity: quantity,
        }).then(() => {
            // showAlert('장바구니에 추가되었습니다.');
            // 장바구니로 이동
            setCartAdded(true);
            setTimeout(() => {
                setCartAdded(false);
            }, 3000);
        });
    };

    useEffect(() => {
        if (!bookId) return;

        fetchBook(bookId).then((book) => {
            setBook(book);
        });
    }, [bookId]);

    return { book, likeToggle, addToCart, cartAdded };
};
