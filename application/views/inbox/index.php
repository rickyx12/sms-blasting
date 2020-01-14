  <div id="content-wrapper">

    <div class="container-fluid">

      <!-- Breadcrumbs-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Inbox</a>
        </li>
      </ol>
      <div class="row">
        <br><br>
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <span id="inboxStatus"></span>
            </div>
            <div class="col-md-6 text-right mb-2">
              <button id="deleteMsg" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i> Delete</button>
            </div>
          </div>

          <table id="inboxTbl" class="table table-bordered">
            <thead>
              <tr>
                <th width="3%"></th>
                <th width="15%" class="inbox-msg">Sender</th>
                <th width="15%" class="inbox-msg">Received</th>
                <th class="inbox-msg">Message</th>
                <th width="5%"></th>
              </tr>
            </thead>
            <tbody class="inboxBody"></tbody>
          </table>
        </div>


        <!-- Modal -->
        <div id="viewModal" class="modal fade" role="dialog">
          <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <h4 id="readMsgModalHeader" class="modal-title">Message</h4>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-12">
                    <label>Message</label>
                    <textarea id="readMsgModalField" cols="3" rows="5" readonly="readonly" class="form-control"></textarea>
                  </div> 
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label class="mt-3">Repply</label>
                  </div>
                  <div class="col-md-6 mt-3 text-right">
                    <span id="replyMsgLeftChar">160</span>/160
                  </div>
                </div>
                <textarea id="replyMsgModalField" cols="3" rows="5" class="form-control" maxlength="160"></textarea>
                <input type="hidden" id="replyToNumber">
              </div>
              <div class="modal-footer">
                <button type="button" id="replyCloseBtn" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" id="replyBtn" class="btn btn-success">Reply</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>

  <script src="<?= base_url('assets/js/inbox/inbox.js') ?>"></script>