<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Account extends CI_Controller {

	function __construct() {
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('account_model');
		$this->load->model('utility_model');
		$this->load->library('session');
	}

	private function isLogged() {

		if(!$this->session->has_userdata('id')) {
			redirect('Account/login');
		}

	}

	public function login() {
		$this->load->view('login');
	}

	public function loginNow() {

		$username = $this->input->post('username');
		$password = $this->input->post('password');

		$account = $this->utility_model->selectNow('users','id','username',$username)->row();
		$hashPass = $this->utility_model->selectNow('users','password','username',$username)->row();

		if($account->id != "") {

			if(password_verify($password,$hashPass->password)) {
				$this->session->id = $account->id;
				redirect('Dashboard/index');
			}else {
				redirect('Account/login');
			}

		}else {
			redirect('Account/login');
		}

	}

	public function register() {
		$this->load->view('register');
	}

	public function registerNow() {

		$this->isLogged();

		$username = $this->input->post('username');
		$password = $this->input->post('password');

		if($username != "" && $password != "") {

			$hashPass = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
			$data = array($username,$hashPass,date("Y-m-d H:i:s"));
			$this->account_model->create($data);
			echo json_encode(array('status' => 'okay','message' => 'Successfully Added!'));
		}else {
			echo json_encode(array('status' => 'error','message' => 'All fields required.'));
		}

	}

	public function logout() {

		$this->session->unset_userdata('id');
		redirect('Account/login');
	}

}