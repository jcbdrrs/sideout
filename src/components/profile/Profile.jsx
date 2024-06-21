import React, { useEffect, useState } from "react";
import "./Profile.css";
import { getUserById } from "../../services/UserServices.jsx";
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap';

export const Profile = ({ currentUser }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserById(currentUser.id).then((userData) => {
      const userObjData = userData[0];
      setUser(userObjData);
      console.log(userObjData);
    });
  }, [currentUser]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section className="profile wrapper-center" key={user.id}>
      <Card style={{ width: '18rem' }}>
        <img alt="Card" src={user.img} />
        <CardBody>
          <CardTitle tag="h5">{user.username}</CardTitle>
          <CardText>
            Bio:
            <div>{user.bio}</div>
          </CardText>
        </CardBody>
        <ListGroup flush>
          <ListGroupItem>
            Skill Level:
            <div>{user.skillLevel}</div>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </section>
  );
};

