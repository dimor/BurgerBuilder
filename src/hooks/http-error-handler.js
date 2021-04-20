import { useEffect, useState } from 'react';


// eslint-disable-next-line import/no-anonymous-default-export
export default httpClient  => {

    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    }, error => error);
    const resInterceptor = httpClient.interceptors.response.use(res => res, error => {
        setError(error);
        return Promise.reject(error);
    });


    useEffect(() => {
        return () => {
            
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        }
    }, [httpClient.interceptors.request, httpClient.interceptors.response, reqInterceptor, resInterceptor]);



    const errorConfirmedHandler = () => {
        setError(null);
    }

    return [error, errorConfirmedHandler]
}