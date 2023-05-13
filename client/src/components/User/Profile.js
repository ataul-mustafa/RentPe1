import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import MetaData from "../layout/metaData";
import { createBrowserHistory } from "history";
import Header from "../layout/Header/Header";

import './Profile.css'


const Profile = () => {
    const history = createBrowserHistory();
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const profImage = user.avatar.url;

    useEffect(() => {
        if (!isAuthenticated) {
            history.push("/login");
        }
    }, [history, isAuthenticated, user])

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${user.name}'s Profile`} />
                    <Header />
                    <div className="profileContainer" >
                        <div>
                            <h1>My Profile</h1>
                            {profImage && <img src={profImage} alt={user.name} />}
                            <Link to='/me/update'>Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>"{String(user.createdAt).substr(0, 10)}"</p>
                            </div>
                            <div>
                                <Link to='/orders'>My orders</Link>
                                <Link to='/password/update'>Change Password</Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}


export default Profile;