import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

//erreurs
export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

// ...

export const uploadPicture = (data, id) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}api/user/upload`, data);

            if (response.data.errors) {
                dispatch({ type: GET_USER_ERRORS, payload: response.data.errors });

                // Gérez les erreurs spécifiques ici
                if (response.data.errors[0] === "File size exceeds the limit 500ko") {
                    alert("La taille du fichier dépasse la limite de 500ko.");
                } else if (response.data.errors[0] === "Invalid file type") {
                    alert("Format de fichier invalide.");
                }
            } else {
                dispatch({ type: GET_USER_ERRORS, payload: "" }); // Réinitialisez les erreurs ici
                const userDataResponse = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${id}`);
                dispatch({ type: UPLOAD_PICTURE, payload: userDataResponse.data.picture });
            }
        } catch (error) {
            // Traitez les erreurs inattendues ici
            alert("Mauvais format ou taille de fichier supérieur à 4MB.");
        }
    };
};



export const updateBio = (userId, bio) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { bio }
        })
            .then((res) => {
                dispatch({ type: UPDATE_BIO, payload: bio })
            })
            .catch((err) => console.log(err))
    }
}

export const followUser = (followerId, idToFollow) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
            data: { idToFollow: idToFollow.toString() }, // Convertir en chaîne de caractères
        })
            .then((res) => {
                dispatch({ type: FOLLOW_USER, payload: { idToFollow } })
            })
            .catch((err) => console.log(err));
    };
};

export const unfollowUser = (followerId, idToUnfollow) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
            data: { idToUnfollow: idToUnfollow.toString() }, // Convertir en chaîne de caractères
        })
            .then((res) => {
                dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } })
            })
            .catch((err) => console.log(err));
    };
};
