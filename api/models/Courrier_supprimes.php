<?php
class Courrierupprimes {
    private $conn;
    private $table = "courrier_supprimes";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create_courrier_supprime($num, $date, $objet, ) {
        $query = "INSERT INTO ".$this->table." 
                 (num_courrier, date_courrier, objet ) 
                 VALUES (?, ?, ?)";
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$num, $date, $objet]);
    }


public function afficher_courrier_supp() {
    $query = "SELECT *
              FROM " . $this->table;
    $stmt = $this->conn->prepare($query);
    $stmt->execute(); // Il manquait cette ligne importante
    return $stmt;
}
    public function count_delete() {
    $query = "SELECT COUNT(*) as totalsupp FROM " . $this->table ;
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetch();
    return $result['totalsupp'];
}

    }

    


    




   
