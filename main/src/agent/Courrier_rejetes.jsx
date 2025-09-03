import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const Courrier_Rejetes = () => {
    const [data, setData] = useState({ courriers: [], motifs: {}, loading: true });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch courriers
                const resCourriers = await fetch('http://localhost/ESSAIE/api/controllers/CourrierController.php?action=courrier_rejetes');
                const courriers = await resCourriers.json();

                // 2. Fetch motifs pour tous
                const motifs = {};
                for (const c of courriers) {
                    const res = await fetch(`http://localhost/ESSAIE/api/controllers/CourrierController.php?action=courrier_rejetesM&num=${c.num_courrier}`);
                    motifs[c.num_courrier] = await res.json();
                }

                setData({ courriers, motifs, loading: false });
            } catch (error) {
                console.error("Erreur:", error);
                setData(prev => ({ ...prev, loading: false }));
            }
        };
        fetchData();
    }, []);

    if (data.loading) return <div>Chargement...</div>;

    return (
        <div className="container mt-3">
            <h2>Courriers Rejets</h2>
            <Table className='Tab' striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Numéro</th>
                        <th>Date</th>
                        <th>Objet</th>
                        <th>Date insertion</th>
                        <th>Date rejet</th>
                        <th>Motif</th>
                    </tr>
                </thead>
                <tbody>
                    {data.courriers.map(c => (
                        <tr key={c.id_courrier}>
                            <td>{c.id_courrier}</td>
                            <td>{c.num_courrier}</td>
                            <td>{c.date_courrier}</td>
                            <td>{c.objet}</td>
                            <td>{c.Date_insertion}</td>
                            <td>{data.motifs[c.num_courrier]?.date_rejeect || '-'}</td>
                            <td>
                                <button 
                                    className="btn_recus btn-outline-primary"
                                    onClick={() => setData(prev => ({
                                        ...prev,
                                        motifs: {
                                            ...prev.motifs,
                                            [c.num_courrier]: {
                                                ...prev.motifs[c.num_courrier],
                                                show: !prev.motifs[c.num_courrier]?.show
                                            }
                                        }
                                    }))}
                                >
                                    {data.motifs[c.num_courrier]?.show ? 'Masquer' : 'Afficher'}
                                </button>
                                {data.motifs[c.num_courrier]?.show && (
                                    <div className="mt-2 small">
                                        {data.motifs[c.num_courrier]?.Motif_rejection || 'Aucun motif'}
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Courrier_Rejetes;