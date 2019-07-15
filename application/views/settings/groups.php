  <div id="content-wrapper">

    <div class="container-fluid">

      <!-- Breadcrumbs-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Settings</a>
        </li>
        <li class="breadcrumb-item">
          <a href="#">Groups</a>
        </li> 
      </ol>

      <?php include('peopleTable.php') ?>
      <?php include('modals/add.php') ?>

    </div>
  </div>

  <script src="<?= base_url("assets/js/people.js") ?>"></script>

