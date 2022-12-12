export const API_URL = "http://localhost:7800";
type Options = { noAuth?: boolean, contentType?: string };

export const post = (path: string, body: any, options?: Options) => {
    const headers: Record<string, string> = {
        'Accept': 'application/json',
    };
    if (!options || !options.contentType) {
        headers['Content-Type'] = 'application/json';
    }
    if (!options || !options.noAuth) {
        headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }
    return fetch(`${API_URL}${path}`, {
        method: 'POST',
        body: options?.contentType === undefined ? JSON.stringify(body) : body,
        headers,
    });
}

export const put = (path: string, body: any) => {
    return fetch(`${API_URL}${path}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export const get = (path: string) => {
    return fetch(`${API_URL}${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export const httpDelete = (path: string) => {
    return fetch(`${API_URL}${path}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export const handleHttpErrors = (request: Promise<Response>) => {
    return request.then((res: Response) => {
        if (res.status >= 300) throw new Error(res.statusText);
        return res;
    })
}

export const httpJson = (request: Promise<Response>) => {
    return request.then(res => res.json());
}