<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Groups extends CI_Controller {

 	public function __construct() {
 		parent::__construct();
 		$this->load->helper('url');
 		$this->load->model('groups_model');
        $this->load->model('people_model');
 		$this->load->library('session');
 	}

    private function isLogged() {

        if(!$this->session->has_userdata('id')) {
                redirect('Account/login');
        }
    }



	public function add() {

		$this->isLogged();

		$name = $this->input->post('name');

		if($name != "") {

			$data = array($name);
			$this->groups_model->add($data);

			$response = array("status" => "success", "message" => "successfully added.");
		}else {
			$response = array("status" => "error", "message" => "Please complete the form.");
		}

		echo json_encode($response);
	}

    public function groupsJSON() {

        $this->isLogged();

        $draw = $this->input->get('draw');
        $start = $this->input->get('start');
        $length = $this->input->get('length');
        $search = $this->input->get('search')['value'];

        $data = array(
            "draw" => $draw,
            "recordsTotal" => $this->groups_model->getGroups(null,null,null)->num_rows(),
            "recordsFiltered" => $this->groups_model->getGroups(null,null,null)->num_rows(),
            "data" => $this->groups_model->getGroups($start,$length,$search)->result()
        );

        echo json_encode($data);            
    }	

    public function groupsJSON1() {

        $this->isLogged();

        $data = $this->groups_model->getGroups("","","")->result();

        echo json_encode($data);            
    }

    public function getPeopleByGroup() {

        $this->isLogged();

        $group = $this->input->post("groupId");

        $data = $this->people_model->getPeopleByGroup("","","",$group)->result();

        echo json_encode($data);            
    }

    public function update() {

    	$id = $this->input->post('groupsId');
    	$name = $this->input->post('name');

    	if($name != "") {

    		$data = array($name,$id);
    		$this->groups_model->update($data);

    		$response = array("status" => "success","message" => "successfully updated.");
    	}else {
    		$response = array("status" => "error","message" => "error.");
    	}

    	echo json_encode($response);
    }


    public function delete() {

    	$id = $this->input->post("groups");

    	$this->groups_model->delete(array($id));

    	$response = array("status" => "success", "message" => "successfully deleted.");

    	echo json_encode($response);
    }

}
