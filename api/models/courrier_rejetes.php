<?php
class CourrierRejetes {
    private $conn;
    private $table = "courrier_rejetes";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function insert_courrrierrejetes($num, $rejection) {
        $query = "INSERT INTO ".$this->table." 
                 (num_courrier, Motif_rejection) 
                 VALUES (?, ?)";
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$num, $rejection]);
    }
   
    public function afficher_motif_rejection_num($num) {
    $query = "SELECT Motif_rejection , date_rejeect
              FROM " . $this->table . " 
              WHERE num_courrier = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->execute([$num]);
    return $stmt;
}


    


   
}
/*



*/