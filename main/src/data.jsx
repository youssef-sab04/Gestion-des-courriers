import { Send , Check , CancelScheduleSend , DeleteForever , Checklist,
        CallReceived , Logout ,  QueryStats , Add
} from  "@mui/icons-material"
import Typeform from "./agent/typeformulaire";
import Courrier_recus from "./responsable/courrier_recus";
import Courrier_traites from "./responsable/Courrier_traites";
import Cou_re_A from "./agent/courrier_recus_A";
import Courrier_Rejetes from "./agent/Courrier_rejetes";
import Courrier_Sup from "./agent/Courrier_supp";
import Courrier_Diffuses from "./agent/Courrires_Diffuses";
import Dashboard from "./admin/Dashboard";
import C_user from "./admin/Cuser";
export const title = [
  {
    text: "Bureau d'ordre : Centre Hospitalier Universitaire Hassan II",
   
  },
]


export const avatars = [
    {
        id: 1,
        id_user: "A282",
        imagesrc: "./images/av1.png"  
    },
    {
        id: 2,
        id_user: "B545", 
        imagesrc: "./images/av2.png"  
    },
    {
        id: 3,
        id_user: "D344",
        imagesrc: "./images/av3.png"  
    },
    {
        id: 4, 
        id_user: "D909",
        imagesrc: "./images/av4.png"  
    },
    {
        id: 5, 
        id_user: "A244",
        imagesrc: "./images/av5.png"  
    },
    {
        id: 6, 
        id_user: "A355",
        imagesrc: "./images/av6.png"  
    }
];

export const agent_options = [
    {
        id: 1 ,
        nom : "Envoyer courrier" ,
        icon  : <Send/>,
        component: <Typeform key="typeform" />
    } ,

    {
        id: 2 ,
        nom : "Courriers Valides " ,
        icon  : <Check/>,
        component : <Cou_re_A/>
        
    },
    
    {
        id: 3 ,
        nom : "Courriers Rejetes" ,
        icon  : <CancelScheduleSend/>,
        component : <Courrier_Rejetes/>
    },

    {
        id: 4 ,
        nom : "Courriers Supprimes" ,
        icon  : <DeleteForever/>,
        component : < Courrier_Sup/>
    },

      {
        id: 5 ,
        nom : "Courriers Diffuses" ,
        icon  : <Checklist/>,
        component : <Courrier_Diffuses/>
    },
        {
        id: 6 ,
        nom : "Log out" ,
        icon  : <Logout />,
    }


   

    
]


export const respo_options = [
    {
        id: 1 ,
        nom : "Courriers recus" ,
        icon  : <CallReceived/>,
        component : <Courrier_recus/>
    } ,

    {
        id: 2 ,
        nom : "Courriers valides " ,
        icon  : <Checklist/>,
        component : <Courrier_traites/>

    }   ,
        {
        id: 3 ,
        nom : "Log out" ,
        icon  : <Logout />,
    } 

] 
export const admin_options = [
 
     {
        id: 2 ,
        nom : "Statistiues" ,
        icon  : <QueryStats/>,
        component : <Dashboard/>
    } ,
        {
        id: 3 ,
        nom : "Creer utilisateur " ,
        icon  : <Add/>,
        component : <C_user/>
    } ,
    {
        id: 4 ,
        nom : "Log out" ,
        icon  : <Logout />,
    } 

] 

export const divisions = [
  { id: 'D739', desc: 'Division des Affaires Financières' },
  { id: 'D153', desc: 'Division d\'Approvisionnement et Logistique' },
  { id: 'D468', desc: 'Division des Ressources Humaines'},
  { id: 'D826', desc: 'Division du Patrimoine ' },
  { id: 'D394', desc: 'Division des Systèmes d\'Information ' },
  { id: 'D657', desc: 'Division Recherche et Innovation ' }
];

export const sections = [
  { id: 'S315', desc: 'Section Audit Interne ' },
  { id: 'S642', desc: 'Section Contrôle de Gestion' },
  { id: 'S971', desc: 'Section Management de la Qualité ' },
  { id: 'S184', desc: 'Section Communication et Coopération' },
  { id: 'S527', desc: 'Section Pharmacie Centrale ' }
];


export const hopitaux = [
  { id: 'H842', desc: 'Hôpital des Spécialités' },
  { id: 'H125', desc: 'Hôpital Mère-Enfant ' },
  { id: 'H369', desc: 'Hôpital d\'Oncologie ' },
  { id: 'H584', desc: 'Hôpital Omar Driss ' },
  { id: 'H713', desc: 'Hôpital Ibn Al Hassan' }
];
export const services = [
  { id: 1, desc: 'Ressources Humaines' },
  { id: 2, desc: 'Recherche et Innovation' },
  { id: 3, desc: 'Contrôle de Gestion' },
  { id: 4, desc: 'Management de la Qualité' },
  { id: 5, desc: 'Communication et Coopération' }
];

export const unites_ex = [
  { id: 'E112', desc: 'Ministère de la Santé' },
  { id: 'E429', desc: 'Agence Nationale des Médicaments ' },
  { id: 'E753', desc: 'Organisme National d\'Assurance Maladie ' },
  { id: 'E286', desc: 'Institut Pasteur ' },
  { id: 'E647', desc: 'Croissant Rouge National ' },
  { id: 'E935', desc: 'OMS Bureau Régional ' }
];


//votremotdepasse