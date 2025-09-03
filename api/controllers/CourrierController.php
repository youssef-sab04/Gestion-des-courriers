<?php
header("Content-Type: application/json");
error_reporting(0); // Désactive l'affichage des erreurs PHP
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT , DELETE ,  OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once '../config/database.php';
require_once '../models/courrier.php';
require_once '../models/emetteur.php';
require_once '../models/recepteur.php';
require_once '../models/courrier_rejetes.php';
require_once '../models/Courrier_supprimes.php';
require_once '../models/user.php';
require_once '../models/uniteexterne.php';
require_once '../models/uniteinterne.php';



$database = new Database();
$db = $database->getConnection();
$courrier = new Courrier($db);
$emetteur = new Emetteur($db);
$recepteur = new Recepteur($db);
$courrierRejetes = new CourrierRejetes($db);
$courrierSupprimes = new Courrierupprimes($db);
$user = new User($db);
$uniteExterne = new Unite_externe($db);
$uniteInterne = new Unite_interne($db);






// PARTIE GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_GET['action'])) {
        http_response_code(400);
        echo json_encode(["error" => "Paramètre 'action' manquant"]);
        exit;
    }

    // Premier cas (existant)
    if ($_GET['action'] === 'courrier_recus') {
        $stmt = $courrier->get_courrier_recu();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);
        exit;
    }
    // Deuxième cas (nouveau)
    elseif ($_GET['action'] === 'courrier_affiches') {
        if (!isset($_GET['num'])) {
            http_response_code(400);
            echo json_encode(["error" => "Paramètre 'num' manquant"]);
            exit;
        }
        // Traitement spécifique ici...
        $stmt = $courrier->afficher_courrier_num($_GET['num']);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $stmt2 = $emetteur->afficher_courrieremetteur_num($_GET['num']);
        $result2 = $stmt2->fetch(PDO::FETCH_ASSOC);
        $result['emetteur'] = $result2['id_interne'] ?? $result2['id_externe'] ?? null;
        echo json_encode($result);
        exit;
    }

   elseif ($_GET['action'] === 'courrier_affichesA') {
    if (!isset($_GET['num'])) {
        http_response_code(400);
        echo json_encode(["error" => "Paramètre 'num' manquant"]);
        exit;
    }

    try {
        // 1. Récupération des infos du courrier (1 ligne)
        $courrierData = $courrier->afficher_courrier_num($_GET['num'])->fetch(PDO::FETCH_ASSOC);
        
        if (!$courrierData) {
            throw new Exception("Courrier non trouvé");
        }

        // 2. Récupération émetteur (1 ligne)
        $emetteurData = $emetteur->afficher_courrieremetteur_num($_GET['num'])->fetch(PDO::FETCH_ASSOC);
        $courrierData['emetteur'] = $emetteurData['id_interne'] ?? $emetteurData['id_externe'] ?? null;

        // 3. Récupération destinataires (méthode existante du récepteur)
        $destinataires = $recepteur->getRecepteurByCourrier($_GET['num']);
        $courrierData['destinataires'] = $destinataires ?: [];

        // Structure de réponse cohérente avec votre code existant
        echo json_encode([
            'success' => true,
            'data' => $courrierData
        ]);

    } catch(Exception $e) {
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
    exit;
}


    elseif ($_GET['action'] === 'courrier_valides') {
        $stmt = $courrier->get_courrier_valides();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);
        exit;
    }
    elseif ($_GET['action'] === 'courrier_rejetes') {
        $stmt = $courrier->get_courrier_Rejetes();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

       
        

        echo json_encode($result);
        exit;
    }

     elseif ($_GET['action'] === 'courrier_rejetesM') {
        if (!isset($_GET['num'])) {
        http_response_code(400);
        echo json_encode(["error" => "Paramètre 'num' manquant"]);
        exit;
    }

    $Motif = $courrierRejetes->afficher_motif_rejection_num($_GET['num'])->fetch(PDO::FETCH_ASSOC);

        

        echo json_encode($Motif);
        exit;
    }

    elseif ($_GET['action'] === 'courrier_supprimesAffich') {
        $stmt = $courrierSupprimes->afficher_courrier_supp();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        

        echo json_encode($result);
        exit;
    }
      elseif ($_GET['action'] === 'courrier_Diffuses') {
        $stmt = $courrier->afficher_courrier_diff();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        

        echo json_encode($result);
        exit;
    }

      elseif(isset($_GET['action']) && $_GET['action'] === 'stats') {
    // Statistiques utilisateurs
    $nb_agent = $user->count_agent();
    $nb_respo = $user->count_res();
    $nb_admin = $user->count_admin();
    
    
    // Statistiques courriers
    $nb_valide = $courrier->count_valide();
    $nb_rejete = $courrier->count_rejete();
    $nb_diffusee = $courrier->count_diffusee();
    $nb_depart = $courrier->count_ddepart();
    $nb_arrive = $courrier->count_arrive();

    $nb_supp = $courrierSupprimes->count_delete();
    
    
    // Statistiques unités
    
    $nb_interne = $uniteInterne->count_int();
    $nb_externe = $uniteExterne->count_ext(); 

    echo json_encode([
        // Stats utilisateurs
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
    ]);
}

 elseif(isset($_GET['action']) && $_GET['action'] === 'ids') {
    $stmt = $user->Select_id();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
     echo json_encode($result);
        exit;

 }
    

    // Gestion des actions inconnues
    else {
        http_response_code(400);
        echo json_encode(["error" => "Action non reconnue"]);
        exit;
    }
}



