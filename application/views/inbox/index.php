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
              </tr>
            </thead>
            <tbody class="inboxBody"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <script src="<?= base_url('assets/js/inbox/inbox.js') ?>"></script>