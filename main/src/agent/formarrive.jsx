import { Row, Col, Form, Button , Alert} from 'react-bootstrap';
import { divisions } from '../data';
import { sections } from '../data';
import { hopitaux } from '../data';
import { unites_ex } from '../data';
import React , {useState , useRef} from 'react';

const Formarrive = ({ id_createur }) => {
      const inputRef1 = useRef(null);
     const  inputRef2 = useRef(null);
    
    const [Numero, setNumero] = useState("");
    const [Date, setDate] = useState(null);
    const [objet, setObjet] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [emetteur, setEet_interne] = useState("");
    const [TypeEmetteur, seTypeEmetteur] = useState("");

    const [methode , setMethode] = useState("c_a")
    

    const [erreur, setErreur] = useState('');
    const [succes, setscucces] = useState('');

    const fileInputRef = useRef(null);
    
    
        const Reset = () => {
            setNumero("");
            setDate("");
            setObjet("");
            setPdfFile(null);
            setEet_interne("");        
            
            if (fileInputRef.current) fileInputRef.current.value = "";
            if (inputRef1.current) fileInputRef.current.value = "";
            if (inputRef2.current) inputRef2.current.value = "";
        }
    

    

 const handlePdfChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            if (selectedFile.type === 'application/pdf') {
                setPdfFile(selectedFile);
            } else {
                setPdfFile(null);
            }
        }
    };

//inputRef1.current.disabled 
    const disbledtfucntion = ()=> {
        
    const a = inputRef1.current.value; 
    const b = inputRef2.current.value;

        inputRef2.current.disabled = !!a;  
        inputRef1.current.disabled = !!b;
         const valeur = a || b;

    setEet_interne(valeur);
    seTypeEmetteur(valeur.startsWith("E") ? "E" : "I");

         if (!a && !b) {
        inputRef1.current.disabled = false;
        inputRef2.current.disabled = false;
    }
    }

     const disbledtfucntionrest =()=>{
     

        inputRef1.current.disabled = false;
        inputRef2.current.disabled = false;
        Reset();

     }

const validerform = async (e) => {
    e.preventDefault();
   // console.log(Numero , Date , objet , Emetteur )
    //console.log(destinatairesInternes , destinatairesExternes)

    // Validation minimale côté client
    console.log(emetteur , "Type :" , TypeEmetteur)
    if (!Numero || !Date || !objet || !pdfFile || !emetteur ) {
        setErreur(`Champs manquants: ${
        !Numero ? 'Numéro ' : ''
    }${
        !Date ? 'Date ' : ''
    }${
        !emetteur ? 'Émetteur ' : ''
    }${
        !pdfFile ? 'Fichier PDF' : ''
    }${
        !objet ? 'Objet' : ''
    }`);
    setscucces("")
        return;
    }

   

    const formData = new FormData();
    formData.append('fichier_pdf', pdfFile);
    formData.append('numero_courrier', Numero);
    formData.append('date_courrier', Date);
    formData.append('objet', objet ); // Même vide
    formData.append('emetteur', emetteur);
        formData.append('typeEmetteur', TypeEmetteur);
        formData.append('id_createur', id_createur);


    formData.append('method', "c_a");

    





    try {
        const response = await fetch('http://localhost/ESSAIE/api/controllers/CourrierController.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error( "Erreur du serveur");
        const result = await response.json();
        setscucces( result.message || "Courrier enoye avec Succès");
        setErreur("")
        Reset();

    } catch (error) {
        setErreur(error.message || "Erreur lors de l'envoi du courrier");
        setscucces("")
    }

};

    


    return (
        <div className="formdeprt d-flex justify-content-center align-items-center">
            <Form className='fd'>
                <p className="titledepart">Formulaire de courrier  d'arrivee :</p>

                <Row className="align-items-center ">
                    <Col md={12}>
                        <Form.Group as={Row} className="mb-4" controlId="formemail">
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
                        <Form.Group as={Row} className="mb-4" controlId="formDateCourrier">
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
                        <Form.Group as={Row} className="mb-4" controlId="formObjet">
                            <Form.Label column md={4}>Objet:</Form.Label>
                            <Col md={7}>
                                <Form.Control
                                    type="texte"
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
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>

   


                <Row className='mt-4'>
                    <Col md={12}>
                        <Form.Group as={Row} controlId="formEmetteur">
                            <Form.Label column md={4}>Emetteur:</Form.Label>
                            <Col md={4}>
                                <Form.Control className='a' as="select"
                                ref={inputRef1}
                                onChange={disbledtfucntion}
                                value={emetteur}

                                
                                                   
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
                                <Form.Control as="select" className='b'
                                ref={inputRef2}
                                onChange={disbledtfucntion}
                                
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
                    Chosir un seul emetteur (soit interne ou externe)
                </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                               <Row className='mt-4'>  {erreur && <Alert variant="danger">{erreur}</Alert>}</Row>
                              <Row className='mt-4'>  {succes && <Alert variant="success">{succes}</Alert>}</Row>
                <Row className="depbut mt-4" >
                    <Col md={10}>
                    <Button md={4} type="submit" onClick={validerform}>
                     Envoyer
                    </Button>
                    <Button md={4} type="reset"
                    onClick={disbledtfucntionrest}
                    >
                    Renitialiser
                    </Button>
                    </Col>
                </Row>


            </Form>
        </div>
    )
}

export default Formarrive;