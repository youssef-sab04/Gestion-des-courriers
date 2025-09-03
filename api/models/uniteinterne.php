<?php

class Unite_interne {
    private $conn;
    private $table_name = "unite_interne";

     public function __construct($db)
    {
        $this->conn = $db;
    }

    public function creer_uniteinterne($id , $desc_fran , $descr_arabe){
         $query = "INSERT INTO " . $this->table_name . " 
                 (id_unite , description_francais , description_arabe) 
                 VALUES 
                 (:id_unite, :description_francais, :description_arabe)";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id_unite', $id);
        $stmt->bindParam(':description_francais', $desc_fran);
        $stmt->bindParam(':description_arabe', $descr_arabe);

        if ($stmt->execute()) {
            return true;
        }
        return false;

    }

            public function count_int() {
    $query = "SELECT COUNT(*) as totaIn FROM " . $this->table_name ;
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetch();
    return $result['totaIn'];
}
    
}

?>