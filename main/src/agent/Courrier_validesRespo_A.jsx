import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { divisions } from '../data';
import { sections } from '../data';
import { hopitaux } from '../data';
import { unites_ex } from '../data';
import React, { useState, useEffect, useRef, use } from 'react';

const Cou_VR_A = ({ courrier_numero }) => {


    const tab_emetteurs = [...hopitaux, ...sections, ...divisions, ...unites_ex];
    const [courrierData, setCourrierData] = useState(null);
    const [emetteur, setEmetteur] = useState(null);
    const [destinataires, setDestinataires] = useState([]);
    const [DesI, setDesI] = useState([]);
    const [DesE, setDesEx] = useState([]);
    const[success , setSucees] = useState("");
    

     const [DesIDesc, setDesIDesc] = useState([]);
    const [DesEDesc, setDesExDesc] = useState([]);

  




    const [error, setError] = useState(null);


    const [message, setMessage] = useState(null);
    const submitButtonRef = useRef(null);



    const DestinatireiRef = useRef(null);
    const DestinatirexRef = useRef(null);
    const AnnotationRef = useRef(null);



    const handleOpenPdf = (num) => {
        // Solution pour contourner les restrictions CORS
        const pdfUrl = `http://localhost/Essaie/api/telecharger.php?num=${num}`;

        // Ouverture dans un nouvel onglet
        window.open(pdfUrl, '_blank');
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!courrier_numero) return;

                const response = await fetch(`http://localhost/ESSAIE/api/controllers/CourrierController.php?action=courrier_affichesA&num=${courrier_numero}`);

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const result = await response.json();

                if (!result.success) {
                    throw new Error(result.error || 'Erreur serveur');
                }


                setCourrierData(result.data);


                // Trouver la description de l'émetteur 

                if (result.data.emetteur) {
                    const foundEmetteur = tab_emetteurs.find(e => e.id == result.data.emetteur);
                    setEmetteur(foundEmetteur?.desc || '');
                }

                // Mettre à jour les destinataires

                setDestinataires(result.data.destinataires || []);
                console.log(result.data.destinataires.length);

                const DesI = destinataires.filter(dest =>
                    dest?.id_interne !== null  ?? false
                );

                

                const DesE = destinataires.filter(dest =>
                    (dest?.id_externe !== null ?? false )
                );

               
                
              //  setDesI(DesI);
                //setDesEx(DesE);

                 // 2. Trouver les descriptions (version optimisée)
            const newDesIN = [];
            const newDesEN = [];
            
            // Utilisation de for...of au lieu de for-i pour meilleure lisibilité
            for (const dest of DesI) {
                const found = tab_emetteurs.find(e => e.id == dest.id_interne);
                if (found) newDesIN.push(found.desc);
            }
            
            for (const dest of DesE) {
                const found = unites_ex.find(e => e.id == dest.id_externe);
                if (found) newDesEN.push(found.desc);
            }
            
            setDesIDesc(newDesIN);
            setDesExDesc(newDesEN);

          

    
            } catch (err) {
                console.error('Erreur:', err);
                setError(err.message);
            }
        };

        fetchData();
    }, [courrier_numero, tab_emetteurs]);



    const ValiderForm =  async (e) =>{
        e.preventDefault();
         const button = e.currentTarget;
        


         const updatePayload = {
                num_courrier: courrier_numero,
                statut: "Diffuse_valide"
            };

                try {
        const response = await fetch('http://localhost/ESSAIE/api/controllers/CourrierController.php', {
            method: 'PUT',
             headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatePayload)
        });

        if (!response.ok) throw new Error("Erreur serveur");
        const result = await response.json();
        alert(result.message || "Succès");
        setMessage("Courrier diffuse par succès ")
        button.disabled = true;

        

    } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);
        console.log("erreur");
        alert(error.message)
        
    }
    };


















    return (
        <div className="formdeprt d-flex justify-content-center align-items-center">

            <Form className='fd'>
                <p>Courrier de numero : {courrier_numero}</p>
                <Row className="align-items-center ">
                    <Col md={12}>
                        <Form.Group as={Row} className="mb-4" >
                            <Form.Label column md={4}>Numero de courrier:</Form.Label>
                            <Col md={6}>
                                <Form.Control
                                    type="text"
                                    placeholder="Numero de courrier"
                                    disabled
                                    value={courrierData?.num_courrier || ''}


                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group as={Row} className="mb-4" controlId="formDateCourrier">
                            <Form.Label column md={4}>Date de courrier:</Form.Label>
                            <Col md={6}>
                                <Form.Control
                                    type="date"
                                    placeholder="Date de courrier"
                                    disabled
                                    value={courrierData?.date_courrier || ''}

                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <Form.Group as={Row} className="mb-4" controlId="formObjet">
                            <Form.Label column md={4}>Objet:</Form.Label>
                            <Col md={7}>
                                <Form.Control
                                    type="texte"
                                    placeholder="Objet"
                                    disabled
                                    value={courrierData?.objet || ''}

                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>

                <Button
                    variant="primary"
                    onClick={() => handleOpenPdf(courrier_numero)}
                    className="me-2"
                >
                    Ouvrir le PDF
                </Button>


                <Row>
                    <Col md={12} className='mt-4'>
                        <Form.Group as={Row} className="mb-4" controlId="formEmetteur">
                            <Form.Label column md={4}>Emetteur:</Form.Label>
                            <Col md={6}>
                                <Form.Control
                                    placeholder="Emetteur"
                                   
                                    disabled
                                    value={emetteur || ''}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>

                                <Row>
                    <Col md={12} className='mt-4'>
                        <Form.Group as={Row} className="mb-4" >
                            <Form.Label column md={4}>Recepteur internes</Form.Label>
                            <Col md={6}>
                                <Form.Control
                                   as ="textarea"
                                    placeholder=""
                                    disabled
                                   className='texarea'
                                    value={DesIDesc.join('\n') || ''}
                                    
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
<Row>
                <Col md={12} className='mt-4'>
                        <Form.Group as={Row} className="mb-4" >
                            <Form.Label column md={4}>Recepteur Externes</Form.Label>
                            <Col md={6}>
                                <Form.Control
                                   as ="textarea"
                                    placeholder=""
                                    disabled
                                   className='texarea'
                                    value={DesEDesc.join('\n') || ''}
                                    
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>





               <Row>
                    <Col md={12} className='mt-4'>
                        <Form.Group as={Row} className="mb-4" controlId="formObjet">
                            <Form.Label column md={4}>Annotations :</Form.Label>
                            <Col md={7}>
                                <Form.Control
                                    type="text2"
                                    
                                    onChange={(e) => setAnnotations(e.target.value)}
                                    ref={AnnotationRef}
                                    value={courrierData?.annotation || ''}
                                    disabled
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>


                <Row className="depbut mt-4" >
                    <Col md={10}>
                        <Button md={4} className='btn-success' type="submit" ref={submitButtonRef} 
                            onClick={ValiderForm}>
                            Diffuser
                        </Button>


                        <Button md={4} type="reset">
                            Renitialiser
                        </Button>
                    </Col>
                </Row>

                <Row md={10} className='mt-2'>
                    {message && (
                        <div className="messagesuccess mt-3">
                            <Alert variant="success">{message}</Alert>
                        </div>
                    )}
                </Row>


            </Form>
        </div>
    )
}

export default Cou_VR_A;

//Cou_VR_A