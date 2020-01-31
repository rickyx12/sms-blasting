<?php

class Outbox_model extends CI_Model {

    public function __construct() {
            $this->load->database();
    }

	public function add($data) {
		$sql = "INSERT INTO outbox(cpNumber,name,message,smsOrder,multiSmsOrder) VALUES (?,?,?,?,?)";
		$this->db->query($sql, $data);	
	}

	public function getAllOutbox() {

		$sql = "SELECT * FROM outbox ORDER BY smsOrder, multiSmsOrder ASC";

		return $this->db->query($sql);
	}

	public function delete($data) {

		$sql = "DELETE FROM outbox WHERE id = ?";
		return $this->db->query($sql,$data);	
		$this->db->close();
	}

}