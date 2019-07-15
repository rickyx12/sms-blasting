  <div id="content-wrapper">

    <div class="container-fluid">

      <!-- Breadcrumbs-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Dashboard</a>
        </li>
        <li class="breadcrumb-item">
          <a href="#">Group</a>
        </li>
        <li class="breadcrumb-item">
          <a href="#"><?= $groupName ?></a>
        </li>
      </ol>
      <div class="row">
        <div class="col-md-6">
          <table class="table table-hover table-striped table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact#</th>
                <th>Sent</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <?php foreach($members as $member): ?>
                <tr>
                  <td>
                    <?= $member->name ?>
                  </td>
                  <td>
                    +63<?= $member->contact ?>
                  </td>
                  <td class="text-center">
                    <span id="status<?= $member->id ?>"></span>
                  </td>
                  <td class="text-center">
                    <input type="checkbox" class="number" value="<?= $member->id ?>-<?= $member->contact ?>" checked="checked">
                  </td>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
        <div class="col-md-6 text-right">
          <textarea id="message" class="form-control" rows="10"></textarea>
          <button id="sendBtn" class="btn btn-success mt-3">Send</button>
        </div>
      </div>
    </div>
  </div>

  <script src="<?= base_url('assets/js/dashboard/group.js') ?>"></script>