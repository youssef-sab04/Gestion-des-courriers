<?php
require_once __DIR__.'/config/database.php';
require_once __DIR__.'/models/courrier.php';

$num = $_GET['num'] ?? '';
if (empty($num)) die("Numéro manquant");

$db = (new Database())->getConnection();
$courrier = new Courrier($db);
$courrier->afficher_fichier($num);