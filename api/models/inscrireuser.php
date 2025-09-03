<?php
require_once '../config/database.php';
require_once 'user.php';

// Connexion à la base
$database = new Database();
$db = $database->getConnection();

// Création instance User
$userManager = new User($db);

// Données des utilisateurs à créer
$users = [
    // Agents
    [
        'id_user' => 'A282',
        'nom' => 'Dupont',
        'prenom' => 'Jean',
        'email' => 'agent1@mail.com',
        'password' => 'azerty123',
        'service' => 'Comptabilité',
        'type' => 'agent',
        'id_unite' => 'D739'
    ],
    [
        'id_user' => 'B545',
        'nom' => 'Martin',
        'prenom' => 'Sophie',
        'email' => 'agent2@mail.com',
        'password' => 'qwerty456',
        'service' => 'Ressources Humaines',
        'type' => 'agent',
        'id_unite' => 'S642'
    ],

    // Responsables
    [
        'id_user' => 'D344',
        'nom' => 'Durand',
        'prenom' => 'Pierre',
        'email' => 'respo1@mail.com',
        'password' => 'admin123',
        'service' => 'Direction',
        'type' => 'responsable',
        'id_unite' => 'D468'
    ],
    [
        'id_user' => 'D909',
        'nom' => 'Leroy',
        'prenom' => 'Marie',
        'email' => 'respo2@mail.com',
        'password' => 'secret789',
        'service' => 'Management',
        'type' => 'responsable',
        'id_unite' => 'H125'
    ]
];

// Insertion des utilisateurs
foreach ($users as $userData) {
    $result = $userManager->inscrire(
        
        $userData['id_user'],
        $userData['nom'],
        $userData['prenom'],
        $userData['email'],
        $userData['password'],
        $userData['service'],
        $userData['type'],
        $userData['id_unite']
    );

    if ($result) {
        echo "Utilisateur {$userData['email']} créé avec succès.<br>";
    } else {
        echo "Échec de la création pour {$userData['email']}<br>";
    }
}
