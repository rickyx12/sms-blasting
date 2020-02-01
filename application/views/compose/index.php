  <div id="content-wrapper">

    <div class="container-fluid">

      <!-- Breadcrumbs-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Compose</a>
        </li>
      </ol>
      <div class="row">
        <div class="col-md-4">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">+63</span>
            </div>
            <input type="text" id="number" class="form-control" autocomplete="off" placeholder="To:">
          </div>

        </div>
        <div class="col-md-8 text-right remainChar">
            <span id="remainChar" class="mt-2">0</span> / 160 (<span id="smsCount"></span>/5)
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
            <textarea id="message" class="form-control mt-3" rows="10" cols="40" maxlength="800"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-right">
            <button id="outboxBtn" class="btn btn-info mt-3 mr-3" data-toggle="modal" data-target="#outboxModal"><i class="fa fa-share-square"></i> Outbox</button>
            <button id="sendBtn" class="btn btn-success mt-3"><i class="fa fa-paper-plane"></i> Send</button>
        </div>
      </div>  


      <!-- Modal -->
      <div id="outboxModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Outbox</h4>
            </div>
            <div class="modal-body">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th width="10%"></th>
                    <th>Group</th>
                    <th>Member</th>
                  </tr>
                <thead>
                <tbody id="outboxGroup"></tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" id="cancelOutboxBtn" class="btn btn-danger" data-dismiss="modal">Close</button>
              <button type="button" id="sendOutboxBtn" class="btn btn-success">Proceed</button>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>

  <script src="<?= base_url('assets/js/compose/compose.js') ?>"></script>