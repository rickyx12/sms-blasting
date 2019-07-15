  <div id="content-wrapper">

    <div class="container-fluid">

      <!-- Breadcrumbs-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Dashboard</a>
        </li>
      </ol>
      <div class="row">
        
        <?php foreach($groups as $group): ?>
           <div class="col-md-4 mb-3">
            <div class="card">
              <div class="card-header"><?= $group['name'] ?></div>
              <a href="<?= base_url('Dashboard/group?groupId='.$group['id'].'&groupName='.$group['name']) ?>" class="links">
                <div class="row">
                    <div class="col-md-6">
                        <?php if($group['count'] > 1): ?>
                          <div class="card-body">
                            <?= $group['count'] ?> Members
                          </div>   
                        <?php else: ?>
                          <div class="card-body">
                            <?= $group['count'] ?> Member
                          </div>
                        <?php endif; ?>   
                    </div>
                    <div class="col-md-6">
              
                    </div>
                </div>
              </a>
            </div>
          </div>
        <?php endforeach; ?>

      </div>
    </div>
  </div>