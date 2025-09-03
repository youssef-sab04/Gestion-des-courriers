import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from './logo-chu.png'
import { title } from '../data';
import { avatars } from '../data';
import Typewriter from "typewriter-effect"
import PersonIcon from '@mui/icons-material/Person';
import { agent_options } from '../data';
import Typeform from './typeformulaire';
import Formdepart from './formdepart';
import Formarrive from './formarrive';
import { useNavigate } from 'react-router-dom';
import avt2 from './def.png'




const Agent = () => {
    const location = useLocation();

    const [role, userid] = location.state?.infos || [];
    const [currentPage, setCurrentPage] = useState(null);


    const avatr = avatars.filter(element => element.id_user === userid);
    const avatrimg = avatr[0]?.imagesrc;
    const para = `<p></p>`;
    const handleFormSelect = (type) => {
        if (type === 'depart') {
            setCurrentPage(<Formdepart id_createur={userid} />);
        } else if (type === 'arrivee') {
            setCurrentPage(<Formarrive id_createur={userid} />);
        }
    };


    const navigate = useNavigate();




    const logout = async (e) => {

        try {
            const response = await fetch('http://localhost/Essaie/api/controllers/AuthController.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'logout'
                }),
                credentials: 'include'
            });

            const data = await response.json();
            console.log("Réponse serveur : ", data);

            if (response.ok) {
                // Naviguer seulement après confirmation du serveur
                navigate("/");
            } else {
                console.error("Erreur lors de la déconnexion");
            }
        } catch (error) {
            console.error("Erreur réseau : ", error);
            // Même en cas d'erreur, rediriger vers la page de login
            navigate("/");
        }
    }
    return (
        <div className="agent">
            <div className="top ">
                <div className="img"> <img src={logo} /> </div>
                {title.map((val, i) => (
                    <div className="title">
                        <p className='titleS'>
                            <Typewriter
                                options={{
                                    strings: [`${val.text}`],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </p>
                    </div>
                ))}

            </div>
            <div className="bottom">
                <div className="navbar">
                    <div className="info_user">
                        <div className="imguser">
                            <img src={avatrimg ? avatrimg : avt2} alt="Avatar utilisateur" />
                        </div>
                        <div className="infuser">
                            <h3> <PersonIcon className='iconn' /> {role}  </h3>
                            <h3>Id user : {userid}</h3>
                        </div>
                        <hr></hr>
                    </div>

                    <div className="navbutt">
                        {agent_options.map((val) => (
                            <button className='btn' onClick={() => {
                                if (val.id === 1) {
                                    setCurrentPage(
                                        <Typeform onFormSelect={handleFormSelect} />
                                    );
                                }
                                else if (val.id === 6) {
                                    logout();

                                }

                                else {
                                    setCurrentPage(val.component || null);
                                }
                            }} key={val.i}><i>{val.icon}</i>
                                {val.nom}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="content">
                    {currentPage}
                </div>
            </div>
        </div>
    )
}

export default Agent;