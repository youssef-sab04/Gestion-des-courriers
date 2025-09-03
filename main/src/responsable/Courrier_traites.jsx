import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';




const Courrier_traites = () => {
        const [courriers, setCourriers] = useState([]);
        const [loading, setLoading] = useState(true);
        const [courrier_numero ,setSelectedid] = useState(null);
    
    
        // Récupération des courriers
        useEffect(() => {
            const fetchCourriers = async () => {
                try {
                    const response = await fetch(
                        'http://localhost/ESSAIE/api/controllers/CourrierController.php?action=courrier_valides'
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
     if (loading) return <div>Chargement...</div>;

    return (
        <div className="container">
            <div className="cour_recus  mt-4">
                <h2>Courriers Valides</h2>

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

          
             </div>
            );

}

export default Courrier_traites;