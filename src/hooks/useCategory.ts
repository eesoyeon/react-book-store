import { useEffect, useState } from 'react';
import { Category } from '../models/category.model';
import { fetchCategory } from '../api/category.api';

export const useCategory = () => {
    const [category, setCategory] = useState<Category[]>([]);

    // 카테고리 가져오기
    useEffect(() => {
        fetchCategory().then((category) => {
            if (!category) return;

            const categoryWithAll = [
                {
                    id: null,
                    name: '전체',
                },
                ...category,
            ];
            setCategory(categoryWithAll);
        });
    }, []);

    return { category };
};
