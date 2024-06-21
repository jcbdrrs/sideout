import "./CreateProfile.css"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormGroup, Input, Label, Form, Button } from "reactstrap";
import { createNewProfile } from "../../services/ProfileServices.jsx";
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, Col } from 'reactstrap';

export const CreateProfile = ({ currentUser }) => {
    const [profile, setProfile] = useState({
        username: user.username, //  <---SHOULD THIS BE USER.USERNAME OR PROFILE.USERNAME???
        bio: user.bio,
        skillLevel: user.skillLevel,
        cityState: user.cityState,
        avatar: user.img    });
    const navigate = useNavigate();

    const handleCreateNewProfile = (event) => {
        event.preventDefault();
        if (user.id && user.username) {
            const newProfile = {
                username: user.username,
                bio: user.bio,
                skillLevel: user.skillLevel,
                cityState: user.cityState,
                avatar: user.img
            };

            createNewProfile(newProfile).then(() => {
                navigate("/profile");
            });
        } else {
            window.alert("Please fill out required fields!");
        }
    };

    return <>

        <section className="profile wrapper-center" key={profile.id}>
            <Form>
                <FormGroup row>
                    <Label for="profilePic">
                        PROFILE PIC:
                    </Label>
                    <Input
                        id="profilePic"
                        name="file"
                        type="file"
                    />
                    <Label
                        for="profile"
                        size="lg"
                        sm={2}
                    >
                        USERNAME:
                    </Label>
                    <div></div>
                    <Col sm={10}>
                        <Input
                            bsSize="rg"
                            id="name"
                            name="name"
                            placeholder="Name"
                            type="text"
                            onChange={(event) => {
                                const profileCopy = { ...profile };
                                profileCopy.location = event.target.value;
                                setProfile(profileCopy);
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label
                        for="exampleEmail2"
                        sm={2}
                    >
                        BIO:
                    </Label>
                    <div></div>
                    <Col sm={10}>
                        <Input
                            id="date"
                            name="date"
                            placeholder="150 Word Bio"
                            type="text"
                            onChange={(event) => {
                                const profileCopy = { ...profile };
                                profileCopy.date = event.target.value;
                                setProfile(profileCopy);
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label
                        for="exampleEmail2"
                        sm={2}
                    >
                        SKILL LVL:
                    </Label>
                    <div></div>
                    <Col sm={10}>
                        <Input
                            id="skillLevel"
                            name="skillLevel"
                            placeholder="Beginner | Intermediate | Pro"
                            type="text"
                            onChange={(event) => {
                                const profileCopy = { ...profile };
                                profileCopy.time = event.target.value;
                                setProfile(profileCopy);
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label
                        for="exampleEmail2"
                        sm={2}
                    >
                        CITY, STATE:
                    </Label>
                    <div></div>
                    <Col sm={10}>
                        <Input
                            id="exampleEmail2"
                            name="type"
                            placeholder="City, State"
                            type="text"
                            onChange={(event) => {
                                const profileCopy = { ...profile };
                                profileCopy.singlesOrDoublesProfile = event.target.value;
                                setProfile(profileCopy);
                            }}
                        />
                    </Col>
                </FormGroup>
                <Button onClick={handleCreateNewProfile}>
                    CREATE PROFILE
                </Button>
            </Form>
        </section>
    </>

};
