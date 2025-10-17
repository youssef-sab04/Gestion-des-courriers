<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/database.php';
require_once '../models/user.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    http_response_code(400);
    echo json_encode(["message" => "Données invalides"]);
    exit;
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        if (!isset($data->action)) {
            http_response_code(400);
            echo json_encode(["message" => "Action non spécifiée"]);
            exit;
        }

        if ($data->action == 'login') {
            if (!isset($data->email) || !isset($data->password)) {
                http_response_code(400);
                echo json_encode(["message" => "Email et mot de passe requis"]);
                exit;
            }

            if ($user->Seconnecter($data->email, $data->password)) {
                echo json_encode([
                    "success" => true,
                    "message" => "Connexion réussie",
                    "role" => $_SESSION['user_role'],
                    "user_id" => $_SESSION['user_id'],
                    "token" => $_SESSION['token']
                ]);
            } else {
                http_response_code(401);
                echo json_encode([
                    "success" => false,
                    "message" => "Email ou mot de passe incorrect",
                    "debug" => "Vérifiez vos identifiants"
                ]);
            }
        } elseif ($data->action == 'logout') {
            $user->SeDeconnecter();
            echo json_encode([
                "success" => true,
                "message" => "Déconnexion réussie"
            ]);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Action non reconnue"]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(["message" => "Méthode non autorisée"]);
}
?>