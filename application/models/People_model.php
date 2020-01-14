<?php

class People_model extends CI_Model {

    public function __construct() {
            $this->load->database();
    }

	public function add($data) {
		$sql = "INSERT INTO people(name,contact,group_contact) VALUES (?,?,?)";
		$this->db->query($sql, $data);			
	}

	public function getPeople($start,$length,$search) {

		$start1 = $this->db->escape_str($start);
		$length1 = $this->db->escape_str($length);
		$search1 = $this->db->escape_str($search);

		if($length != null || $length != "") {

			if($search1 != "") {
				
				$sql = "
				SELECT p.id, p.name, p.contact, gc.name as groups 
				FROM people p 
				LEFT JOIN groupcontact gc 
				ON p.group_contact = gc.id
				WHERE p.name LIKE '".$search1."%'
				AND p.status = 1 
				ORDER BY p.id DESC 
				LIMIT ".$start1.",".$length1;
			}else{
				
				$sql = "
				SELECT p.id, p.name, p.contact, gc.name as groups 
				FROM people p 
				LEFT JOIN groupcontact gc 
				ON p.group_contact = gc.id
				WHERE p.status = 1 
				ORDER BY p.id DESC 
				LIMIT ".$start1.",".$length1;
			}
		
		}else {
			$sql = "SELECT * FROM people WHERE status = 1";
		}
		return $this->db->query($sql);
	}

	public function update($data) {

		$sql = "UPDATE people SET name = ?, contact = ?, group_contact = ? WHERE id = ?";
		$this->db->query($sql,$data);		
	}

	public function delete($data) {

		$sql = "UPDATE people SET status = 0 WHERE id = ?";
		$this->db->query($sql,$data);		
	}

	public function getPeopleByGroup($start,$length,$search,$group) {

		$start1 = $this->db->escape_str($start);
		$length1 = $this->db->escape_str($length);
		$search1 = $this->db->escape_str($search);
		$group1 = $this->db->escape_str($group);

		if($length != null || $length != "") {

			if($search1 != "") {

				$sql = "
				SELECT p.id, p.name, p.contact, gc.name as groups 
				FROM people p 
				LEFT JOIN groupcontact gc 
				ON p.group_contact = gc.id
				WHERE name LIKE '".$search1."%'
				AND p.status = 1 
				AND p.group_contact = '".$group1."'
				ORDER BY p.id DESC 
				LIMIT ".$start1.",".$length1;
			}else{
				
				$sql = "
				SELECT p.id, p.name, p.contact, gc.name as groups 
				FROM people p 
				LEFT JOIN groupcontact gc 
				ON p.group_contact = gc.id
				WHERE p.status = 1
				AND p.group_contact = '".$group1."' 
				ORDER BY p.id DESC 
				LIMIT ".$start1.",".$length1;
			}
		
		}else {

			$sql = "
			SELECT p.id, p.name, p.contact, gc.name as groups 
			FROM people p 
			LEFT JOIN groupcontact gc 
			ON p.group_contact = gc.id
			WHERE p.status = 1
			AND p.group_contact = '".$group1."' 
			ORDER BY p.id DESC";
		}
		return $this->db->query($sql);
	}
}