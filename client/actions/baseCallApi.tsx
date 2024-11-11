import axios, { Method } from "axios";

export const baseApiCall = async (
    url: string,
    method: Method,
    headers?: Record<string, string>,
    body?: any,
    params?: any
) => {
    try {
        const response = await axios({
            url: process.env.NEXT_PUBLIC_API_URL + url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                ...headers,
            },
            data: body,
            params: params,
        });

        return response.data;
    } catch (error: any) {

        return error.response?.data || error.message;
    }
};
