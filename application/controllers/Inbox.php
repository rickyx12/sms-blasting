<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inbox extends CI_Controller {

 	public function __construct() {
 		parent::__construct();
 		$this->load->helper('url');
 	}

	public function index() {

 		$data = array(
 			"page" => "inbox-nav"
 		);

		$this->load->view('includes/header',$data);
		$this->load->view('inbox/index');
		$this->load->view('includes/footer');
	}







}
