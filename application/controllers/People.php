<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class People extends CI_Controller {

 	public function __construct() {
 		parent::__construct();
 		$this->load->helper('url');
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
		$contact = $this->input->post('contact');
        $groups = $this->input->post('groups');

		if($name != "" || $contact != "") {

			$data = array($name,$contact,$groups);
			$this->people_model->add($data);

			$response = array("status" => "success", "message" => "successfully added.");
		}else {
			$response = array("status" => "error", "message" => "Please complete the form.");
		}

		echo json_encode($response);
	}

    public function peopleJSON() {

        $this->isLogged();

        $draw = $this->input->get('draw');
        $start = $this->input->get('start');
        $length = $this->input->get('length');
        $search = $this->input->get('search')['value'];

        $data = array(
            "draw" => $draw,
            "recordsTotal" => $this->people_model->getPeople(null,null,null)->num_rows(),
            "recordsFiltered" => $this->people_model->getPeople(null,null,null)->num_rows(),
            "data" => $this->people_model->getPeople($start,$length,$search)->result()
        );

        echo json_encode($data);            
    }	


    public function update() {

    	$id = $this->input->post('peopleId');
    	$name = $this->input->post('name');
    	$contact = $this->input->post('contact');
        $groups = $this->input->post('groups');

    	if($name != "" || $contact != "") {

    		$data = array($name,$contact,$groups,$id);
    		$this->people_model->update($data);

    		$response = array("status" => "success","message" => "successfully updated.");
    	}else {
    		$response = array("status" => "error","message" => "error.");
    	}

    	echo json_encode($response);
    }


    public function delete() {

    	$id = $this->input->post("people");

    	$this->people_model->delete(array($id));

    	$response = array("status" => "success", "message" => "successfully deleted.");

    	echo json_encode($response);
    }

}
