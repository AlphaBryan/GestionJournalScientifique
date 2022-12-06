const API_URL = "http://localhost:7800";
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jYSIsInJvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoxNjcwMzY2MTczLCJpYXQiOjE2NzAzNDgxNzN9.MvTaque7pHaWMseFmnA5EPAkEdZms_Fkl3wh0l4vdx_tC8JMDTYxbmzODxMb74OVkVAB082pQcmSToiGjpqYOA';

export const post = (path: string, body: any) => {
    return fetch(`${API_URL}${path}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        if (res.status >= 300) throw new Error(res.statusText);
        return res;
    }).then(res => res.json());
}

export const get = (path: string) => {
    return fetch(`${API_URL}${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        if (res.status >= 300) throw new Error(res.statusText);
        return res;
    }).then(res => res.json());
}

export const httpDelete = (path: string) => {
    return fetch(`${API_URL}${path}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        if (res.status >= 300) throw new Error(res.statusText);
        return res;
    });
}