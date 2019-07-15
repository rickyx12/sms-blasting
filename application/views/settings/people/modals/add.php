  <div id="newModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">New People</h4>
        </div>
        <div class="modal-body">

          <div class="form-group">
            <label>Name</label>
            <input type="text" id="name" class="form-control" autocomplete="off">
          </div>

          <div class="form-group">
             <label>Guardian Contact#</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">+63</span>
              </div>
              <input type="text" id="contact" class="form-control" autocomplete="off">
            </div>
          </div>

          <div class="form-group">
            <label>Group</label>
            <select id="groups" class="form-control">
              <option value="0"></option>
              <?php foreach($groups as $group): ?>
                <option value="<?= $group->id ?>">
                  <?= $group->name ?>
                </option>
              <?php endforeach; ?>
            </select>
          </div>
   
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger closeModalBtn" data-dismiss="modal">Close</button>
          <button type="button" id="newModalBtn" class="btn btn-success">Proceed</button>
        </div>
      </div>

    </div>
  </div>