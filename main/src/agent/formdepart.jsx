import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { divisions } from '../data';
import { sections } from '../data';
import { hopitaux } from '../data';
import { unites_ex } from '../data';
import React, { useState , useRef } from 'react';

const Formdepart = ({ id_createur }) => {

    const [Numero, setNumero] = useState("");
    const [Date, setDate] = useState("");
    const [objet, setObjet] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfError, setPdfError] = useState('');
    const [Emetteur, setEmetteur] = useState('');
    const [destinatairesInternes, setDestinatairesInternes] = useState([]);
    const [destinatairesExternes, setDestinatairesExternes] = useState([]);
    const [erreur, setErreur] = useState('');
    const [succes, setscucces] = useState('');
    const fileInputRef = useRef(null);
    const [userId,  setUserid] = useState('');

    

    const Reset = () => {
        setNumero("");
        setDate("");
        setObjet("");
        setPdfFile(null);
        setPdfError('');
        setEmetteur("");
        setDestinatairesInternes([]);
        setDestinatairesExternes([]);
 
        if (fileInputRef.current) fileInputRef.current.value = "";
    }


    const handlePdfChange = (e) => {
         const selectedFile = e.target.files[0];

        if (selectedFile) {
            if (selectedFile.type === 'application/pdf') {
                setPdfFile(selectedFile);
                setPdfError('');
            } else {
                setPdfError('Veuillez sélectionner un fichier PDF valide');
                setPdfFile(null);
            }
        }
    };

    
