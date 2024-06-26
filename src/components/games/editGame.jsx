import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGameById, updateGame } from "../../services/GamesServices.jsx";
import { Card } from "reactstrap";
import "./editGame.css"

export const EditGame = ({currentUser}) => {
    const [myGame, setMyGame] = useState({});
    const { gameId } = useParams();


    useEffect(() => {
        getGameById(gameId).then((data) => {
            const gameObj = data;

            console.log(data)
            setMyGame(gameObj);
        });
    }, [gameId]);

    const handleSave = (game) => {
        game.preventDefault();
        const editedGame = {
            location: myGame.location,
            id: gameId,
            date: myGame.date,
            time: myGame.time,
            singlesOrDoublesGame: myGame.singlesOrDoublesGame,
            userId: currentUser.id
        };
        updateGame(editedGame).then(() => {
            navigate("/games");
        });
    };



    const navigate = useNavigate();





    return (
        <div className="wrapper-center">
            <form>
                <Card style={{ width: '35rem' }}>
                    <div>
                    <h4>Edit Game</h4>
                    </div>
                    <fieldset>
                        <div className="form-title">
                        </div>
                    </fieldset>

                    <div>LOCATION:</div>

                    <fieldset>
                        <div className="form-title">
                            <input
                                text="text"
                                className="form-control"
                                placeholder={myGame.location}
                                onChange={(game) => {
                                    const gameCopy = { ...myGame };
                                    gameCopy.location = game.target.value;
                                    setMyGame(gameCopy);
                                }}
                            ></input>
                        </div>
                    </fieldset>


                    <div>DATE:</div>



                    <fieldset>
                        <div className="form-title">
                            <input
                                text="text"
                                className="form-control"
                                placeholder={myGame.date}
                                onChange={(game) => {
                                    const gameCopy = { ...myGame };
                                    gameCopy.date = game.target.value;
                                    setMyGame(gameCopy);
                                }}
                            ></input>
                        </div>
                    </fieldset>


                    <div>TIME:</div>



                    <fieldset>
                        <div className="form-title">
                            <input
                                text="text"
                                className="form-control"
                                placeholder={myGame.time}
                                onChange={(game) => {
                                    const gameCopy = { ...myGame };
                                    gameCopy.time = game.target.value;
                                    setMyGame(gameCopy);
                                }}
                            ></input>
                        </div>
                    </fieldset>


                    <div>SINGLES | DOUBLES:</div>



                    <fieldset>
                        <div className="form-title">
                            <input
                                text="text"
                                className="form-control"
                                placeholder={myGame.singlesOrDoublesGame}
                                onChange={(game) => {
                                    const gameCopy = { ...myGame };
                                    gameCopy.singlesOrDoublesGame = game.target.value;
                                    setMyGame(gameCopy);
                                }}
                            ></input>
                        </div>
                    </fieldset>
                    <fieldset className="form-group">
                        <button className="form-btn" btn-info onClick={handleSave}>
                            Save Game
                        </button>
                    </fieldset>
                </Card>
            </form>
        </div>
    );
};