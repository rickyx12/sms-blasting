<?php

class Inbox_model extends CI_Model {

    public function __construct() {
            $this->load->database();
    }

	public function save_message($data) {
		$sql = "INSERT INTO messages(cp_number, messages, received, thread, message_type, is_read) VALUES (?,?,?,?,?,?)";
		$this->db->query($sql, $data);			
	}

	public function new_thread($data) {
		$sql = "INSERT INTO thread(cp_number) VALUES (?)";
		$this->db->query($sql, $data);			
	}

	public function showAll() {

		$sql = "SELECT * FROM messages GROUP BY cp_number ORDER BY id DESC";

		return $this->db->query($sql);
	}


	public function getLastMessage($data) {

		$sql = "SELECT * FROM messages WHERE thread = ? ORDER BY id DESC LIMIT 1";

		return $this->db->query($sql,$data);
	}

	public function check_thread($data) {

		$sql = "SELECT * FROM thread WHERE cp_number = ?";

		return $this->db->query($sql, $data);
	}

	public function thread_messages($data) {

		$sql = "SELECT * FROM messages WHERE thread = ? ORDER BY id ASC";

		return $this->db->query($sql, $data);		
	}

	public function marked_read($data) {

		$sql = "UPDATE messages SET is_read = 1 WHERE thread = ? AND is_read = 0";
		$this->db->query($sql,$data);		
	}

	public function delete($data) {

		$sql = "DELETE FROM messages WHERE id = ?";
		return $this->db->query($sql,$data);		
	}

}