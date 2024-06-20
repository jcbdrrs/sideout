import { useState } from "react";
// import { createNewEvent } from "../../services/eventService.jsx";
import { useNavigate } from "react-router-dom";
// import "./NewEvent.css"




export const CreateGame = ({ currentUser }) => {

    const [createGame, setCreateGame] = useState({
        name: "",
        eventDate: "",
        location: ""
    });

    const navigate = useNavigate();

    const handleSave = (saveGame) => {
        saveGame.gameDefault();

        const gameToDatabase = {
            name: createGame.name,
            userId: currentUser.id,
            gameDate: createGame.gameDate,
            location: createGame.location
        }

        CreateGame(gameToDatabase).then(() => {
            navigate("/games");

        })

    }

    return (
        <input class="form-control form-control-lg" type="text" placeholder=".form-control-lg">
            <input class="form-control" type="text" placeholder="Default input">
                <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm"></input>
                )


        <div className="create-game" >
             < form className="gameform" >
                 <h2>New Game</h2>
                 <fieldset className="gamefieldset">
                     <input className="gameinput" }
                       type="text" }
                         placeholder="Name" }
                         onChange={(changeGame) => { }
                             const gameCopy = { ...createGame };
                             gameCopy.name = changeGame.target.value;
                             setCreateGame(gameCopy);
                         }}
                     />
                 </fieldset>
                 <fieldset className="gamefieldset">
                     <input className="gameinput"
                         type="text"
                         placeholder="Location"
                         onChange={(changeGame) => {
                             const gameCopy = { ...createGame };
                             gameCopy.location = changeGame.target.value;
                             setCreateGame(gameCopy);
                         }}
                     />
                 </fieldset>
                 <fieldset className="gamefieldset">
                     <input className="gameinput"
                         type="date"
                         placeholder="Game Date"
                         onChange={(changeGame) => {
                             const gameCopy = { ...createGame };
                             gameCopy.gameDate = changeGame.target.value;
                             setCreateGame(gameCopy);
                         }}
                     />
                 </fieldset>
                 <fieldset className="gamefieldset">
                     <div>
                         <button className="gamebutton" onClick={handleSave}>Save Game</button>
                     </div>
                 </fieldset>
             </form >
         </div >

     );
  };