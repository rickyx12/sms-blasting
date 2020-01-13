<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Compose extends CI_Controller {

 	public function __construct() {
 		parent::__construct();
 		$this->load->helper('url');
 	}

	public function index()
	{

 		$data = array(
 			"page" => "compose-nav"
 		);			

		$this->load->view('includes/header',$data);
		$this->load->view('compose/index');
		$this->load->view('includes/footer');
	}


	private function sendSMS($cpNumber,$message) {

		//Initialize cURL.
		$ch = curl_init();
		 
		//Set the URL that you want to GET by using the CURLOPT_URL option.
		curl_setopt($ch, CURLOPT_URL, $this->config->item('sms_gateway').'action_page?cpNumber='.$cpNumber.'&message='.$message);
		 
		//Set CURLOPT_RETURNTRANSFER so that the content is returned as a variable.
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		 
		//Set CURLOPT_FOLLOWLOCATION to true to follow redirects.
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		 
		//Execute the request.
		$data = curl_exec($ch);
		 
		//Close the cURL handle.
		curl_close($ch);
		 
		// Print the data out onto the page.
		return $data;
	}

	public function toSend() {

		$cpNumber = $this->input->post('cpNumber');
		$message = $this->input->post('message');

		$cpNumber1 = urlencode($cpNumber);
		$message1 = urlencode($message);	

		echo $this->sendSMS($cpNumber1,$message1);
	}
}