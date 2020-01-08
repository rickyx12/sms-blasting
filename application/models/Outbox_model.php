<?php

class Outbox_model extends CI_Model {

    public function __construct() {
            $this->load->database();
    }

	public function add($data) {
		$sql = "INSERT INTO outbox(cpNumber,name,message) VALUES (?,?,?)";
		$this->db->query($sql, $data);	
	}

	public function getAllOutbox() {

		$sql = "SELECT * FROM outbox";

		return $this->db->query($sql);
	}

	public function delete($data) {

		$sql = "DELETE FROM outbox WHERE id = ?";
		return $this->db->query($sql,$data);	
		$this->db->close();
	}

}