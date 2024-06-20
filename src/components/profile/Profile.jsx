import React, { useEffect, useState } from "react";
import "./Profile.css";
import { getUserById } from "../../services/UserServices.jsx";
import { Card, CardImg, CardImgOverlay, CardHeader, CardLink, CardBody, CardTitle, CardText, Button, CardFooter, ListGroup, ListGroupItem } from 'reactstrap';

export const Profile = ({ currentUser }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    
      getUserById(currentUser.id).then((userData) => {
        const userObjData = userData[0]
        setUser(userObjData);
        console.log(userObjData)
      });
    
  }, [currentUser]);

  if (!user) {
    return <div>Loading...</div>;
  }



  return <>

  
        <section key={user.id}>

          <Card
            style={{
              width: '18rem'
            }}
          >
            <img
              alt="Card"
              src="https://picsum.photos/300/200"

            />
            <CardBody>
              <CardTitle tag="h5">
                {user.id}
              </CardTitle>
              <CardText>
                {user.bio}
              </CardText>
            </CardBody>
            <ListGroup flush>
              <ListGroupItem>
                {user.skillLevel}
              </ListGroupItem>
            </ListGroup>

          </Card>

        </section>
      
     
  
  </>
}
