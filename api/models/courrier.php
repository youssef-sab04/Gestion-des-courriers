<?php
class Courrier {
    private $conn;
    private $table = "courrier";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create_depart($num, $date, $objet, $statut  , $fichier , $type , $id_createur) {
        $query = "INSERT INTO ".$this->table." 
                 (num_courrier, date_courrier, objet , statut , fichier , type_courrier , id_createur) 
                 VALUES (?, ?, ?, ? , ? , ? , ?)";
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$num, $date, $objet, $statut,  $fichier , $type , $id_createur]);
    }

    public function create_arrrivee($num, $date, $objet, $statut  , $fichier , $type , $id_createur ) {
        $query = "INSERT INTO ".$this->table." 
                 (num_courrier, date_courrier, objet , statut , fichier , type_courrier, id_createur) 
                 VALUES (?, ?, ?, ? , ? , ? , ?)";
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$num, $date, $objet, $statut,  $fichier , $type , $id_createur]);
    }

    

    public function get_courrier_recu() {
        $query = "SELECT id_courrier , num_courrier  , date_courrier , objet , Date_insertion
        FROM " . $this->table . " WHERE statut = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute(["en_cours"]);
        return $stmt;

    }

     public function get_courrier_valides() {
        $query = "SELECT id_courrier , num_courrier  , date_courrier , objet , Date_insertion
        FROM " . $this->table . " WHERE statut = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute(["valide"]);
        return $stmt;

    }

     public function get_courrier_Rejetes() {
        $query = "SELECT id_courrier , num_courrier  , date_courrier , objet , Date_insertion
        FROM " . $this->table . " WHERE statut = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute(["rejete"]);
        return $stmt;

    }
 
public function get_courrier_num($num) {
    $query = "SELECT num_courrier, date_courrier, objet 
              FROM " . $this->table . " 
              WHERE num_courrier = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->execute([$num]);
    return $stmt;
}




public function afficher_courrier_num($num) {
    $query = "SELECT num_courrier, date_courrier, objet , annotation
              FROM " . $this->table . " 
              WHERE num_courrier = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->execute([$num]);
    return $stmt;
}


public function afficher_fichier($num_courrier) {
    // 1. Récupération du chemin
    $stmt = $this->conn->prepare("SELECT fichier FROM courrier WHERE num_courrier = ?");
    $stmt->execute([$num_courrier]);
    $chemin_relatif = $stmt->fetchColumn();

    // 2. Chemin ABSOLU exact selon votre structure
    $chemin_absolu = $_SERVER['DOCUMENT_ROOT'].'/Essaie/api/controllers/'.$chemin_relatif;

    // 3. Vérification rigoureuse
    if (!file_exists($chemin_absolu)) {
        throw new Exception("Fichier introuvable ici: ".$chemin_absolu);
    }

    // 4. Envoi avec vérification PDF
    $mime = mime_content_type($chemin_absolu);
    if ($mime !== 'application/pdf') {
        throw new Exception("Le fichier n'est pas un PDF valide (type détecté: $mime)");
    }

    header('Content-Type: application/pdf');
    header('Content-Length: '.filesize($chemin_absolu));
    readfile($chemin_absolu);
    exit;
}

  public function valider_courrier($num) {
        $query = "UPDATE ".$this->table." 
                 SET statut = 'valide' 
                 WHERE num_courrier = ?";
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$num]);
    }

      public function create_annotation($num , $annotations) {
        $query = "UPDATE ".$this->table." 
                    SET Annotation = ? 
                    WHERE num_courrier = ?
                 ";
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$annotations ,  $num ]);

    }
      public function Rejeter_courrier($num) {
        $query = "UPDATE ".$this->table." 
                 SET statut = 'rejete' 
                 WHERE num_courrier = ?";
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$num]);
    }

    public function delete($num_courrier) {
    $query = "DELETE FROM ".$this->table." WHERE num_courrier = ?";
    $stmt = $this->conn->prepare($query);
    return $stmt->execute([$num_courrier]);
}

      public function Diffuser_courrier($num) {
        $query = "UPDATE ".$this->table." 
                 SET statut = 'diffuse' 
                 WHERE num_courrier = ?";
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$num]);
    }

    public function afficher_courrier_diff() {
    $query = "SELECT *
              FROM " . $this->table . " 
              WHERE statut = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->execute(["Diffuse"]);
    return $stmt;
}
//type_courrier

    public function count_valide($type = "valide") {
    $query = "SELECT COUNT(*) as totalVal FROM " . $this->table . " WHERE statut = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->execute([$type]);
    $result = $stmt->fetch();
    return $result['totalVal'];
}
    public function count_rejete($type = "rejete") {
    $query = "SELECT COUNT(*) as totalRej FROM " . $this->table . " WHERE statut = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->execute([$type]);
    $result = $stmt->fetch();
    return $result['totalRej'];
}

    public function count_diffusee($type = "diffuse") {
    $query = "SELECT COUNT(*) as totalDff FROM " . $this->table . " WHERE statut = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->execute([$type]);
    $result = $stmt->fetch();
    return $result['totalDff'];
}

    public function count_ddepart($type = "depart") {
    $query = "SELECT COUNT(*) as totalDep FROM " . $this->table . " WHERE type_courrier = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->execute([$type]);
    $result = $stmt->fetch();
    return $result['totalDep'];
}

    public function count_arrive($type = "arrive") {
    $query = "SELECT COUNT(*) as totalArr FROM " . $this->table . " WHERE type_courrier = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->execute([$type]);
    $result = $stmt->fetch();
    return $result['totalArr'];
}





}
/*



*/