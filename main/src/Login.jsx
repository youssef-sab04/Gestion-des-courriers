import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './LogoCh.jpg'
import Orb from './blocks/Backgrounds/Orb/Orb';


const Login = () => {

    const [email, setemail] = useState('');
    const [password, setpass] = useState('');
    const [erreur, seterreur] = useState('');
    const [succes, setsucces] = useState('');


    const navigate = useNavigate();




    const loginuser = async (e) => {
        e.preventDefault();
        seterreur('');
        setsucces('');
        console.log(email);
        console.log(password);



        try {
            const response = await fetch('http://localhost/Essaie/api/controllers/AuthController.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'login',
                    email: email.trim(),
                    password: password.trim()
                }),
                credentials: 'include' // Nécessaire pour les sessions


            });

            const data = await response.json();
            console.log("Réponse serveur : ", data);
            const info = [data.role, data.user_id]

            if (response.ok) {
                setsucces(`Connecté en tant que ${data.role}`);
                setTimeout(() => {
                    if (data.role === "agent") {
                        navigate('/agent', { state: { infos: info } });
                    } else if (data.role === "responsable") {
                        navigate('/responsable', { state: { infos: info } });
                    }
                    else if (data.role === "admin") {
                        navigate('/admin', { state: { infos: info } });
                    }
                }, 1000);
                console.log("succes")
            } else {
                seterreur(data.message || "Erreur de connexion");
            }
        } catch (error) {
            seterreur("Erreur réseau : " + error.message);
            console.log("Ereur")

        }
    }

    return (
        <div className="login d-flex justify-content-center align-items-center">

            <div className='Back' >
                <Orb
                    className="orb"
                    hoverIntensity={0.5}
                    rotateOnHover={true}
                    hue={0}
                    forceHoverState={false}
                />
            </div>


            <div className="Log_Form">
                <div className="log_form ">


                    <div className="titlelogin d-flex justify-content-center align-items-center mt-5">
                        <span className="material-symbols-outlined a">account_circle</span>
                        <p className='mt-2 v'>Login</p>
                    </div>

                    <div className="formm mt-4 d-flex justify-content-center ">
                        <Form className="forma" onSubmit={loginuser} >
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-4" controlId="formemail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="email"
                                            onChange={(e) => setemail(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-4" controlId="forpass">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => setpass(e.target.value)}

                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button type="submit">
                                Se connecter
                            </Button>
                        </Form>
                    </div>


                    <div className="messageereeru mt-4 mb-3">
                        {erreur ? <Alert variant="danger">{erreur}</Alert> : null}
                        {succes && (
                            <div >
                                <Alert variant="success">{succes}</Alert>
                            </div>
                        )}
                    </div>

                </div>
                <div className='slogo-chuS'>
                    <img src={Logo} alt="Logo" className="logo-chuS" />
                </div>
            </div>

        </div>



    );

}

export default Login;