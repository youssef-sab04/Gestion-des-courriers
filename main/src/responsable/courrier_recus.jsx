import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Formarriveresop from '../agent/formararriverespo';


const Courrier_recus = () => {
    const [courriers, setCourriers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [courrier_numero ,setSelectedid] = useState(null);


    // Récupération des courriers
    useEffect(() => {
        const fetchCourriers = async () => {
            try {
                const response = await fetch(
                    'http://localhost/ESSAIE/api/controllers/CourrierController.php?action=courrier_recus'
                );
                const data = await response.json();
                setCourriers(data);
            } catch (error) {
                console.error("Erreur:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourriers();
    }, courriers);

    const ouvrir = (id) => {
        // navigate('/formearrive_respo' , { state: { id_courrier: id } });
        document.querySelector(".cour_recus").style.display = "none";
        document.querySelector(".formarrive_respo").style.display = "block";
        setSelectedid(id);
    }



    if (loading) return <div>Chargement...</div>;

    return (
        <div className="container">
            <div className="cour_recus  mt-4">
                <h2>Courriers Reçus</h2>

                <div className="tab_recus">
                    <Table striped bordered hover className="mt-3">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Numéro</th>
                                <th>Date</th>
                                <th>Objet</th>
                                <th>Date d'insertion</th>

                            </tr>
                        </thead>
                        <tbody>
                            {courriers.length > 0 ? (
                                courriers.map(courrier => (
                                    <tr key={courrier.id_courrier}>
                                        <td>{courrier.id_courrier}</td>
                                        <td>{courrier.num_courrier}</td>
                                        <td>{courrier.date_courrier}</td>
                                        <td>{courrier.objet}</td>
                                        <td>{courrier.Date_insertion}</td>
                                        <td><button onClick={() => ouvrir(courrier.num_courrier)} className='btn_recus'>Ouvrir</button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        Aucun courrier trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>

            <div className="formarrive_respo" style={{ display: 'none' }}>
                <Formarriveresop courrier_numero = {courrier_numero} />
            </div>
             </div>
            );
};

            export default Courrier_recus;