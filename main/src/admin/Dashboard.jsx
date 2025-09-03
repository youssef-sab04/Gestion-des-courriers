
import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,   ArcElement // Ajoutez ceci
 } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  Group, AdminPanelSettings, PersonSearch, ManageAccounts, ArrowRight, ArrowLeft
} from "@mui/icons-material"
import { use } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';


// Enregistrez les composants nécessaires
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend , ChartDataLabels ,   ArcElement, // Ajoutez ceci
);



const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  /*
  "nb_agent" => $nb_agent,

        "nb_respo" => $nb_respo,
        "nb_admin" => $nb_admin,
        
        
        // Stats courriers
        "nb_valide" => $nb_valide,
        "nb_rejete" => $nb_rejete,
        "nb_diffusee" => $nb_diffusee,
        "nb_depart" => $nb_depart,
        "nb_arrive" => $nb_arrive,
                "nb_supp" =>$nb_supp,

        
        
        // Stats unités
        "nb_interne" => $nb_interne,
        "nb_externe" => $nb_externe  
        */




  useEffect(() => {

    const fetchStats = async () => {
      try {
        const response = await fetch(
          'http://localhost/ESSAIE/api/controllers/CourrierController.php?action=stats'
        );
        const data = await response.json();
        setStats(data);
        console.log(data);
        setUsers(data?.nb_respo + data?.nb_admin + data?.nb_agent)
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);





  const data = {
    labels: ['Courriers Arrivée', 'Courriers Départ', 'Courriers Diffuses'],
    datasets: [
      {
        label: 'Nombre de courriers',
        data: [stats?.nb_arrive, stats?.nb_depart, stats?.nb_diffusee],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)'

        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      },
    ],

  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,



  };
const pieData = {
  labels: ['Validés', 'Supprimés', 'Rejetés'],
  datasets: [{
    data: [stats?.nb_valide, stats?.nb_supp, stats?.nb_rejete],
    backgroundColor: [
      '#1cc88a',
      '#f6c23e',
      '#e74a3b'
    ],
    hoverBorderColor: "#fff",
    borderWidth: 3 // Bordure plus épaisse pour mieux séparer les segments
  }]
};

const optionsP = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      padding: 20,
      boxWidth: 12,
    },
    datalabels: {
      formatter: (value, context) => {
        const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
        const percentage = Math.round((value / total) * 100);
        return `${percentage}%`;  // Affiche le pourcentage
      },
      color: '#fff',
      font: {
        weight: 'bold',
        size: 14
      },
      textShadowBlur: 10,
      textShadowColor: 'rgba(0,0,0,0.5)',
      anchor: 'center',
      align: 'center'
    }
  }
};

  return (

    <div className="content_dash">


      <div className="stats  ">

        <div className="item1 ">
          <p className='p_stats'>Utilisateurs : <h3 className='num'>{users}</h3></p>
          <Group className='ic' />
        </div>

        <div className="item1 ">
          <p className='p_stats'>Agents : <h3 className='num'>{stats?.nb_agent}</h3></p>
          <PersonSearch className='ic' />
        </div>


        <div className="item1  ">
          <p className='p_stats'>Responsables : <h3 className='num'>{stats?.nb_respo}</h3></p>
          <ManageAccounts className='ic' />
        </div>


        <div className="item1 ">
          <p className='p_stats'>Admins : <h3 className='num'>{stats?.nb_admin}</h3></p>
          <AdminPanelSettings className='ic' />
        </div>
        <div className="item1 ">
          <p className='p_stats'>Unite interne : <h3 className='num'>{stats?.nb_interne}</h3></p>
          <ArrowLeft className='ic' />
        </div>

        <div className="item1 ">
          <p className='p_stats'>Unites externes: <h3 className='num'>{stats?.nb_externe}</h3></p>
          <ArrowRight className='ic' />
        </div>
      </div>


      <div className='dash-container'>

        <h2 className='stattitle'>Statistiques des courriers :</h2>

        <div className="dash">
          <div className="dash1">
            <Bar data={data} options={options} />
          </div>

          <div className="dash2">
            <Pie className='pie' data={pieData} options={optionsP} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;