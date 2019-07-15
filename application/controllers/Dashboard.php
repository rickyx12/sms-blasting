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
