<?php
require_once '../config/database.php';
require_once 'uniteexterne.php';

$database = new Database();
$db = $database->getConnection();

$uniteExterne = new Unite_externe($db);

$unites = 
[
    // Unités externes (ministères et partenaires)
    [
        'id_unite' => 'E112',
        'description_francais' => 'Ministère de la Santé - Coordination des politiques sanitaires nationales',
        'description_arabe' => 'وزارة الصحة - تنسيق السياسات الصحية الوطنية',
    ],
    [
        'id_unite' => 'E429',
        'description_francais' => 'Agence Nationale des Médicaments - Régulation et contrôle pharmaceutique',
        'description_arabe' => 'الوكالة الوطنية للأدوية - تنظيم ومراقبة المنتجات الصيدلانية',
    ],
    [
        'id_unite' => 'E753',
        'description_francais' => 'Organisme National d\'Assurance Maladie - Gestion des remboursements',
        'description_arabe' => 'المؤسسة الوطنية للتأمين الصحي - إدارة التعويضات',
    ],
    [
        'id_unite' => 'E286',
        'description_francais' => 'Institut Pasteur - Recherche en maladies infectieuses',
        'description_arabe' => 'معهد باستور - البحث في الأمراض المعدية',
    ],
    [
        'id_unite' => 'E647',
        'description_francais' => 'Croissant Rouge National - Urgences et actions humanitaires',
        'description_arabe' => 'الهلال الأحمر الوطني - الطوارئ والأعمال الإنسانية',
    ],
    [
        'id_unite' => 'E935',
        'description_francais' => 'OMS Bureau Régional - Coopération internationale en santé',
        'description_arabe' => 'مكتب منظمة الصحة العالمية الإقليمي - التعاون الصحي الدولي',
    ]
    ];

    foreach ($unites as $uni) {
    $result = $uniteExterne->creer_uniteexterne(
        
        $uni['id_unite'],
        $uni['description_francais'],
        $uni['description_arabe'],

    );

    if ($result) {
        echo "Utilisateur {$uni['id_unite']} créé avec succès.<br>";
    } else {
        echo "Échec de la création pour {$uni['id_unite']}<br>";
    }
   }

?>

