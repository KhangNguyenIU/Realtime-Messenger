import authService from "services/auth/auth.service";

export const isAuthenticated = async () => {
    return new Promise((resolve, reject) => {
        authService.getAuthUser().then(response => {
            if(response.status ===200 && response?.data?.user ){
                resolve(true)
            }
        }
        ).catch(error => {
            reject(false);
        })
    })
}
export const handleUnauthorizedResponse = (response, redirect) => {
    if (response.status === 401) {
        return redirect();
    }

};

export const handleCommonResponse = (response, options = {}) => {
    if (!response) { return; }
    const { onRedirect = () => { }, onError = () => { }, onSuccess = () => { } } = options;

    handleCommonResponse(response, onRedirect);

    const { data } = response;

    if (data?.error) {
        if (onError) { onError(response); }
        return { error: data.error };
    }

    if (onSuccess && response.status === 200) { onSuccess(data); }

    return data;
};
