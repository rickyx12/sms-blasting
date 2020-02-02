  <div id="content-wrapper">

    <div class="container-fluid">

      <!-- Breadcrumbs-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Settings</a>
        </li>
        <li class="breadcrumb-item">
          <a href="#">Import</a>
        </li> 
      </ol>

      <div class="row mb-3">
        <div class="col-md-12" id="importFrm">
            <form id="csvUpload">
                <input type="file" name="csvFile" />
                <input type="button" class="btn btn-primary" id="importBtn" name="importSubmit" value="IMPORT">
            </form>
        </div>
      </div>
     
      <div class="row">
        <div class="col-md-12">
          <span id="importStatus"></span>
        </div>
      </div>

    </div>
  </div>

<script src="<?= base_url("assets/js/settings/import.js") ?>"></script>