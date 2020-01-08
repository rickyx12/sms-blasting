  <div id="content-wrapper">

    <div class="container-fluid">

      <!-- Breadcrumbs-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Responder</a>
        </li>
      </ol>
      <div class="row">
        <div class="col-md-12 text-right mb-2">
          <button id="deleteResponderBtn" class="btn btn-danger mr-1"><i class="fa fa-trash"></i> Delete</button>
          <button class="btn btn-success" data-toggle="modal" data-target="#addModal"><i class="fa fa-plus"></i> New</button>
        </div>
      </div>
      <div class="row">
          <div class="col-md-12">
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th width="3%"></th>
                  <th width="20%">Keyword</th>
                  <th>Reply</th>
                </tr>
              </thead>
              <tbody id="responderBody"></tbody>
            </table>
          </div>
      </div> 

    <!-- Modal -->
    <div id="addModal" class="modal fade" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Keyword</h5>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Keywords</label>
              <input type="text" id="keyword" class="form-control" autocomplete="off">
            </div>
            <div class="form-group">
              <label>Reply</label>
              <textarea rows="10" cols="5" id="message" class="form-control"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            <button type="button" id="addKeywordBtn" class="btn btn-success" data-dismiss="modal">Proceed</button>
          </div>
        </div>

      </div>
    </div>

    </div>
  </div>

  <script src="<?= base_url('assets/js/responder/responder.js') ?>"></script>