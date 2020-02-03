<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Config extends CI_Controller {

	function __construct() {
		parent::__construct();
		$this->load->helper('url');
	}

	private function isLogged() {

		if(!$this->session->has_userdata('id')) {
			redirect('Account/login');
		}

	}

	public function smsDevice() {
		
		$sms = array(
			array(
				"id" => 1,
				"alias" => "SIM1",
				"ipaddress" => "192.168.1.92"
			),
			array(
				"id" => 2,
				"alias" => "SIM2",
				"ipaddress" => "192.168.1.93"
			)			
		);


		// $sms = array(
		// 	array(
		// 		"id" => 1,
		// 		"alias" => "SIM1",
		// 		"ipaddress" => "192.168.1.92",
		// 		"sms_limit" => "7000"
		// 	)		
		// );

		echo json_encode($sms);
	}


}