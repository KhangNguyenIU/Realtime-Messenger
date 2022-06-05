import axiosClient from "services/axiosClient";


const messageService = {
    getMessageFromChatroom(id) {
        const url = `/message/${id}`;
        return axiosClient.post(url);
    },
    getChatRoomofUser() {
        const url = '/chatroom/get-user-rooms'
        return axiosClient.get(url);
    },
    getImagesOfConversation(id) {
        const url = `/message/images/${id}`;
        return axiosClient.post(url);
    }
    ,
    test(data) {
        const url = '/test'
        return axiosClient.post(url, JSON.stringify({ data: data }))
    }
}

export default messageService;