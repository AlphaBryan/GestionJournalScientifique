const API_URL = "http://localhost:7800";
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jYSIsInJvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoxNjcwNDYzMDI5LCJpYXQiOjE2NzA0NDUwMjl9.tEAqC464IDnagV-y7AIpT218Vds2bcq1zXQ_Yf2iKHbBZzpc9zZpd4SAGsYG6E-2aFR2txauAAkbDdjCZoUbGQ';

type Options = { noAuth: boolean };

export const post = (path: string, body: any, options?: Options) => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    if (!options || !options.noAuth) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return fetch(`${API_URL}${path}`, {
        method: 'POST',
        body: JSON.stringify(body),
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
            Authorization: `Bearer ${token}`
        }
    });
}

export const get = (path: string) => {
    return fetch(`${API_URL}${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}

export const httpDelete = (path: string) => {
    return fetch(`${API_URL}${path}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`
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