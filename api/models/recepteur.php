<?php

class Recepteur {
    private $conn;
    private $table = "recepteur";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crerRecepteur_interne($num, $interne   ) {
        $query = "INSERT INTO ".$this->table." 
                 (num_courrier , id_interne , id_externe	) 
                 VALUES (?, ? , ? )";
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$num, $interne  , null ]);
    }

     public function crerRecepteur_externe($num, $externe   ) {
        $query = "INSERT INTO ".$this->table." 
                 (num_courrier , id_interne , id_externe	) 
                 VALUES (?, ? , ? )";
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$num, null , $externe]);
    }

    public function getRecepteurByCourrier($num_courrier) {
        $query = "SELECT * FROM ".$this->table." WHERE num_courrier = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$num_courrier]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

        public function delete_recepteur($num_courrier) {
    $query = "DELETE FROM ".$this->table." WHERE num_courrier = ?";
    $stmt = $this->conn->prepare($query);
    return $stmt->execute([$num_courrier]);
}
}
?>