elseif($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // 1. Lire les données
    $input = json_decode(file_get_contents('php://input'), true);



    
    // 2. Validation minimale
    if(empty($input['num_courrier'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'num_courrier requis']);
        exit;
    }

    // 3. Traitement
    try {
         if($input['statut'] === 'valide') {
            $courrier->valider_courrier($input['num_courrier']);
        
        if(!empty($input['annotations'])) {
            $courrier->create_annotation($input['num_courrier'], $input['annotations']);
        }

        }
        elseif($input['statut'] === 'rejete') {
            $courrier->Rejeter_courrier($input['num_courrier']);
        } 

        elseif($input['statut'] === 'Diffuse_valide') {
            $courrier->Diffuser_courrier($input['num_courrier']);
        }

         
        
        // 4. Réponse succès
        echo json_encode(['success' => true]);
        
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(['message' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $destinatairesInternes = json_decode($_POST['destinataires_internes'] ?? '[]', true);
$destinatairesExternes = json_decode($_POST['destinataires_externes'] ?? '[]', true);


if ($_POST['method'] === 'c_arriveresop') {

     if (empty($_POST['num_courrier'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Numéro de courrier requis']);
        exit;
  
    }
    try {
        if (!empty($destinatairesInternes)) {
                foreach ($destinatairesInternes as $dest) {
                    $recepteur->crerRecepteur_interne($_POST['num_courrier'], $dest);
                }
                foreach ($destinatairesExternes as $dest) {
                    $recepteur->crerRecepteur_externe($_POST['num_courrier'], $dest);
                }
            }
           
   
     echo json_encode(['success' => true]);

    }
     catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erreur lors de l\'enregistrement']);
    
    }
    exit;
}
elseif($_POST['method'] === 'c_rejet'){
    if (empty($_POST['num_courrier']) || empty($_POST['rejection'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Numéro et motif de rejet requis']);
        exit;
    }
    
    try {
        // Assurez-vous que la méthode existe dans CourrierRejetes
        $success = $courrierRejetes->insert_courrrierrejetes(
            $_POST['num_courrier'], 
            $_POST['rejection']
        );
        
        if (!$success) {
            throw new Exception("Échec de l'insertion");
        }
        
        // Réponse JSON claire
        echo json_encode([
            'success' => true,
            'message' => 'Rejet enregistré',
            'insert_id' => $db->lastInsertId() // Retourne l'ID créé
        ]);
        exit; // IMPORTANT
        
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage(),
            'debug' => $_POST // Pour vérifier les données reçues
        ]);
        exit;
    }
}

elseif($_POST['method'] === 'c_supression'){
    if (empty($_POST['num_courrier']) || empty($_POST['date_courrier']) || empty($_POST['objet'])
        ) {
        http_response_code(400);
        echo json_encode(['error' => 'Numéro et motif de rejet requis']);
        exit;
    }
    
    try {
        // Assurez-vous que la méthode existe dans CourrierRejetes
        $success = $courrierSupprimes->create_courrier_supprime(
            $_POST['num_courrier'], 
            $_POST['date_courrier'],
            $_POST['objet']
        );
        
        if (!$success) {
            throw new Exception("Échec de l'insertion");
        }
        
        // Réponse JSON claire
        echo json_encode([
            'success' => true,
            'message' => 'Rejet enregistré',
            'insert_id' => $db->lastInsertId() // Retourne l'ID créé
        ]);
        exit; // IMPORTANT
        
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage(),
            'debug' => $_POST // Pour vérifier les données reçues
        ]);
        exit;
    }

    
}
elseif($_POST['method'] === 'creation_user'){
    if (empty($_POST['id']) ) {
        http_response_code(400);
        echo json_encode(['error' => 'Erreur']);
        exit;
    }
    
    try {

        if($_POST['role'] === "A"){
            $result = $user->inscrire
            ($_POST['id'] , $_POST['nom'],$_POST['prenom'], $_POST['email'], $_POST['password'],
             $_POST['service'], "agent", $_POST['unite']);

        }
        elseif($_POST['role'] === "R"){
             $result = $user->inscrire
            ($_POST['id'] , $_POST['nom'],$_POST['prenom'], $_POST['email'], $_POST['password'],
             $_POST['service'], "responsable", $_POST['unite']);

        }

        echo json_encode([
            'success' => true,
            'message' => 'Utilisateur cree par succes',
            'insert_id' => $db->lastInsertId() // Retourne l'ID créé
        ]);
        exit; // IMPORTANT
        
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage(),
            'debug' => $_POST // Pour vérifier les données reçues
        ]);
        exit;
    }
}


