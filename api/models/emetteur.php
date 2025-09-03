<?php
class Emetteur {
    private $conn;
    private $table = "emetteur";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crerEmetteur_interne($num, $interne   ) {
        $query = "INSERT INTO ".$this->table." 
                 (num_courrier , id_interne , id_externe	) 
                 VALUES (?, ? , ? )";
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$num, $interne  , null ]);
    }

        public function crerEmetteur_externe($num, $externe   ) {
        $query = "INSERT INTO ".$this->table." 
                 (num_courrier , id_interne , id_externe	) 
                 VALUES (?, ? , ? )";
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$num,    null , $externe ]);
    }

    public function get_emetteur_interne_courrier_num($num) {
    $query = "SELECT id_interne
              FROM " . $this->table . " 
              WHERE num_courrier = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->execute([$num]);
    return $stmt;
}

public function afficher_courrieremetteur_num($num) {
    $query = "SELECT  id_interne , id_externe
              FROM " . $this->table . " 
              WHERE num_courrier = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->execute([$num]);
    return $stmt;
}

    public function delete_emetteur($num_courrier) {
    $query = "DELETE FROM ".$this->table." WHERE num_courrier = ?";
    $stmt = $this->conn->prepare($query);
    return $stmt->execute([$num_courrier]);
}


}
?>