// user
export const SET_USER_DATA = 'SET_USER_DATA';
export const UPDATE_USER_DATA = 'UDATE_USER_DATA';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';


//Sound
export const NEW_MESSAGE_SOUND = '/sounds/incoming_sms.mp3';
export const USER_ON_TYPING_SOUND = '/sounds/user_typing.mp3';


//Message Type
export const TYPE_TEXT = "TEXT";
export const TYPE_IMAGE = "IMAGE";

//Validation
export const PASSWORD_REGEX= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/