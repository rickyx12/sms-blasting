  <div id="content-wrapper">

    <div class="container-fluid">

      <!-- Breadcrumbs-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Outbox</a>
        </li>
      </ol>
      <div class="row">
        <div class="col-md-6 pt-4">
          <span id="sendingStatus">Sent <span id="totalSent">0</span>/<span id="totalUnsent"></span></span>
          <span id="outboxTotal"><span id="outboxTotal1"></span> Items</span>
        </div>
        <div class="col-md-6 mb-2 text-right">
          <button id="removeOutboxBtn" class="btn btn-danger mr-3 mt-3"><i class="fa fa-trash"></i> Remove</button>
          <button id="sendFromOutboxBtn" class="btn btn-success mt-3"><i class="fa fa-paper-plane"></i> Send</button>
        </div>
      </div>
      <div class="row">
          <div class="col-md-12">
            <table id="outboxTbl" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th width="5%"></th>
                  <th width="15%">Cp#</th>
                  <th width="15%">Name</th>
                  <th>Message</th>
                  <th width="5%"></th>
                </tr>
              </thead>
              <tbody id="outboxBody"></tbody>
            </table>
          </div>
      </div>     
    </div>
  </div>

  <script src="<?= base_url('assets/js/outbox/outbox.js') ?>"></script>