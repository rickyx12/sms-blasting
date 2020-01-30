<?php

class Information_model extends CI_Model {

    public function __construct() {
            $this->load->database();
    }

	public function add($data) {
		$sql = "INSERT INTO sms(sms_id,ipaddress,cp_number) VALUES (?,?,?)";
		$this->db->query($sql, $data);	
	}

	public function delete() {

		$sql = "DELETE FROM sms";
		return $this->db->query($sql);	
	}

}