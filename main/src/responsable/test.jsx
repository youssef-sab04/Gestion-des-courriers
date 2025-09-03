import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { divisions } from '../data';
import { sections } from '../data';
import { hopitaux } from '../data';
import { unites_ex } from '../data';
import React, { useState, useEffect, useRef } from 'react';

const Formarriveresop = ({ courrier_numero }) => {


    const tab_emetteurs = [...hopitaux, ...sections, ...divisions, ...unites_ex];



    const [destinatairesInternes, setDestinatairesInternes] = useState([]);
    const [destinatairesExternes, setDestinatairesExternes] = useState([]);
    const [annotations, setAnnotations] = useState(null);

    const [courrierData, setCourrierData] = useState(null);
    const [error, setError] = useState(null);
    const [Date, setDate] = useState(null);
    const [objet, setObjet] = useState(null);

    const [emetteur, setEmetteur] = useState(null);
    const [message, setMessage] = useState(null);
    const [rejection, setRejection] = useState(null);
    const submitButtonRef = useRef(null);
    const rejeterButtonRef = useRef(null);
    const supprimerButtonRef = useRef(null);
    const AnnulerRejeButtonRef = useRef(null);



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
        console.log('Numéro reçu:', courrier_numero); // Debug

        const fetchData = async () => {
            try {
                if (!courrier_numero) {
                    console.warn('Aucun numéro fourni');
                    setCourrierData(null);
                    return;
                }

                const url = `http://localhost/ESSAIE/api/controllers/CourrierController.php?action=courrier_affiches&num=${courrier_numero}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}`);
                }

                const data = await response.json();
                console.log('Données API:', data); // Debug
                setCourrierData(data);
                setDate(data.date_courrier);
                setObjet(data.objet);

            } catch (err) {
                console.error('Erreur:', err);
                setError(err.message);
                setCourrierData(null);
            }
        };

        fetchData();

    }, [courrier_numero]);

    useEffect(() => {
        if (courrierData?.emetteur) {
            const emetteur = tab_emetteurs.find((val) => val.id === courrierData?.emetteur);
            console.log(emetteur?.desc)

            setEmetteur(emetteur?.desc);
        }
    }, [courrierData]);




    const handleValidation = async (e) => {
        e.preventDefault();
        const button = e.currentTarget;
        button.disabled = true;

        // Validation minimale
        if (destinatairesInternes.length === 0 && destinatairesExternes.length === 0) {
            alert("Veuillez sélectionner au moins un destinataire");
            button.disabled = false;
            return;
        }

        try {
            // 1. Envoi des destinataires (POST)
            const formData = new FormData();
            formData.append('num_courrier', courrier_numero);
            formData.append('method', "c_arriveresop");
            formData.append('annotations', annotations);
            formData.append('destinataires_internes', JSON.stringify(destinatairesInternes));
            formData.append('destinataires_externes', JSON.stringify(destinatairesExternes));

            // 2. Mise à jour des annotations (PUT)
            const updatePayload = {
                num_courrier: courrier_numero,
                annotations: annotations,
                statut: "valide"
            };

            // Exécution en parallèle
            const [responseDest, responseUpdate] = await Promise.all([
                fetch('http://localhost/ESSAIE/api/controllers/CourrierController.php', {
                    method: 'POST',
                    body: formData
                }),
                fetch('http://localhost/ESSAIE/api/controllers/CourrierController.php', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatePayload)
                })
            ]);

            // Traitement des réponses
            const [resultDest, resultUpdate] = await Promise.all([
                responseDest.json(),
                responseUpdate.json()
            ]);

            // Vérification des erreurs
            if (!responseDest.ok || !responseUpdate.ok) {
                const errorMsg = resultDest.error || resultUpdate.error || "Erreur inconnue";
                throw new Error(errorMsg);
            }

            // Succès
            alert("Validation complète réussie !");
            disableAllButtons();
            setMessage("Validation complète réussie !");

        } catch (error) {
            console.error("Erreur détaillée:", error);
            alert(`Erreur: ${error.message}`);
            button.disabled = false;
        }
    };

    // Fonction utilitaire
    const disableAllButtons = () => {
        [rejeterButtonRef, supprimerButtonRef].forEach(ref => {
            if (ref.current) ref.current.disabled = true;
        });
    };

    const disableAllButtonsReje = () => {
        [submitButtonRef, rejeterButtonRef, supprimerButtonRef, DestinatireiRef
            , DestinatirexRef, AnnotationRef  
        ].forEach(ref => {
            if (ref.current) ref.current.disabled = true;
        });
    };

      const AllowAllButtonsReje = () => {
        [submitButtonRef, rejeterButtonRef, supprimerButtonRef, DestinatireiRef
            , DestinatirexRef, AnnotationRef
        ].forEach(ref => {
            if (ref.current) ref.current.disabled = false;
        });
    };
    

    //AnnulerRejeButtonRef
       const Annuler_RejeButtonRef = () => {
        if (AnnulerRejeButtonRef.current) {
            AnnulerRejeButtonRef.current.disabled = true;
        }
    };

    

    const handleRejection = async (e) => {
        e.preventDefault();
        document.querySelector(".rejection").style.display = "block";
        disableAllButtonsReje();

    }

     const handleRejectionValidation_l = async (e) => {
        e.preventDefault();
        const button = e.currentTarget;

        if(!rejection || rejection.trim() === "") {
            alert("Veuillez entrer un motif de rejet");
            return;
        }


        try {
            const formData_R = new FormData();
            formData_R.append('method', "c_rejet");
            formData_R.append('num_courrier', courrier_numero);
            formData_R.append('rejection', rejection);

              const updatePayload_R = {
                num_courrier: courrier_numero,
                statut: "rejete"          
            };

             const [responseRej, responseUpdt] = await Promise.all([
                fetch('http://localhost/ESSAIE/api/controllers/CourrierController.php', {
                    method: 'POST',
                    body: formData_R
                }),
                fetch('http://localhost/ESSAIE/api/controllers/CourrierController.php', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatePayload_R)
                })
            ]);

            // Traitement des réponses
            const [resultRej, resultUpdt] = await Promise.all([
                responseRej.json(),
                responseUpdt.json()
            ]);

            // Vérification des erreurs
            if (!responseRej.ok || !responseUpdt.ok) {
                const errorMsg = resultRej.error || resultUpdt.error || "Erreur inconnue";
                throw new Error(errorMsg);

            }

            // Succès
            alert("Validation complète réussie !");
            disableAllButtons();
            Annuler_RejeButtonRef();
            document.querySelector(".rejection").style.display = "none";
            setMessage("Rejection Valide !");
            button.disabled = true;



           }

        catch (error) {
           
            console.error("Erreur détaillée:", error);
            alert(`Erreur: ${error.message}`);
            button.disabled = false;
        }
    };

    const Anuuler_rejections = () =>{
        document.querySelector(".rejection").style.display = "none";
        AllowAllButtonsReje();
        setRejection(null);
    }

         const handlesuprression = async (e) => {
        e.preventDefault();
        const button = e.currentTarget;




        try {
            const formData_S = new FormData();
            formData_S.append('method', "c_supression");
            formData_S.append('num_courrier', courrier_numero);
            formData_S.append('date_courrier', Date);
            formData_S.append('objet', objet ); // Même vide

              const updatePayload_S = {
                num_courrier: courrier_numero,
                statut: "suprime"          
            };

             const [responseSupI, responseSupD] = await Promise.all([
                fetch('http://localhost/ESSAIE/api/controllers/CourrierController.php', {
                    method: 'POST',
                    body: formData_S
                }),
                fetch('http://localhost/ESSAIE/api/controllers/CourrierController.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatePayload_S)
                })
            ]);

            // Traitement des réponses
            const [resultSupI, resultSupD] = await Promise.all([
               responseSupI.json(),
               responseSupD.json()
            ]);

            // Vérification des erreurs
            if (!resultSupI.ok || !resultSupD.ok) {
                const errorMsg = resultSupI.error || resultSupD.error || "Erreur inconnue";
                throw new Error(errorMsg);

            }

            // Succès
            alert("Supression réussie !");
            disableAllButtons();
            setMessage("Supression Valide !");


           }

        catch (error) {
           
            console.error("Erreur détaillée:", error);
            alert(`Erreur: ${error.message}`);
            button.disabled = false;
        }
    };



   







    return (
        <div className="formdeprt d-flex justify-content-center align-items-center">

            <Form className='fd'>
                <p className="titledepart">Formulaire de depart :</p>
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
                                    type="texte"
                                    placeholder="Emetteur"
                                    disabled
                                    value={emetteur || ''}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>





                <Row className='mt-4'>
                    <Col md={12}>
                        <Form.Group as={Row} controlId="">
                            <Form.Label column md={4}>Destinatire:</Form.Label>
                            <Col md={4}>
                                <Form.Control as="select"
                                    multiple
                                    ref={DestinatireiRef}
                                    size={3}
                                    style={{ height: 'auto' }}
                                    onChange={(e) => {
                                        const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
                                        setDestinatairesInternes(options);



                                    }}

                                >
                                    <option value="">-- Unites internes --</option>
                                    <optgroup label="Divisions:">
                                        {divisions.map((val) => (
                                            <option value={val.id}>{val.desc}</option>

                                        ))}

                                    </optgroup>
                                    <optgroup label="Sections">
                                        {sections.map((val) => (
                                            <option value={val.id}>{val.desc}</option>

                                        ))}
                                    </optgroup>


                                    <optgroup label="Hopitaux">
                                        {hopitaux.map((val) => (
                                            <option value={val.id}>{val.desc}</option>

                                        ))}

                                    </optgroup>

                                </Form.Control>
                            </Col>
                            <Col md={4}>
                                <Form.Control as="select"
                                    multiple
                                    ref={DestinatirexRef}
                                    onChange={(e) => {
                                        const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
                                        setDestinatairesExternes(options);


                                    }}
                                >
                                    <option value="">-- Unites externes --</option>


                                    <optgroup label="">
                                        {unites_ex.map((val) => (
                                            <option value={val.id}>{val.desc}</option>

                                        ))}

                                    </optgroup>

                                </Form.Control>
                            </Col>
                            <Form.Text muted className='mt-3'>
                                Maintenez Ctrl (Windows) ou ⌘ (Mac) pour sélectionner plusieurs options
                            </Form.Text>
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
                                    placeholder="...."
                                    onChange={(e) => setAnnotations(e.target.value)}
                                    ref={AnnotationRef}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-4 rejection' style={{ display: 'none' }} >

                    <Col md={12} className='mt-4' >
                        <Form.Group as={Row} className="mb-4" controlId="formObjet">
                            <Form.Label column md={4}>Motif rejection :</Form.Label>
                            <Col md={7}>
                                <Form.Control
                                    type="text"
                                    placeholder="...."
                                    onChange={(e) => setRejection(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Row>
                    <Col md={3} className='mb-3' >
                        <Button md={3} onClick={handleRejectionValidation_l}  >
                            Valider Rejection
                        </Button>      
</Col>
                        <Col md={3} className='' >
                        <Button md={3} ref={AnnulerRejeButtonRef} onClick={Anuuler_rejections}  >
                            Annuler
                        </Button>        
                    </Col>

                    </Row>

                </Row>

                <Row className="depbut mt-4" >
                    <Col md={10}>
                        <Button md={4} type="submit" ref={submitButtonRef} onClick={handleValidation}>
                            Valider
                        </Button>
                        <Button md={4} ref={rejeterButtonRef} type="submit" onClick={handleRejection} >
                            Rejeter
                        </Button>
                        <Button md={4} ref={supprimerButtonRef} type="submit" >
                            Supprimer
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

export default Formarriveresop;