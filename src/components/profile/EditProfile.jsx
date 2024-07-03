import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../services/UserServices.jsx";
import { Card, CardBody, CardText, ListGroup, ListGroupItem } from "reactstrap";
import { updateProfile } from "../../services/ProfileServices.jsx";

export const EditProfile = ({ currentUser }) => {
    const [myProfile, setMyProfile] = useState({});
    const { profileId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getUserById(profileId).then((data) => {
            const profileObj = data[0];

            console.log(data)
            setMyProfile(profileObj);
        });
    }, [profileId]);



    const handleSave = (profile) => {
        profile.preventDefault();
        const editedProfile = {
            id: profileId,
            username: myProfile.username,
            email: myProfile.email,
            img: myProfile.img,
            skillLevel: myProfile.skillLevel,
            bio: myProfile.bio,
            cityState: myProfile.cityState
        };
        updateProfile(editedProfile).then(() => {
            navigate(`/profile/${profileId}`);
        });
    };


    return <>
        <section className="profile wrapper-center" key={myProfile.id}>
            <Card style={{ width: '25rem' }}>

                <img alt="Card" src={myProfile.img} />
                <CardBody>
                <fieldset>
                        <div className="form-title">
                            <input
                                text="text"
                                value={myProfile.img}
                                className="form-control"
                                placeholder={"Img"}
                                onChange={(profile) => {
                                    const profileCopy = { ...myProfile };
                                    profileCopy.img = profile.target.value;
                                    setMyProfile(profileCopy);
                                }}
                            ></input>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-title">
                            <input
                                text="text"
                                value={myProfile.username}
                                className="form-control"
                                placeholder={"Username"}
                                onChange={(profile) => {
                                    const profileCopy = { ...myProfile };
                                    profileCopy.username = profile.target.value;
                                    setMyProfile(profileCopy);
                                }}
                            ></input>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-title">
                            <input
                                text="text"
                                value={myProfile.cityState}
                                className="form-control"
                                placeholder={"City, State"}
                                onChange={(profile) => {
                                    const profileCopy = { ...myProfile };
                                    profileCopy.cityState = profile.target.value;
                                    setMyProfile(profileCopy);
                                }}
                            ></input>
                        </div>
                    </fieldset>
                    <CardText>
                        {/* Bio: {myProfile.bio} */}
                    </CardText>
                    <fieldset>
                        <div className="form-title">
                            <input
                                text="text"
                                value={myProfile.bio}
                                className="form-control"
                                placeholder={"Bio"}
                                onChange={(profile) => {
                                    const profileCopy = { ...myProfile };
                                    profileCopy.bio = profile.target.value;
                                    setMyProfile(profileCopy);
                                }}
                            ></input>
                        </div>
                    </fieldset>
                </CardBody>
                <ListGroup flush>
                    <ListGroupItem>
                        {/* Skill Level: {myProfile.skillLevel} */}
                    </ListGroupItem>
                    <fieldset>
                        <div className="form-title">
                            <input
                                text="text"
                                value={myProfile.skillLevel}
                                className="form-control"
                                placeholder={"Beginner | Intermediate | Pro"}
                                onChange={(profile) => {
                                    const profileCopy = { ...myProfile };
                                    profileCopy.skillLevel = profile.target.value;
                                    setMyProfile(profileCopy);
                                }}
                            ></input>
                        </div>
                    </fieldset>
                    <fieldset className="form-group">
                        <button className="form-btn btn-info" onClick={handleSave}>
                            Save Profile
                        </button>
                    </fieldset>
                </ListGroup>
            </Card>
        </section>
    </>
};