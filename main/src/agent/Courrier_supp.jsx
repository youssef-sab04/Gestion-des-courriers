import React, { useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';




const Courrier_Sup = () => {
        const [courriers, setCourriers] = useState([]);
        const [loading, setLoading] = useState(true);



    
    
        // Récupération des courriers
        useEffect(() => {
            const fetchCourriers = async () => {
                try {
                    const response = await fetch(
                        'http://localhost/ESSAIE/api/controllers/CourrierController.php?action=courrier_supprimesAffich'
                    );
                    const data = await response.json();
                    setCourriers(data);
                    console.log(data);
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
                <h2>Courriers Supprimes</h2>

                <div className="tab_recus">
                    <Table  striped bordered hover className="Tab mt-3">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Numéro</th>
                                <th>Date</th>
                                <th>Objet</th>
                                <th>Date de supression</th>


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
                                        <td>{courrier?.date_supress}</td>

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

export default Courrier_Sup;