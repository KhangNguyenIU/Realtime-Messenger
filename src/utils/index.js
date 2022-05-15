import authService from "services/auth/auth.service";

export const isAuthenticated = async () => {
    try {
        const response = await authService.getAuthUser();
        if (response?.data) {
            return true
        }
    } catch (error) {
        return false
    }
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


export const addObjectToUniqueArray = (array, object, isTyping) => {
    let index = array.findIndex(item => item._id === object._id);
    if(index === -1 && isTyping){
        array.push(object);
    }
    if(index !== -1 && !isTyping){
        array.splice(index, 1);
    }
    return array
}

export const removeObjectFromUniqueArray = (array, object) => {
    let index = array.findIndex(item => item._id === object._id);
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array;
}