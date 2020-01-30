<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inbox extends CI_Controller {

 	public function __construct() {
 		parent::__construct();
 		$this->load->helper('url');
 		$this->load->model('inbox_model');
 		$this->load->model('people_model');
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
		$systemNumber = $this->input->post('systemNumber');
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
				$systemNumber,
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
				$systemNumber,
				$isRead
			);

			$this->inbox_model->save_message($data);

			$data = array('status' => 'success', 'message' => 'message saved.');

			echo json_encode($data);
		}
	}


	public function showAll() {

		$threadArr = array();
		$messageArr = array();

		$messages = $this->inbox_model->showAll()->result();

		function my_cmp($a, $b) {
		  if ($a['id'] == $b['id']) {
		    return 0;
		  }
		  return ($a['id'] < $b['id']) ? -1 : 1;
		}		
		
		foreach($messages as $msg) {

			$lastMsg = $this->inbox_model->getLastMessage($msg->thread)->row();
			$stripNumber = str_replace("+63","",$lastMsg->cp_number);

			if($this->people_model->getPeopleByNumber($stripNumber)->num_rows() > 0) {
				
				$name = $this->people_model->getPeopleByNumber($stripNumber)->row()->name;
				$group = $this->people_model->getPeopleByNumber($stripNumber)->row()->groups;
				$show = $this->people_model->getPeopleByNumber($stripNumber)->row()->name;
			}else {
				
				$name = "";
				$group = "";

				if(is_numeric($lastMsg->cp_number)) {
					$show = "+63".$lastMsg->cp_number;
				}else {
					$show = $lastMsg->cp_number;
				}
			}

			$lastMessageArr = array(
				"id" => $lastMsg->id,
				"show" => $show,
				"name" => $name,
				"cp_number" => $lastMsg->cp_number,
				"group" => $group,
				"messages" => $lastMsg->messages,
				"received" => $lastMsg->received,
				"thread" => $lastMsg->thread,
				"message_type" => $lastMsg->message_type,
				"is_read" => $lastMsg->is_read
			);

			array_push($threadArr, $lastMessageArr);
		}

		usort($threadArr, "my_cmp");
		echo json_encode(array_reverse($threadArr));	
	}

	public function thread_messages() {

		$thread = $this->input->post('thread');
		$from = $this->input->post('from');
		$to = $this->input->post('to');

		$messages = $this->inbox_model->thread_messages($thread,$from,$to)->result();
		echo json_encode(array_reverse($messages));
	}

	public function thread_unread_messages() {

		$thread = $this->input->post('thread');

		$messages = $this->inbox_model->getUnreadThreadMessage($thread)->result();
		echo json_encode($messages);
	}

	public function save_sent() {

		$cpNumber = $this->input->post('cpNumber');
		$message = $this->input->post('message');
		$thread = $this->input->post('thread');
		$sender = $this->input->post('sender');

		$data = array(
			'cp_number' => $cpNumber,
			'messages' => $message,
			'received' => date('Y-m-d H:i:s'),
			'thread' => $thread,
			'message_type' => 'outbound',
			'sender' => $sender,
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

		$thread = $this->input->post('thread');

		$this->inbox_model->delete_thread(array($thread));
		$this->inbox_model->delete_messages(array($thread));
		$data = array('status' => 'success', 'messages' => 'OK');
		echo json_encode($data);
	}

}
