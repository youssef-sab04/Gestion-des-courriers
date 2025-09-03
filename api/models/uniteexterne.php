<?php

class Unite_externe {
    private $conn;
    private $table_name = "unite_externe";

     public function __construct($db)
    {
        $this->conn = $db;
    }

    public function creer_uniteexterne($id , $desc_fran , $descr_arabe){
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

        public function count_ext() {
    $query = "SELECT COUNT(*) as totaUex FROM " . $this->table_name ;
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetch();
    return $result['totaUex'];
}
    
}

?>