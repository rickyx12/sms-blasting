<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class People extends CI_Controller {

 	public function __construct() {
 		parent::__construct();
 		$this->load->helper('url');
 		$this->load->model('people_model');
 		$this->load->library('session');
 	}

    private function isLogged() {

        if(!$this->session->has_userdata('id')) {
                redirect('Account/login');
        }
    }



	public function add() {

		$this->isLogged();

		$name = $this->input->post('name');
		$contact = $this->input->post('contact');
        $groups = $this->input->post('groups');

		if($name != "" || $contact != "") {

			$data = array($name,$contact,$groups);
			$this->people_model->add($data);

			$response = array("status" => "success", "message" => "successfully added.");
		}else {
			$response = array("status" => "error", "message" => "Please complete the form.");
		}

		echo json_encode($response);
	}

    public function peopleJSON() {

        $this->isLogged();

        $draw = $this->input->get('draw');
        $start = $this->input->get('start');
        $length = $this->input->get('length');
        $search = $this->input->get('search')['value'];

        $data = array(
            "draw" => $draw,
            "recordsTotal" => $this->people_model->getPeople(null,null,null)->num_rows(),
            "recordsFiltered" => $this->people_model->getPeople(null,null,null)->num_rows(),
            "data" => $this->people_model->getPeople($start,$length,$search)->result()
        );

        echo json_encode($data);            
    }	


    public function update() {

    	$id = $this->input->post('peopleId');
    	$name = $this->input->post('name');
    	$contact = $this->input->post('contact');
        $groups = $this->input->post('groups');

    	if($name != "" || $contact != "") {

    		$data = array($name,$contact,$groups,$id);
    		$this->people_model->update($data);

    		$response = array("status" => "success","message" => "successfully updated.");
    	}else {
    		$response = array("status" => "error","message" => "error.");
    	}

    	echo json_encode($response);
    }


    public function delete() {

    	$id = $this->input->post("people");

    	$this->people_model->delete(array($id));

    	$response = array("status" => "success", "message" => "successfully deleted.");

    	echo json_encode($response);
    }


    public function import() {

        $data = array(
            array("Maria ConsolacionCapuno","9262470810","9"),
            array("Leah Corsit","9064208951","9"),
            array("Jocelyn Crusis","9090734895","9"),
            array("Helen Diagan","9989825672","9"),
            array("Mary Fatima Domingo","9474454501","9"),
            array("Joy Jie Mae Ferrer","9461564094","9"),
            array("Julie Galido","9082070316","9"),
            array("Gerlie Gengoni","9176259835","9"),
            array("Gerald Gonzales","9196291830","9"),
            array("April Lagare","9309602512","9"),
            array("Bryan Roy Laniton","9091715742","9"),
            array("Ellen Grace Ledesma","9097219258","9"),
            array("Nahum Loot","9226953011","9"),
            array("Michael Lumawig","9098160315","9"),
            array("Mery Grace Pajero","9203399796","9"),
            array("Margie Quimosing","9477201517","9"),
            array("Sheena Rose Salmorin","9123492660","9"),
            array("Evelyn Salubre","9302164863","9"),
            array("Phoebe Shene Sobrevilla","9269005844","9"),
            array("Argeline Tarrayo","9061508069","9"),
            array("Johary Usman","9103376762","9"),
            array("Arnold Velasquez","9237148571","9"),
            array("Divilyn E. Figueroa","9968896927","9"),
            array("Bienvinedo Bartolini","9086925763","9"),
            array("Emely Cabañete","9101731263","9"),
            array("Queenny C. Calamba","9105230202","9"),
            array("Margarito Canapit II","9566147651","9"),
            array("Jovelyn D. Deraco","9120289099","9"),
            array("Analyn S. Go","9265501653","9"),
            array("Rhealyn Gocela","9075384263","9"),
            array("Kristel Gonzales","9100087636","9"),
            array("Cherry Kiawan","9556796527","9"),
            array("Jaybert Lazala","9382766327","9"),
            array("Sheila Rose B. Guazo","9223713512","9"),
            array("Richard Miranda","9354076418","9"),
            array("Laysil C. Pepito","9094068951","9"),
            array("Pedro Sagana Jr.","9164047338","9"),
            array("Riza Joy Suresca","9994052284","9"),
            array("Letecia B. Cacharo","9482282459","9"),
            array("Gerlie P. Tamayo","9488167110","9"),
            array("Rochelle Abang","9461703506","9"),
            array("Marilyn I. Arbilo","9223551276","9"),
            array("Analyn S. Go","9265501653","9"),
            array("Gina T. Cerna","9396423007","9"),
            array("Qathafi Farouq","9104316812","9"),
            array("Lorraine P. Francisquete","9395795102","9"),
            array("Rodolfo Gabila Jr.","9324550694","9"),
            array("Gladys Shienee Gemparo","9099159123","9"),
            array("Al A. Kudarat","9120874620","9"),
            array("Catalino T. Lucas","9667838191","9")
        );

        foreach($data as $d) {
            echo $d[0]."<br>";
            $data = array($d[0],$d[1],$d[2]);
            $this->people_model->add($data);
        }

    }

}
