<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {

 	public function __construct() {
 		parent::__construct();
 		$this->load->model('groups_model');
 		$this->load->model('people_model');
 		$this->load->helper('url');
 	}

	public function index()
	{

		$dataArr = [];
		$x = 0;

		foreach($this->groups_model->getGroups(null,null,null)->result() as $group) {

			$x += 1;

			$peopleCount = $this->people_model->getPeopleByGroup(null,null,null,$group->id)->num_rows();
			$dataArr[$x] = array("id" => $group->id ,"name" => $group->name, "count" => $peopleCount);
		}

 		$data = array(
 			"page" => "dashboard-nav", 
 			"groups" => $dataArr
 		);

		$this->load->view('includes/header',$data);
		$this->load->view('dashboard/index');
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

	public function group()
	{

		$groupId = $this->input->get('groupId');
		$groupName = $this->input->get('groupName');

 		$data = array(
 			"page" => "dashboard-nav", 
 			"groupId" => $groupId,
 			"groupName" => $groupName,
 			"members" => $this->people_model->getPeopleByGroup(null,null,null,$groupId)->result()
 		);

		$this->load->view('includes/header',$data);
		$this->load->view('dashboard/group');
		$this->load->view('includes/footer');
	}

}
