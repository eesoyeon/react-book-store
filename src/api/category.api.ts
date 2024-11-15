import { Category } from '../models/category.model';
import { httpClient } from './http';

export const fetchCategory = async () => {
    const response = await httpClient.get<Category[]>('/category'); // 정보를 가져옴, 카테고리 모델을 응답 타입으로 설정

    return response.data;
};