const validerform = async (e) => {
    e.preventDefault();
   // console.log(Numero , Date , objet , Emetteur )
    console.log("I" , destinatairesInternes , "TAille" ,  destinatairesInternes.length)
        console.log("I" , destinatairesExternes , "TAille" , destinatairesExternes.length)


    // Validation minimale côté client
    if (!Numero || !Date || !objet || !pdfFile || !Emetteur
        || (destinatairesInternes.length + destinatairesExternes.length === 0)
     ) {
        setErreur(`Champs manquants: ${
        !Numero ? ' Numéro ' : ''
    }${
        !Date ? ' Date ' : ''
    }${
        !Emetteur ? ' Émetteur ' : ''
    }${
        !pdfFile ? ' Fichier PDF' : ''
    }${
        !objet ? ' Objet' : ''
    }${
        (destinatairesInternes.length + destinatairesExternes.length === 0) ? ' Destinataires' : ''
    }
    `);
    setscucces("")
        return;
    }
    // || (destinatairesInternes.length + destinatairesExternes.length === 0)

   

    const formData = new FormData();
    formData.append('fichier_pdf', pdfFile);
    formData.append('numero_courrier', Numero);
    formData.append('date_courrier', Date);
    formData.append('objet', objet ); // Même vide
    formData.append('emetteur', Emetteur);
        formData.append('id_createur', id_createur);

    formData.append('method', "c_d");

    

  formData.append('destinataires_internes', JSON.stringify(destinatairesInternes));
formData.append('destinataires_externes', JSON.stringify(destinatairesExternes));
    console.log("formadatai", formData.get('destinataires_internes'));
    console.log("formadatae", formData.get('destinataires_externes'));



    try {
        const response = await fetch('http://localhost/ESSAIE/api/controllers/CourrierController.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error( "Erreur  du serveur");
        const result = await response.json();
        setscucces( result.message || "Courrier enoye avec Succès");
        setErreur("")
       Reset();
        

    } catch (error) {
        setErreur(error.message || "Erreur lors de l'envoi du courrier");
        setscucces("")
        console.log("erreur");
    }

};

    console.log("user", id_createur);


    return (
        <div className="formdeprt d-flex justify-content-center align-items-center">
            <Form className='fd'>
                <p className="titledepart">Formulaire de courrier de depart :  </p>
               

                <Row className="align-items-center ">
                    <Col md={12}>
                        <Form.Group as={Row} className="mb-4 vide" controlId="formemail">
                            <Form.Label column md={4}>Numero de courrier:</Form.Label>
                            <Col md={6}>
                                <Form.Control
                                    type="text"
                                    placeholder="Numero de courrier"
                                    onChange={(e) => setNumero(e.target.value)}
                                    value={Numero}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group as={Row} className="mb-4 vide" controlId="formDateCourrier">
                            <Form.Label column md={4}>Date de courrier:</Form.Label>
                            <Col md={6}>
                                <Form.Control
                                    type="date"
                                    placeholder="Date de courrier"
                                    onChange={(e) => setDate(e.target.value)}
                                    value={Date}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group as={Row} className="mb-4 vide" controlId="formObjet">
                            <Form.Label column md={4}>Objet:</Form.Label>
                            <Col md={7}>
                                <Form.Control
                                    type="text"
                                    placeholder="Objet"
                                    onChange={(e) => setObjet(e.target.value)}
                                    value={objet}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Form.Group as={Row} className="mb-4" controlId="formFichierPDF">
                            <Form.Label column md={4}>Fichier PDF:</Form.Label>
                            <Col md={7}>
                                <Form.Control
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={handlePdfChange}
                                    ref={fileInputRef}
                                    


                                />
                                <Form.Text muted>
                                    Formats acceptés : PDF uniquement
                                </Form.Text>
                                <Form.Text muted className='mt-3'>
                                    {pdfError && <Alert variant="danger">{pdfError}</Alert>}
                                </Form.Text>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>

                <Row >
                    <Col md={12}>
                        <Form.Group as={Row} controlId="formEmetteurInterne">
                            <Form.Label column md={4}>Emetteur (Unite interne):</Form.Label>
                            <Col md={8}>
                                <Form.Control as="select"
                                    onChange={(e) => setEmetteur(e.target.value)}
                                    value={Emetteur}

                                >
                                    <option  selected disabled value="">-- Choisissez --</option>
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



                <Row className='mt-4'>
                    <Col md={12}>
                        <Form.Group as={Row} controlId="formEmetteurInterne">
                            <Form.Label column md={4}>Destinatire:</Form.Label>
                            <Col md={4}>
                                <Form.Control as="select"
                                    multiple  // Active la sélection multiple
                                    size={3}  // Affiche 3 options visibles sans scroller
                                    style={{ height: 'auto' }}  // Hauteur automatique
                                    onChange={(e) => {

                                        const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
                                        setDestinatairesInternes(options);
                                    }}
                                    value={destinatairesInternes}

                                >
                                    <option  disabled value="">-- Unites internes --</option>
                                    <optgroup label="Divisions:">
                                        {divisions.map((val) => (
                                            <option value={val.id}>{val.desc}</option>

                                        ))}

                                    </optgroup>
                                    <optgroup label="Sections">
                                        {sections.map((val) => (
                                            <option key={val.id} value={val.id}>{val.desc}</option>

                                        ))}
                                    </optgroup>


                                    <optgroup label="Hopitaux">
                                        {hopitaux.map((val) => (
                                            <option  key={val.id} value={val.id}>{val.desc}</option>

                                        ))}

                                    </optgroup>

                                </Form.Control>
                            </Col>
                            <Col md={4}>
                                <Form.Control as="select"
                                    multiple
                                    onChange={(e) => {
                                        const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
                                        setDestinatairesExternes(options);
                                        value={destinatairesExternes}
                                    }}
                                >
                                    <option  disabled value="">-- Unites externes --</option>


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
                <Row className='mt-4'>  {erreur && <Alert variant="danger">{erreur}</Alert>}</Row>
              <Row className='mt-4'>  {succes && <Alert variant="success">{succes}</Alert>}</Row>

                <Row className="depbut mt-4" >
                    <Col md={10}>
                        <Button md={4} onClick={validerform} type="submit">
                            Diffuser
                        </Button>
                        <Button md={4} onClick={Reset} >
                            Renitialiser
                        </Button>
                        
                        
                    </Col>
                </Row>


            </Form>
        </div>
    )
}

export default Formdepart;