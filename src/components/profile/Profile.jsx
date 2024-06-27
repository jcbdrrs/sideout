import React, { useEffect, useState } from "react";
import "./Profile.css";
import { getUserById } from "../../services/UserServices.jsx";
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";

export const Profile = ({ currentUser }) => {
  const [user, setUser] = useState({});

const navigate = useNavigate()

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


// STILL NEED TO ADD CITYSTATE TO PROFILE <---------------------


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
                    <Button
                        onClick={() => navigate(`/edit-profile/${currentUser.id}`)}

                    >
                        Edit
                    </Button>
          <ListGroupItem>
          <div>
          <strong>SKILL LVL:</strong>
          </div> 
          {user.skillLevel}
          </ListGroupItem>
        </ListGroup>
        
      </Card>
    </section>
  );
};

