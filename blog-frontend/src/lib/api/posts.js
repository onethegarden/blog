import client from './client';
import qs from 'qs';
//qs라이브러리로 쿼리값을 편하게 생성하고 json으로 변환 할 수 있음

export const writePost = ({ title, body, tags}) => client.post('/api/posts', {title, body, tags});

export const readPost = id => client.get(`/api/posts/${id}`);

export const listPosts = ({page, username, tag}) => {
    const queryString = qs.stringify({
        page,
        username,
        tag,
    });
    return client.get(`/api/posts?${queryString}`);
}