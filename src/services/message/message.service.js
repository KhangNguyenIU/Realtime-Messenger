import axiosClient from "services/axiosClient";


const messageService = {
    getMessageFromChatroom(id){
        const url = `/message/${id}`;
        return axiosClient.post(url);
    },
    getChatRoomofUser(){
        const url ='/chatroom/get-user-rooms'
        return axiosClient.get(url);
    }
}

export default messageService;