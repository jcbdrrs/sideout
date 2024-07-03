import React, { useEffect, useState } from "react";
import "./Profile.css";
import { getUserById } from "../../services/UserServices.jsx";
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Profile.css"

export const Profile = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const { profileId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getUserById(profileId).then((userData) => {
      const userObjData = userData[0];
      setUser(userObjData);
      console.log(userObjData);
    });
  }, [profileId]);

  if (!user) {
    return <div>Loading...</div>;
  }



  return (
    <section className="profile wrapper-center" key={user.id}>
      <Card style={{ width: '25rem' }}>

        <img alt="Card" src={user.img} />
        <CardBody>
          <CardTitle tag="h5">{user.username}</CardTitle>
          <CardText><strong>{user.cityState}</strong></CardText>
          <CardText>
            <div>
              <strong>BIO:</strong>
            </div>
            {user.bio}
          </CardText>
        </CardBody>
        <ListGroup flush>
          <ListGroupItem>
            <div>
              <strong>SKILL LVL:</strong>
            </div>
            {user.skillLevel}
            <div>
            </div>
            {parseInt(profileId) === currentUser.id ? (
              <Link to={`/edit-profile/${currentUser.id}`}>
                Edit Profile
              </Link>
            ) : ""}
          </ListGroupItem>
        </ListGroup>

      </Card>
    </section>
  );
};

