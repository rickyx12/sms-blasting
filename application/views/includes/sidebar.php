    
  <div id="wrapper">
    <!-- Sidebar -->
    <ul class="sidebar navbar-nav">

      <?php if($page == "dashboard-nav"): ?>
        <li id="dashboard-nav" class="nav-item active">
      <?php else: ?>
        <li id="dashboard-nav" class="nav-item">
      <?php endif; ?>

        <a id="dashboard" class="nav-link" href="<?= base_url('Dashboard/index') ?>">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>

      <?php if($page == "compose-nav"): ?>
        <li id="compose-nav" class="nav-item active">
      <?php else: ?>
        <li id="compose-nav" class="nav-item">
      <?php endif; ?>

        <a id="compose" class="nav-link" href="<?= base_url('Compose/index') ?>">
          <i class="fas fa-fw fa-edit"></i>
          <span>Compose</span>
        </a>
      </li>

      <?php if($page == "inbox-nav"): ?>
        <li id="inbox-nav" class="nav-item active">
      <?php else: ?>
        <li id="inbox-nav" class="nav-item">
      <?php endif; ?>

        <a id="inbox" class="nav-link" href="<?= base_url('Inbox/index') ?>">
          <i class="fas fa-fw fa-envelope"></i>
          <span>Inbox</span>
        </a>
      </li>

      <?php if($page == "outbox-nav"): ?>
        <li id="outbox-nav" class="nav-item active">
      <?php else: ?>
        <li id="outbox-nav" class="nav-item">
      <?php endif; ?>

        <a id="inbox" class="nav-link" href="<?= base_url('Outbox/index') ?>">
          <i class="fas fa-fw fa-share-square"></i>
          <span>Outbox</span>
        </a>
      </li>

      <?php if($page == "responder-nav"): ?>
        <li id="responder-nav" class="nav-item active">
      <?php else: ?>
        <li id="responder-nav" class="nav-item">
      <?php endif; ?>

        <a id="inbox" class="nav-link" href="<?= base_url('Responder/index') ?>">
          <i class="fas fa-fw fa-reply-all"></i>
          <span>Responder</span>
        </a>
      </li>

      <?php if($page == 'settings-page'): ?>
        <li id="settings-nav" class="nav-item active">
      <?php else: ?>
        <li id="settings-nav" class="nav-item">
      <?php endif; ?>

        <a id="settings" class="nav-link" href="<?= base_url('Settings/index') ?>">
          <i class="fas fa-fw fa-wrench"></i>
          <span>Settings</span>
        </a>
      </li>

    </ul>
