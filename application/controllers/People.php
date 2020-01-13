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
            array("Simplicio G. Paredes","9056763203","7"),
            array("Rowena S. Sampang","9382767337","7"),
            array("Ronald A. Tabie","9075463746","7"),
            array("Beverly S. Taday","9480838162","7"),
            array("Cristina J. Tagaban","9983533685","7"),
            array("Mercy Y. Torres","9756114364","7"),
            array("Sitti Sarah A. Abas","9363135890","7"),
            array("Marites Arboleda","9101672245","7"),
            array("Apple Jay Baja","9076417373","7"),
            array("Jorie Ann C. Bohol","9205158871","7"),
            array("Michelle L. Cambarijan","9072183009","7"),
            array("Kristine S. Comprendio","9387332292","7"),
            array("Shera Mae Dapsan","9223545938","7"),
            array("Dianne Rose Eugenio","9234676579","7"),
            array("Axl Jon Lao","9177588018","7"),
            array("Sheila Marie Laurente","9308048152","7"),
            array("Timothy John Lisas","9167181119","7"),
            array("Arjelyn Llavore","9125809197","7"),
            array("Redzma A. Mindalano","9352129110","7"),
            array("Airene F. Montero","9982297068","7"),
            array("Mary Ann Tabanao","9074477718","7"),
            array("Sheryll Joy Teruel","9978318703","7"),
            array("Lani A. Villas","9261730406","7"),
            array("Elson Bertolano","9063567902","7"),
            array("Charlyn P. Bornea","9179773927","7"),
            array("Marites Cajurao","9091378659","7"),
            array("Michelle Constantino","9959385008","7"),
            array("Melanie Cruz","9354759451","7"),
            array("Rhea B. Ecarma","9554809654","7"),
            array("Annie Mae Bartolo","9502639689","7"),
            array("Grace Ann Karunungan","9184469289","7"),
            array("Jenifer Lamay","9506951121","7"),
            array("Yhuri Carmon Manua","9457168934","7"),
            array("Elvie Calixihan","9480881756","7"),
            array("Sheryl N. Lelia","9778295591","7"),
            array("Viola Llanes","9463640361","7"),
            array("Rosemarie Lumanas","9156847627","7"),
            array("Gracelie T. Panto","9360393397","7"),
            array("Amor Mia C. Perez","9257650055","7"),
            array("Eara V. Qulinderino","9363815355","7"),
            array("Jean Sarno","9171208317","7"),
            array("Irish Tracy lee Simeon","9055302624","7"),
            array("Maribeth V. Enabacan","9462574594","7"),
            array("Rayhana A, Upahm","9165681621","7"),
            array("Bryan Roy S","9204806901","7"),
            array("Liza M. Aniceto","9755835325","7"),
            array("Bai Sequerra T. Azada","9460006725","7"),
            array("Jose Johny C. Cubita","9076553707","7"),
            array("Neil I. Dael","9486925344","7"),
            array("Sheryl E. Daffon","9398816255","7"),
            array("RitchellM. Dequinto","9466069183","7"),
            array("Jerelyn S. Dollete","9489752950","7"),
            array("Lea E. Elopre","9483594001","7"),
            array("Girlie Jean R. Gesulga","9105586565","7"),
            array("Kimberly G. Pendaliday","9954972482","7"),
            array("Jeanneth B. Pesario","9084075880","7"),
            array("Mark Jay C. Recopelacion","9667027332","7"),
            array("Jester Paul D. Samijon","9771366990","7"),
            array("Frederick U. Tonogbanua","9461928602","7"),
            array("Angelyn T. Acharon","9093488319","7"),
            array("Irene A. Aquino","9463833360","7"),
            array("Mechelle J. Balicbalic","9995521030","7"),
            array("Malou Berzuela","9109123509","7"),
            array("Mar June A. Calaque","9277658330","7"),
            array("Roderick H. Chan","9991691814","7"),
            array("Janet P. Cominador","9978310101","7"),
            array("John Richie V. Arenas","9481004971","7"),
            array("Romeo N. Dinopol","9757042509","7"),
            array("Ian Hasper P. Garcinez","9264997476","7")
        );

        foreach($data as $d) {
            echo $d[0]."<br>";
            $data = array($d[0],$d[1],$d[2]);
            $this->people_model->add($data);
        }

    }

}
