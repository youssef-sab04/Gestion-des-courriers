import React , {useState , useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import logo from './logo-chuu.png'
import { title } from '../data';
import { avatars } from '../data';
import Typewriter from "typewriter-effect"
import PersonIcon from '@mui/icons-material/Person';
import { respo_options } from '../data';
import { useNavigate } from 'react-router-dom';
import avt2 from './def.png'



const Responsable = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(null);
        const navigate = useNavigate();


    const [role, userid , token] = location.state?.infos || [];
    
    
        console.log(token);
    
        useEffect(() => {
            if (localStorage.getItem("token") !== token || !localStorage.getItem("token")) {
    
                navigate("/");
                console.log("Token invalide, redirection vers la page de connexion.");
            }
            else{
                console.log("Token valide, accès autorisé.");
            }
    
    
        }, []);

    const avatr = avatars.filter(element => element.id_user === userid);
    const avatrimg = avatr[0]?.imagesrc;
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

//setCurrentPage(val.component)
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
                           <h3> <PersonIcon className='iconn'/> {role}  </h3>
                            <h3>Id user : {userid}</h3>
                        </div>
                        <hr></hr>
                    </div>

                    <div className="navbutt">
                     {respo_options.map((val)=>(
                        <button className='btn' key={val.i}
                        onClick={()=>{
                            if(val.id == 3){
                                logout();
                            }
                            else {
setCurrentPage(val.component);
                            }
                        }}
                        ><i>{val.icon}</i>
                        {val.nom}
                        </button>
                     ))}
                    </div>
                </div>
                <div className="content">
                                        {currentPage } 
                </div>
            </div>
        </div>
    )
}

export default Responsable;