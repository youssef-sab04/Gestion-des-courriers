<?php
class User
{
    private $conn;
    private $table_name = "userr";
    public $id_user;
    public $nom;
    public $prenom;
    public $service;
    public $type;
    public $id_unite;
    public $email;
    public $password;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function inscrire($id_user, $nom, $prenom, $email, $mot_de_passe, $service, $type, $id_unite)
    {
        $query = "INSERT INTO " . $this->table_name . " 
                 (id_user, nom, prenom, email, password, service, type, id_unite) 
                 VALUES 
                 (:id_user, :nom, :prenom, :email, :password, :service, :type, :id_unite)";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':id_user', $id_user);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':prenom', $prenom);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password',  $mot_de_passe);
        $stmt->bindParam(':service', $service);
        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':id_unite', $id_unite);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

      public function Seconnecter($email, $password) {
        $query = "SELECT id_user, password, type FROM " . $this->table_name . " 
                 WHERE email = ? AND password =?  LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$email , $password ]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user ) {
            session_start();
            $_SESSION['user_id'] = $user['id_user'];
            $_SESSION['user_role'] = $user['type'];
            return true;
        }
        
        return false;
    } 


    public function count_agent($type = "agent") {
    $query = "SELECT COUNT(*) as totalAg FROM " . $this->table_name . " WHERE type = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->execute([$type]);
    $result = $stmt->fetch();
    return $result['totalAg'];
}
    public function count_res($type = "responsable") {
    $query = "SELECT COUNT(*) as totalRes FROM " . $this->table_name . " WHERE type = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->execute([$type]);
    $result = $stmt->fetch();
    return $result['totalRes'];
}
    public function count_admin($type = "admin") {
    $query = "SELECT COUNT(*) as totalAdm FROM " . $this->table_name . " WHERE type = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->execute([$type]);
    $result = $stmt->fetch();
    return $result['totalAdm'];
}






public function SeDeconnecter() {
    // Détruire complètement la session
    $_SESSION = array();
    
    // Effacer le cookie de session
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    
    // Détruire la session
    return session_destroy();
}

  public function Select_id() {
        $query = "SELECT id_user FROM " . $this->table_name ;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
}
}
?>