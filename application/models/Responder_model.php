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

	public function search($data) {

		$sql = "SELECT reply FROM responder WHERE keywords = ?";

		return $this->db->query($sql,$data);
	}

	public function delete($data) {

		$sql = "DELETE FROM responder WHERE id = ?";
		return $this->db->query($sql,$data);	
		$this->db->close();
	}

	public function isOn() {

		$sql = "SELECT * FROM responder WHERE status = 1";

		return $this->db->query($sql);		
	}

	public function update($data) {

		$sql = "UPDATE responder SET status = ? WHERE id = ?";

		return $this->db->query($sql,$data);		
	}

}