import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from './Utils';
import { followUser, unfollowUser } from '../actions/user.actions';

const FollowHandler = ({ idToFollow, type }) => {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow.toString()));
        setIsFollowed(true);
    };

    const handleUnfollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow.toString()));
        setIsFollowed(false);
    };

    useEffect(() => {
        console.log('userData:', userData);
        console.log('idToFollow:', idToFollow);

        if (!isEmpty(userData.following)) {
            const isAnyFollowed = Array.isArray(idToFollow) && idToFollow.some((id) => userData.following.includes(id));
            setIsFollowed(isAnyFollowed);
        } else {
            setIsFollowed(false);
        }

        console.log('isFollowed:', isFollowed);

    }, [userData, idToFollow, isFollowed]);

    return (
        <>
            {isFollowed && !isEmpty(userData) && (
                <span onClick={handleUnfollow}>
                    {type === "suggestion" && <button className="unfollow-btn">Abonné</button>}
                    {type === "card" && <img src="./img/icons/checked.svg" alt='checked' />}
                </span>
            )}
            {isFollowed === false && !isEmpty(userData) && (
                <span onClick={handleFollow}>
                    {type === "suggestion" && <button className="follow-btn">Suivre</button>}
                    {type === "card" && <img src="./img/icons/check.svg" alt='check' />}
                </span>
            )}
        </>
    );
};

export default FollowHandler;
