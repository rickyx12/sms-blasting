<?php

class Inbox_model extends CI_Model {

    public function __construct() {
            $this->load->database();
    }

	public function save_message($data) {
		$sql = "INSERT INTO messages(sender, messages, received, is_read) VALUES (?,?,?,?)";
		$this->db->query($sql, $data);			
	}

	public function showAll() {

		$sql = "SELECT * FROM messages";

		return $this->db->query($sql);
	}

	public function delete($data) {

		$sql = "DELETE FROM messages WHERE id = ?";
		return $this->db->query($sql,$data);		
	}

}