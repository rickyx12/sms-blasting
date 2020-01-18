<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inbox extends CI_Controller {

 	public function __construct() {
 		parent::__construct();
 		$this->load->helper('url');
 		$this->load->model('inbox_model');
 	}

	public function index() {

 		$data = array(
 			"page" => "inbox-nav"
 		);

		$this->load->view('includes/header',$data);
		$this->load->view('inbox/index');
		$this->load->view('includes/footer');
	}

	public function saveMessage() {

		$index = $this->input->post('index');
		$sender = $this->input->post('sender');
		$message = $this->input->post('message');
		$timeRec = $this->input->post('timeRec');
		$dateRec = $this->input->post('dateRec');
		$isRead = $this->input->post('isRead');

		$formatDateRec = explode("/",$dateRec);
		$formatDateRec1 = $formatDateRec[0]."-".$formatDateRec[1]."-".$formatDateRec[2]." ".$timeRec;

		$data = array(
			$sender,
			$message,
			$formatDateRec1,
			$isRead
		);

		$this->inbox_model->save_message($data);

		$data = array('status' => 'success', 'message' => $index);
		echo json_encode($data);
	}

	public function showAll() {

		$messages = $this->inbox_model->showAll()->result();
		echo json_encode($messages);	
	}

	public function delete() {

		$id = $this->input->post('id');

		$this->inbox_model->delete(array($id));
		$data = array('status' => 'success', 'messages' => 'OK');
		echo json_encode($data);
	}

}
