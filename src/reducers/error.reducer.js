import { GET_POST_ERRORS } from "../actions/post.actions";
import { GET_USER_ERRORS } from "../actions/user.actions";

const initialState = { errors: { format: "", maxSize: "", userError: "" } }; // Ajouter le champ "userError"

export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POST_ERRORS:
            return {
                errors: {
                    format: action.payload.format || "",
                    maxSize: action.payload.maxSize || "",
                    userError: state.errors.userError // Conserver la valeur actuelle de userError
                },
            };
        case GET_USER_ERRORS:
            return {
                userError: action.payload,
                format: state.errors.format, // Conserver les valeurs actuelles de format et maxSize
                maxSize: state.errors.maxSize
            }
        default:
            return state;
    }
}
