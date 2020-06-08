import { cleanObject, toSearchParams } from './Utils';

const BASE_URL = '/api/v1';

function request<T>(uri: string, method, body?, customHeaders?): Promise<Response> {
    const timeInMs = Date.now();

    const headers = new Headers();
    headers.append("X-Operation-Id", `${uri}(${timeInMs})`);
    headers.append("Origin", window.location.origin);

    if (typeof customHeaders === 'object') {
        Object.keys(customHeaders).forEach(customHeaderKey => {
            headers.append(customHeaderKey, customHeaders[customHeaderKey]);
        });
    }

    return fetch(uri,
        {
            method,
            body,
            credentials: 'include',
            headers,
        });
}

export function apiGet(urn: string, data?): Promise<Response> {
    let tail = '';

    if (data) {
        tail = '?' + toSearchParams(cleanObject(data));
    }

    return request(`${BASE_URL}${urn}${tail}`, 'GET');
}
