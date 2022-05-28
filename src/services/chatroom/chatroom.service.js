import axiosClient from "services/axiosClient";


const chatroomService = {
    createChatroom(data){
        const url = '/chatroom/create';
        return axiosClient.post(url,JSON.stringify(data));
    }
}

export default chatroomService;