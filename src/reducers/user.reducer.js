import { FOLLOW_USER, GET_USER, UNFOLLOW_USER, UPDATE_BIO, UPLOAD_PICTURE } from "../actions/user.actions";

const initialState = {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload,
            };
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload
            }
        case FOLLOW_USER:
            return {
                ...state,
                following: [...state.following, action.payload.idToFollow.toString()],
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                following: state.following.filter((id) => id !== action.payload.idToUnfollow.toString()),
            };

        default:
            return state;
    }
};



export default userReducer;
