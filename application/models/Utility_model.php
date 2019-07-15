<?php

class Utility_model extends CI_Model {

    public function __construct() {
            $this->load->database();
    }

	public function selectNow($table,$cols,$condition,$value) {

		$tbl = $this->db->escape_str($table);
		$column = $this->db->escape_str($cols);
		$cond = $this->db->escape_str($condition);
		$val = $this->db->escape_str($value);

		$sql = "SELECT ".$column." FROM ".$tbl." WHERE ".$cond." = '".$val."' ";
		return $this->db->query($sql);		
	}

}