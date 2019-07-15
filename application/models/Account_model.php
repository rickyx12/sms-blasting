<?php

class Account_model extends CI_Model {

    public function __construct() {
            $this->load->database();
    }

	public function create($data) {
		$sql = "INSERT INTO users(username,password,added) VALUES (?,?,?)";
		$this->db->query($sql, $data);			
	}

}