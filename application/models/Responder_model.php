<?php

class Responder_model extends CI_Model {

    public function __construct() {
            $this->load->database();
    }

	public function add($data) {
		$sql = "INSERT INTO responder(keywords,reply) VALUES (?,?)";
		$this->db->query($sql, $data);	
	}

	public function getAll() {

		$sql = "SELECT * FROM responder";

		return $this->db->query($sql);
	}

	public function delete($data) {

		$sql = "DELETE FROM responder WHERE id = ?";
		return $this->db->query($sql,$data);	
		$this->db->close();
	}

}