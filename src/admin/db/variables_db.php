<?php 

class DB{
    private $host;
    private $db;
    private $user;
    private $password;
    private $charset;

    public function __construct() {
        $this->host     = 'localhost';
        $this->db       = 'variables';
        $this->user     = '';
        $this->password = "";
        $this->charset  = '';
    }
    
    function connect() {
        try{


            $connection = "mysql:host=".$this->host.";dbname=" . $this->db
        }
    }
    
}