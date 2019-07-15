<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Settings extends CI_Controller {

 	public function __construct() {
 		parent::__construct();
 		$this->load->model("groups_model");
 		$this->load->helper('url');
 		$this->load->library('session');
 	}

    private function isLogged() {

        if(!$this->session->has_userdata('id')) {
                redirect('Account/login');
        }
    }

	public function index()
	{

		$this->isLogged();

		$data = array('page' => 'settings-page');

		$this->load->view('includes/header',$data);
		$this->load->view('settings/index');
		$this->load->view('includes/footer');
	}

	public function people() {

		$this->isLogged();

		$data = array(
			'page' => 'settings-page',
			'groups' => $this->groups_model->getGroups(null,null,null)->result()
		);

		$this->load->view('includes/header',$data);
		$this->load->view('settings/people/index');
		$this->load->view('includes/footer');		
	}

	public function groups() {

		$this->isLogged();

		$data = array('page' => 'settings-page');
	
		$this->load->view('includes/header',$data);
		$this->load->view('settings/groups/index');
		$this->load->view('includes/footer');
	}

	public function test() {
		echo "sent";
	}

}
