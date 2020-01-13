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
            array("BACHO, AMORLINA ROPIROS","9480620371","5"),
            array("PACA, DANILO ANDEA","9676378614","5"),
            array("ANDAL JENLY SIMPAL","9967885400","5"),
            array("SABSABI, AHMAD ADNAN","9350072753","5"),
            array("CENAS,MELISSA CABANLIT","9501608237","5"),
            array("CENAS,MELISSA CABANLIT","9501608237","5"),
            array("BAGO, MARITES CABIZARES","9097555773","5"),
            array("MEHANG,JENARIE PANGGULO","9755750126","5"),
            array("ABULJALIL,ALFAIZA ABUHH","9058389673","5"),
            array("VALLE,APRIL LOVE GAYANELO","9481227760","5"),
            array("VILAMONTE, MIGUEL BERDEBLANCO","9366190749","5"),
            array("LOQUILLANO,ROSSELLE JOY ESPERILA","9387332164","5"),
            array("SAMANO,FE AMOR TOLORIO","9273449363","5"),
            array("VERGARA,ROSALYN NATIVIDAD","9091725800","5"),
            array("FUEDAN,MARY WALTER ACERO","9059576097","5"),
            array("Annaliza O. Duroy","9753945731","5"),
            array("MACOROL,JENNIFER BATUIGAS","9091715860","5"),
            array("GORIT, JASON JAMES CUELLO","9184263833","5"),
            array("Rolando S. Lozada","9352094286","5"),
            array("SAGUT,MARY GRACE JAMONEL","9269800998","5"),
            array("VALENTINO,CLAIRE BAÑAS","9127838421","5"),
            array("ELECHICON,MAE INOCENTES","9237254925","5"),
            array("BULAO,GERALDINE CONSAD","9755135190","5"),
            array("DUMARAN,CHERYGEL LUMBOCAN","9300296444","5"),
            array("REJAS, FELIX CAMPUED","9079515860","5"),
            array("LEAH A.BAGATAO","9104017219","5"),
            array("MARY JANE G.CADIZ","9090976046","5"),
            array("JENNY LYN S.CARIASO","9359143369","5"),
            array("JERAMAE L.INCEPIDO","9501582325","5"),
            array("QUEENIE C. DE LEON","9078317037","5"),
            array("RAULDULFO","9755973508","5"),
            array("MARY ANN E. FUSTER","9137205407","5"),
            array("MARK M. LADARAN","9360639748","5"),
            array("MARILYN M.LUGANAO","9109147099","5"),
            array("ARLENE L.FIGUEROA","9050960890","5"),
            array("JOVELYN R.QUIRANTE","9234323105","5"),
            array("RIZA JOY E.SURESCA","9994052284","5"),
            array("SAIDHAMDIE A. TACBIL","9758106474","5"),
            array("RONNIE H. VILLANUEVA","9326067601","5"),
            array("RIZA S. ZOLINA","9306381562","5"),
            array("MERLY S. ALBARIN","9322364169","5"),
            array("ANALY D.ANDO","9283109102","5"),
            array("ARLYN D.DAZON","9068721035","5"),
            array("WENCY GUBATANGA","9488506011","5"),
            array("MARLYN T. BUGARIN","9238800283","5"),
            array("MARY CRIS G.BULAWAN","9125225707","5"),
            array("ROSELYN D. CALUMBA","9076414738","5"),
            array("SHEENA M. VALIENTE","9452503431","5"),
            array("ONA P. DACERA","9491935150","5"),
            array("MARY ANN M.DALOGDOG","9211892759","5"),
            array("JENNIFER B. DENOPOL","9358528927","5"),
            array("VIOLYMAR P.GOREMBALEM","9225115095","5"),
            array("DINDO S. LANDIA","9309658652","5"),
            array("MERIGIE S.LAURON","9309751627","5"),
            array("MARIA MAE B.MAYO","9263231947","5"),
            array("NATHALIE ROSE M.MIRANDA","9676925412","5"),
            array("GRETCHEN C.ESTALANI","9501552724","5"),
            array("EVELYN H.MORALES","9302427250","5"),
            array("JONALYN F.NOLONG","9559752219","5"),
            array("AMMIE P.OLAER","9278547470","5"),
            array("EMELYN E.PELIÑO","9995897137","5"),
            array("ARLYN GRACE S.RODRIGUEZ","9129338848","5"),
            array("MARIZEL B.UBONGEN","9482986565","5"),
            array("MARISSA P.BAUTISTA","9358461626","5"),
            array("Amaquin,Charisse","9473742841","5"),
            array("Morandante, Virginia","9286056959","5"),
            array("Baylosis, Monette","9126075512","5")
        );

        foreach($data as $d) {
            echo $d[0]."<br>";
            $data = array($d[0],$d[1],$d[2]);
            $this->people_model->add($data);
        }

    }

}
