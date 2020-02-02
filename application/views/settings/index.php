  <div id="content-wrapper">

    <div class="container-fluid">

      <!-- Breadcrumbs-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Settings</a>
        </li>
      </ol>

      <div class="row">
        <div class="col-6">
          <div class="card">
            <div class="card-body">
              <a href="<?= base_url('Settings/people') ?>">People</a>
              <br>
              <label style="font-size:13px;">Add / Update / Delete People Record.</label>
            </div>
          </div>
        </div>

        <div class="col-6">        
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-6">
          <div class="card">
            <div class="card-body">
              <a href="<?= base_url('Settings/groups') ?>">Groups</a>
              <br>
              <label style="font-size:13px;">Send SMS for a set of people by putting them by group.</label>
            </div>
          </div>
        </div>

        <div class="col-6">      
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-6">
          <div class="card">
            <div class="card-body">
              <a href="<?= base_url('Import/index') ?>">Import</a>
              <br>
              <label style="font-size:13px;">Import contact from CSV.</label>
            </div>
          </div>
        </div>

        <div class="col-6">      
        </div>
      </div>

    </div>
  </div>