$pdfFile = $_FILES['fichier_pdf'] ?? null;

// Validation minimale
if (!$pdfFile || empty($_POST['numero_courrier']) || empty($_POST['emetteur'])) {
    http_response_code(400);
    echo json_encode(["error" => "Fichier PDF, numéro et émetteur requis"]);
    exit;
}

// Traitement du fichier
$uploadDir = 'uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}
$fileName = uniqid() . '.pdf';
$filePath = $uploadDir . $fileName;

if (!move_uploaded_file($pdfFile['tmp_name'], $filePath)) {
    http_response_code(500);
    echo json_encode(["error" => "Échec de l'upload du PDF"]);
    exit;
}

// Insertion en base
if ($_POST['method'] === 'c_d') {
    try {
        $success = $courrier->create_depart(
            $_POST['numero_courrier'],
            $_POST['date_courrier'] ?? date('Y-m-d'),
            $_POST['objet'] ?? '',
            'Diffuse',
            $filePath,
            'depart',
            $_POST['id_createur']

        );

        if ($success) {
            $emetteur->crerEmetteur_interne($_POST['numero_courrier'], $_POST['emetteur']);
            if (!empty($destinatairesInternes)) {
                foreach ($destinatairesInternes as $dest) {
                    $recepteur->crerRecepteur_interne($_POST['numero_courrier'], $dest);
                }
                foreach ($destinatairesExternes as $dest) {
                    $recepteur->crerRecepteur_externe($_POST['numero_courrier'], $dest);
                }
            }
        }

        // Réponse JSON UNIQUE (pas de débogage avant)
        echo json_encode([
            "success" => $success,
            "message" => "Succès",
            "destinataires_internes" => $destinatairesInternes,
            "destinataires_externes" => $destinatairesExternes
        ]);

    exit;

    } catch (Exception $e) {
        unlink($filePath); // Supprime le fichier en cas d'erreur
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
        exit;
    }
} 

elseif ($_POST['method'] === 'c_a') {

    try {

        $success_arri = $courrier->create_arrrivee(
            $_POST['numero_courrier'],
            $_POST['date_courrier'] ?? date('Y-m-d'),
            $_POST['objet'] ?? '',
            'en_cours',
            $filePath,
            'arrive',
             $_POST['id_createur']


        );

        if ($success_arri) {

            if ($_POST['typeEmetteur'] === "I") {
                $emetteur->crerEmetteur_interne($_POST['numero_courrier'], $_POST['emetteur']);
            } elseif ($_POST['typeEmetteur'] === "E") {
                $emetteur->crerEmetteur_externe($_POST['numero_courrier'], $_POST['emetteur']);
            }
        }



        // Réponse JSON UNIQUE (pas de débogage avant)
             echo json_encode([
            "success" => $success_arri,
            "message" => "Succès"
        ]);
        exit;

    }
    
    catch (Exception $e) {
        unlink($filePath); // Supprime le fichier en cas d'erreur
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}


}
    elseif( isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'DELETE') {
  
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    
    if(!isset($input['num_courrier']) || empty($input['num_courrier'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Numéro de courrier requis']);
        exit;
    }

    try {
        $success = $courrier->delete($input['num_courrier']);
        
        if (!$success) {
            http_response_code(500);
            echo json_encode(['error' => 'Échec de la suppression du courrier']);
        }
        
        // Suppression réussie
        echo json_encode(['success' => true, 'message' => 'Courrier supprimé avec succès']);
        exit;

        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }


}