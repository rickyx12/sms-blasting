<nav class="navbar navbar-expand navbar-dark bg-dark fixed-top">

  <a class="navbar-brand mr-1" href="index.html"><img id="logo" src="<?= base_url('assets/img/sbt.png') ?>"></a>
  <span id="logoTitle">ext Blast</span>
  <!-- Navbar Search -->
  <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
    <i id="responderIndicator" class="fa fa-satellite-dish"></i>
    <a href="#" class="navbar-status">Network: <span id="network"></span></a>
    <a href="#" class="navbar-status">My Number: <span id="phoneNumber"></span></a>
    <a href="#" class="navbar-status">Signal: <span id="signal"></span></a>
  </form>

  <!-- Navbar -->
  <ul class="navbar-nav ml-auto ml-md-0">
    <li class="nav-item dropdown no-arrow">
      <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-user-circle fa-fw"></i>
      </a>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
        <a class="dropdown-item" href="<?= base_url('Account/logout') ?>">Logout</a>
      </div>
    </li>
  </ul>

</nav>

