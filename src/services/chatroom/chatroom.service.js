import axiosClient from "services/axiosClient";


const chatroomService = {
    createChatroom(data){
        const url = '/chatroom/create';
        return axiosClient.post(url,JSON.stringify(data));
    },
    leaveChatroom(chatroomId){
        const url = '/chatroom/leave/'+ chatroomId;
        return axiosClient.get(url);
    },
    turnAutoDelete(chatroomId, data){
        const url = '/chatroom/turn-auto-delete/'+ chatroomId;
        return axiosClient.put(url, JSON.stringify(data));
    }
}

export default chatroomService;