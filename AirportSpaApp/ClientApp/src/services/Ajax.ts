import { cleanObject, toSearchParams } from './Utils';

const BASE_URL = '/api/v1';

export function apiGet<T>(urn: string, data?): Promise<T> {
    let tail = '';

    if (data) {
        tail = '?' + toSearchParams(cleanObject(data));
    }

    const url = `${BASE_URL}/${urn}${tail}`;

    const method = 'GET';

    return fetch(url,
        {
            method,
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok)
                throw new Error(response.statusText);

            return response.json();
        });
}
