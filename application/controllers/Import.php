<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Import extends CI_Controller {

 	public function __construct() {

 		parent::__construct();
 		$this->load->helper('url');
 		$this->load->library('CSVReader');
 		$this->load->library('session');
 		$this->load->model('groups_model');
 		$this->load->model('people_model');
 	}

        private function isLogged() {

            if(!$this->session->has_userdata('id')) {
                    redirect('Account/login');
            }
        }

	public function index()	{

		$this->isLogged();

		$data = array(
			'page' => 'settings-page',
		);

		$this->load->view('includes/header',$data);
		$this->load->view('settings/import/index');
		$this->load->view('includes/footer');
	}

	public function excel() {

		$this->isLogged();

		$index = 0;

		if(is_uploaded_file($_FILES['csvFile']['tmp_name'])) {

			$csvData = $this->csvreader->parse_csv($_FILES['csvFile']['tmp_name']);
			$contactArr = array();
			$contactArr1 = array();

			if(!empty($csvData)) {

				$filename = $_FILES['csvFile']['name'];
				$name = pathinfo($filename, PATHINFO_FILENAME);

				if($this->groups_model->getGroupByName(array($name))->num_rows() == 0) {
					
					$groupId = $this->groups_model->add($name);

					foreach($csvData as $row) {

						$data = array($row['name'], $row['contact'], $groupId);
						$this->people_model->add($data);
					}

					$data = array('status' => 'success', 'message' => 'Import Successful<br>Groupd Name: '.$name);

				}else {
					$data = array('status' => 'error', 'message' => 'Filename exist. <br>Please change the filename first.');
				}
			}else {
				$data = array('status' => 'error', 'message' => 'Please select CSV file.');
			}

			echo json_encode($data);
		}
	}

}
