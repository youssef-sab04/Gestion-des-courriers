<?php
require_once '../config/database.php';
require_once 'uniteinterne.php';

$database = new Database();
$db = $database->getConnection();

$uniteinterne = new Unite_interne($db);


$unites = [
    // Sections
    [
        'id_unite' => 'S315',
        'description_francais' => 'Section Audit Interne - Contrôle des processus et vérification de la conformité',
        'description_arabe' => 'القسم التدقيق الداخلي - مراقبة العمليات والتحقق من الامتثال',
    ],
    [
        'id_unite' => 'S642',
        'description_francais' => 'Section Contrôle de Gestion - Analyse des performances et gestion budgétaire',
        'description_arabe' => 'قسم مراقبة التسيير - تحليل الأداء وإدارة الميزانية',
    ],
    [
        'id_unite' => 'S971',
        'description_francais' => 'Section Management de la Qualité - Amélioration continue et certification qualité',
        'description_arabe' => 'قسم إدارة الجودة - التحسين المستمر وشهادات الجودة',
    ],
    [
        'id_unite' => 'S184',
        'description_francais' => 'Section Communication et Coopération - Gestion des relations internes et externes',
        'description_arabe' => 'قسم التواصل والتعاون - إدارة العلاقات الداخلية والخارجية',
    ],
    [
        'id_unite' => 'S527',
        'description_francais' => 'Section Pharmacie Centrale - Gestion des médicaments et dispositifs médicaux',
        'description_arabe' => 'قسم الصيدلية المركزية - إدارة الأدوية والأجهزة الطبية',
    ],

    // Divisions
    [
        'id_unite' => 'D739',
        'description_francais' => 'Division des Affaires Financières - Gestion comptable et financière',
        'description_arabe' => 'قسم الشؤون المالية - الإدارة المحاسبية والمالية',
    ],
    [
        'id_unite' => 'D153',
        'description_francais' => 'Division d\'Approvisionnement et Logistique - Achats et gestion des stocks',
        'description_arabe' => 'قسم التموين واللوجستيك - المشتريات وإدارة المخزون',
    ],
    [
        'id_unite' => 'D468',
        'description_francais' => 'Division des Ressources Humaines - Recrutement et formation du personnel',
        'description_arabe' => 'قسم الموارد البشرية - التوظيف وتدريب الموظفين',
    ],
    [
        'id_unite' => 'D826',
        'description_francais' => 'Division du Patrimoine - Gestion des bâtiments et équipements',
        'description_arabe' => 'قسم الأملاك - إدارة المباني والمعدات',
    ],
    [
        'id_unite' => 'D394',
        'description_francais' => 'Division des Systèmes d\'Information - Informatique et gestion des données',
        'description_arabe' => 'قسم نظم المعلومات - المعلوماتية وإدارة البيانات',
    ],
    [
        'id_unite' => 'D657',
        'description_francais' => 'Division Recherche et Innovation - Formation médicale et recherche scientifique',
        'description_arabe' => 'قسم البحث والابتكار - التدريب الطبي والبحث العلمي',
    ],

    // Hôpitaux
    [
        'id_unite' => 'H842',
        'description_francais' => 'Hôpital des Spécialités - Prise en charge des pathologies complexes',
        'description_arabe' => 'مستشفى التخصصات - علاج الأمراض المعقدة',
    ],
    [
        'id_unite' => 'H125',
        'description_francais' => 'Hôpital Mère-Enfant - Soins dédiés aux mères et nouveaux-nés',
        'description_arabe' => 'مستشفى الأم والطفل - رعاية مخصصة للأمهات والمواليد',
    ],
    [
        'id_unite' => 'H369',
        'description_francais' => 'Hôpital d\'Oncologie - Diagnostic et traitement des cancers',
        'description_arabe' => 'مستشفى الأورام - تشخيص وعلاج السرطانات',
    ],
    [
        'id_unite' => 'H584',
        'description_francais' => 'Hôpital Omar Driss - Médecine générale et urgences',
        'description_arabe' => 'مستشفى عمر ادريس - الطب العام والطوارئ',
    ],
    [
        'id_unite' => 'H713',
        'description_francais' => 'Hôpital Ibn Al Hassan - Soins de longue durée et gériatrie',
        'description_arabe' => 'مستشفى ابن الحسن - رعاية طويلة الأمد وطب المسنين',
    ]
    ];


    foreach ($unites as $uni) {
    $result = $uniteinterne->creer_uniteinterne(
        
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

