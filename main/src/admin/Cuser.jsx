import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { divisions } from '../data';
import { sections } from '../data';
import { hopitaux } from '../data';
import { services } from '../data';
import React, { useState, useEffect } from 'react';
const C_user = () => {

    const [non, setNon] = useState("");
    const [Prenon, setPreNon] = useState("");
    const [email, setEmail] = useState("");
    const [Pass, setPass] = useState("");
    const [Unite_i, setUnite_i] = useState("");
    const [Service, setService] = useState("");
    const [Role, setRole] = useState("");
    const [ id_s , setIds] =  useState("");
    const [succes , setSucces] =  useState("");
    const [erreur , setErreur] =  useState("");


    
    //    const genererId = (prefixe) => `${prefixe}${Math.floor(Math.random() * 900 + 100)}`;

  const genererIdUnique = (prefixe) => {
    let id;
    let existe;

/*
.some() : Méthode JavaScript qui :
Parcourt le tableau
S'arrête dès qu'un élément correspond au test
Retourne true si au moins un élément passe le test, false sinon
*/
    do {
        id = `${prefixe}${Math.floor(Math.random() * 900 + 100)}`;
        existe = id_s.some(ref => ref.id_user === id);
    } while (existe);

    return id ;
}

    useEffect(() => {
        const fetchIds = async () => {
            try {
                const response = await fetch(
                    'http://localhost/ESSAIE/api/controllers/CourrierController.php?action=ids'
                );
                const data = await response.json();
                // console.log("IDs récupérés:", data); // Pour le débogage
                setIds(data);
                console.log("IDs :", data);

            } catch (error) {
                console.error("Erreur:", error);
            }
        };
        fetchIds();
    }, []);

    const Reset = ()=>{
        setNon("");
    setPreNon("");
    setEmail("");
    setPass("");
    setUnite_i("");
    setService("");
    setRole("");


    }

    const creer = async (e) => {

        e.preventDefault();

        console.log("Valeurs du formulaire:", {
            non,
            Prenon,
            email,
            Pass,
            Unite_i,
            Service,
            Role
        });

        // Validation strictement comme demandé
        if (!non || !Prenon || !email || !Pass || !Unite_i || !Service || !Role) {
            const erreurMessage = `Champs manquants:   ${!non ? 'Nom  ' : ''
                }${!Prenon ? ' Prénom  ' : ''
                }${!email ? ' Email  ' : ''
                }${!Pass ? ' Mot de passe  ' : ''
                }${!Unite_i ? ' Unité ' : ''
                }${!Service ? ' Service  ' : ''
                }${!Role ? 'Role  ' : ''
                }`;

                            setErreur(erreurMessage)


            return;
        }
        const id_us = genererIdUnique(Role);
        const formData = new FormData();
        formData.append('nom', non);
        formData.append('prenom', Prenon);
        formData.append('email', email);
        formData.append('password', Pass);
        formData.append('unite', Unite_i);
        formData.append('service', Service);
        formData.append('role', Role);
        formData.append('method', "creation_user");
        formData.append('id', id_us);







            try {
                const response = await fetch('http://localhost/ESSAIE/api/controllers/CourrierController.php', {
                    method: 'POST',
                    body: formData
                });
        
                if (!response.ok) throw new Error( "Erreur  du serveur");
                const result = await response.json();
                setSucces( result.message || "Succes");
                setErreur("")
                //Reset();
                
        
            } catch (error) {
                setErreur(error.message || "Erreur lors de l'envoi du courrier");
                setSucces("") 
                console.log("erreur");
            } 

    }





    return (
        <div className="formdeprt d-flex justify-content-center align-items-center">
            <Form className='fd'>
                <p className="titledepart">Formulaire de creation d'un utilisateur :  </p>
                <Row className="align-items-center ">
                    <Col md={12}>
                        <Form.Group as={Row} className="mb-4 vide" controlId="fornom">
                            <Form.Label column md={4}>Non:</Form.Label>
                            <Col md={6}>
                                <Form.Control
                                    type="text"
                                    value={non}
                                    onChange={(e) => setNon(e.target.value)}


                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="align-items-center ">
                    <Col md={12}>
                        <Form.Group as={Row} className="mb-4 vide" controlId="forPnom">
                            <Form.Label column md={4}>Prenon:</Form.Label>
                            <Col md={6}>
                                <Form.Control
                                    type="text"
                                    value={Prenon}
                                    onChange={(e) => setPreNon(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="align-items-center ">
                    <Col md={12}>
                        <Form.Group as={Row} className="mb-4 vide" controlId="forEmom">
                            <Form.Label column md={4}>Email:</Form.Label>
                            <Col md={6}>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="align-items-center ">
                    <Col md={12}>
                        <Form.Group as={Row} className="mb-4 vide" controlId="forPass">
                            <Form.Label column md={4}>Password:</Form.Label>
                            <Col md={6}>
                                <Form.Control
                                    type="texte"
                                    value={Pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    placeholder=''

                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>

                <Row >
                    <Col md={12}>
                        <Form.Group as={Row} controlId="formUnit">
                            <Form.Label column md={4}>Unite interne:</Form.Label>
                            <Col md={8}>
                                <Form.Control as="select"
                                    onChange={(e) => setUnite_i(e.target.value)}
                                    value={Unite_i}

                                >
                                    <option selected disabled value="">-- Choisissez --</option>
                                    <optgroup label="Divisions:">
                                        {divisions.map((val) => (
                                            <option key={val.id} value={val.id}>{val.desc}</option>

                                        ))}

                                    </optgroup>
                                    <optgroup label="Sections">
                                        {sections.map((val) => (
                                            <option key={val.id} value={val.id}>{val.desc}</option>

                                        ))}
                                    </optgroup>


                                    <optgroup label="Hopitaux">
                                        {hopitaux.map((val) => (
                                            <option key={val.id} value={val.id}>{val.desc}</option>

                                        ))}

                                    </optgroup>

                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className='mt-4' >
                    <Col md={12}>
                        <Form.Group as={Row} controlId="formServ">
                            <Form.Label column md={4}>Service: </Form.Label>
                            <Col md={8}>
                                <Form.Control as="select"
                                    onChange={(e) => setService(e.target.value)}
                                    value={Service}

                                >
                                    <option selected disabled value="">-- Choisissez --</option>
                                    <optgroup label="Services:">
                                        {services.map((val) => (
                                            <option key={val.id} value={val.desc}>{val.desc}</option>

                                        ))}

                                    </optgroup>

                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className='mt-4' >
                    <Col md={12}>
                        <Form.Group as={Row} controlId="forR">
                            <Form.Label column md={4}>Role: </Form.Label>
                            <Col md={8}>
                                <Form.Control as="select"
                                    onChange={(e) => setRole(e.target.value)}
                                    value={Role}

                                >
                                    <option selected disabled value="">-- Choisissez --</option>
                                    <optgroup label="Services:">

                                        <option value="A" >Agent </option>
                                        <option value="R" >Responsable </option>




                                    </optgroup>

                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className='mt-4'>  {erreur && <Alert variant="danger">{erreur}</Alert>}</Row>
                <Row className='mt-4'>  {succes && <Alert variant="success">{succes}</Alert>}</Row>

                <Row className="depbut mt-4" >
                    <Col md={10}>
                        <Button md={4} type="submit" onClick={creer}>
                            Creer
                        </Button>
                        <Button md={4} >
                            Renitialiser
                        </Button>


                    </Col>
                </Row>

            </Form>

        </div>
    );
};

export default C_user;