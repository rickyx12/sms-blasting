<?php

class Groups_model extends CI_Model {

    public function __construct() {
            $this->load->database();
    }

	public function add($data) {
		$sql = "INSERT INTO groupcontact(name) VALUES (?)";
		$this->db->query($sql, $data);
		return $this->db->insert_id();			
	}

	public function getGroupByName($data) {
		$sql = "SELECT * FROM groupcontact WHERE name = ?";
		return $this->db->query($sql, $data);	
	}

	public function getGroups($start,$length,$search) {

		$start1 = $this->db->escape_str($start);
		$length1 = $this->db->escape_str($length);
		$search1 = $this->db->escape_str($search);

		if($length != null || $length != "") {

			if($search1 != "") {
				$sql = "SELECT * FROM groupcontact WHERE name LIKE '".$search1."%' AND status = 1 ORDER BY id DESC LIMIT ".$start1.",".$length1;
			}else{
				$sql = "SELECT * FROM groupcontact WHERE status = 1 ORDER BY id DESC LIMIT ".$start1.",".$length1;
			}
		
		}else {
			$sql = "SELECT * FROM groupcontact WHERE status = 1";
		}
		return $this->db->query($sql);
	}

	public function update($data) {

		$sql = "UPDATE groupcontact SET name = ? WHERE id = ?";
		$this->db->query($sql,$data);		
	}

	public function delete($data) {

		$sql = "UPDATE groupcontact SET status = 0 WHERE id = ?";
		$this->db->query($sql,$data);		
	}

}