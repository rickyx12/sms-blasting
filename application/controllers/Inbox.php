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

		$cpNumber = $this->input->post('cpNumber');
		$message = $this->input->post('message');
		$timeRec = $this->input->post('timeRec');
		$dateRec = $this->input->post('dateRec');
		$messageType = $this->input->post('messageType');
		$isRead = $this->input->post('isRead');
		$thread = null;

		if($this->inbox_model->check_thread(array($cpNumber))->num_rows() == 0) {

			$this->inbox_model->new_thread(array($cpNumber));

			$formatDateRec = explode("/",$dateRec);
			$formatDateRec1 = $formatDateRec[0]."-".$formatDateRec[1]."-".$formatDateRec[2]." ".$timeRec;

			$data = array(
				$cpNumber,
				$message,
				$formatDateRec1,
				$this->db->insert_id(),
				$messageType,
				$isRead
			);

			$this->inbox_model->save_message($data);

			$data = array('status' => 'success', 'message' => 'message saved.');

			echo json_encode($data);

		}else {

			$formatDateRec = explode("/",$dateRec);
			$formatDateRec1 = $formatDateRec[0]."-".$formatDateRec[1]."-".$formatDateRec[2]." ".$timeRec;

			$data = array(
				$cpNumber,
				$message,
				$formatDateRec1,
				$this->inbox_model->check_thread(array($cpNumber))->row()->id,
				$messageType,
				$isRead
			);

			$this->inbox_model->save_message($data);

			$data = array('status' => 'success', 'message' => 'message saved.');

			echo json_encode($data);
		}
	}


	public function showAll() {

		$threadArr = array();

		$messages = $this->inbox_model->showAll()->result();

		function my_cmp($a, $b) {
		  if ($a->id == $b->id) {
		    return 0;
		  }
		  return ($a->id < $b->id) ? -1 : 1;
		}		
		
		foreach($messages as $msg) {
			array_push($threadArr, $this->inbox_model->getLastMessage($msg->thread)->row());
		}

		usort($threadArr, "my_cmp");

		echo json_encode(array_reverse($threadArr));	
	}

	public function thread_messages() {

		$thread = $this->input->post('thread');

		$messages = $this->inbox_model->thread_messages(array($thread))->result();
		echo json_encode($messages);
	}

	public function save_sent() {

		$cpNumber = $this->input->post('cpNumber');
		$message = $this->input->post('message');
		$thread = $this->input->post('thread');

		$data = array(
			'cp_number' => $cpNumber,
			'messages' => $message,
			'received' => date('Y-m-d H:i:s'),
			'thread' => $thread,
			'message_type' => 'outbound',
			'is_read' => 1
		);

		$this->inbox_model->save_message($data);
		$data = array('status' => 'success', 'message' => 'sent success');
		echo json_encode($data);
	}

	public function marked_read() {

		$thread = $this->input->post('thread');

		$this->inbox_model->marked_read(array($thread));
		$data = array('status' => 'success', 'message' => 'success');
		echo json_encode($data);
	}

	public function delete() {

		$id = $this->input->post('id');

		$this->inbox_model->delete(array($id));
		$data = array('status' => 'success', 'messages' => 'OK');
		echo json_encode($data);
	}

}
