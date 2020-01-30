<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Information extends CI_Controller {

 	public function __construct() {
 		parent::__construct();
 		$this->load->helper('url');
 		$this->load->model('information_model');
 	}

	public function index()
	{

 		$data = array(
 			"page" => "information-nav"
 		);			

		$this->load->view('includes/header',$data);
		$this->load->view('information/index');
		$this->load->view('includes/footer');
	}


	public function store_sms() {

		$smsId = $this->input->post('smsId');
		$ipaddress = $this->input->post('ipaddress');
		$cpNumber = $this->input->post('cpNumber');

		$data = array(
			$smsId,
			$ipaddress,
			$cpNumber
		);

		$this->information_model->add($data);
	}

	public function delete_sms() {

		$this->information_model->delete();
	}

}
