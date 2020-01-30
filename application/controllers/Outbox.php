<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Outbox extends CI_Controller {

 	public function __construct() {
 		parent::__construct();
 		$this->load->helper('url');
 		$this->load->model('outbox_model');
 		$this->load->model('inbox_model');
 	}

	public function index()
	{

 		$data = array(
 			"page" => "outbox-nav"
 		);			

		$this->load->view('includes/header',$data);
		$this->load->view('outbox/index');
		$this->load->view('includes/footer');
	}


	public function add() {

		$cpNumber = $this->input->post("cpNumber");
		$name = $this->input->post("name");
		$message = $this->input->post("message");

		$data = array($cpNumber,$name,$message);
		$this->outbox_model->add($data);

		$data = array('status' => 'success', 'message' => 'Success');

		echo json_encode($data);
	}

	public function delete() {

		$id = $this->input->post('id');

		$this->outbox_model->delete(array($id));

		$data = array("status" => "success", "message" => "Success");

		echo json_encode($data);

	}

	private function sendSMS($sms,$cpNumber,$message) {

		//Initialize cURL.
		$ch = curl_init();
		 
		//Set the URL that you want to GET by using the CURLOPT_URL option.
		curl_setopt($ch, CURLOPT_URL,$sms.'/action_page?cpNumber='.$cpNumber.'&message='.$message);
		 
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
		$sms = $this->input->post('sms');

		$cpNumber1 = urlencode($cpNumber);
		$message1 = urlencode($message);	

		if($message == "") {
			echo json_encode(array("status" => "error", "message" => "Pls enter a message"));
		}else {
			echo $this->sendSMS($sms,$cpNumber1,$message1);
		}

	}

	public function getAll() {

		$data = $this->outbox_model->getAllOutbox()->result();

		echo json_encode($data);
	}


	public function saveSent() {

		$cpNumber = $this->input->post('cpNumber');
		$message = $this->input->post('message');
		$messageType = $this->input->post('messageType');
		$systemNumber = $this->input->post('systemNumber');
		$isRead = $this->input->post('isRead');

		if($this->inbox_model->check_thread(array($cpNumber))->num_rows() == 0) {

			$this->inbox_model->new_thread(array($cpNumber));

			$data = array(
				$cpNumber,
				$message,
				date("Y-m-d H:i:s"),
				$this->db->insert_id(),
				$messageType,
				$systemNumber,
				$isRead
			);

			$this->inbox_model->save_message($data);

			$data = array('status' => 'success', 'message' => 'message saved.');

			echo json_encode($data);

		}else {

			$data = array(
				$cpNumber,
				$message,
				date("Y-m-d H:i:s"),
				$this->inbox_model->check_thread(array($cpNumber))->row()->id,
				$messageType,
				$systemNumber,
				$isRead
			);

			$this->inbox_model->save_message($data);

			$data = array('status' => 'success', 'message' => 'message saved.');

			echo json_encode($data);
		}
	}

}
