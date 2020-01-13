<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Responder extends CI_Controller {

 	public function __construct() {
 		parent::__construct();
 		$this->load->helper('url');
 		$this->load->model('responder_model');
 	}

	public function index()
	{

 		$data = array(
 			"page" => "responder-nav"
 		);			

		$this->load->view('includes/header',$data);
		$this->load->view('responder/index');
		$this->load->view('includes/footer');
	}

	public function getAll() {

		$data = $this->responder_model->getAll()->result();
		echo json_encode($data);
	}

	public function add() {

		$keyword = $this->input->post('keyword');
		$message = $this->input->post('message');

		$data = array($keyword, $message);

		$this->responder_model->add($data);

		$data = array('status' => 'success', 'message' => 'Success');
		echo json_encode($data);
	}	

	public function updateStatus() {

		$responderId = $this->input->post('responderId');
		$status = $this->input->post('status');
		$updateStatus = null;

		if($status == 1) {
			$updateStatus = 0;
		}else {
			$updateStatus = 1;
		}

		$data = array($updateStatus,$responderId);
		$this->responder_model->update($data);
		$resp = array('status' => 'success','message' => 'Success');
		echo json_encode($resp);
	}

	public function delete() {

		$responderId = $this->input->post('responderId');

		$this->responder_model->delete(array($responderId));

		$data = array('status' => 'success', 'message' => 'Success');
		echo json_encode($data);
	}

	public function isOn() {

		$data = $this->responder_model->isOn()->num_rows();

		if($data > 0) {
			$result = array('status' => 'success', 'message' => 1);
		}else {
			$result = array('status' => 'success', 'message' => 0);
		}

		echo json_encode($result);
	}

	public function search() {

		$keyword = $this->input->post('keyword');

		if($this->responder_model->search($keyword)->num_rows() > 0) {
			$data = $this->responder_model->search($keyword)->row()->reply;
			$result = array('status' => 'success', 'message' => $data);
		}else {
			$result = array('status' => 'error', 'message' => 'null');
		}

		echo json_encode($result);
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
