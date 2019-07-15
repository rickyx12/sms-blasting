<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>MyRx Registration</title>

  <link rel="shortcut icon" href="<?= base_url('assets/img/favicon.ico') ?>" type="image/x-icon">
  <link rel="icon" href="<?= base_url('assets/img/favicon.ico') ?>" type="image/x-icon">
   <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
  <!-- Custom styles for this template-->
  <link href="<?= base_url('assets/css/sb-admin.css') ?>" rel="stylesheet">

</head>

<body class="bg-dark" data-urlbase='<?= base_url() ?>'>

  <div class="container">
    <div class="card card-register mx-auto mt-5">
      <div class="card-header">Register an Account</div>
      <div class="card-body">
        <form>
          <div class="form-group">
              <input type="text" id="username" class="form-control" placeholder="Username" required="required">
          </div>
          <div class="form-group">
            <div class="form-row">
              <div class="col-md-12">
                <input type="password" id="password" class="form-control" placeholder="Password" required="required">
              </div>
            </div>
          </div>
          <a id="registerBtn" class="btn btn-primary btn-block">Register</a>
        </form>
      </div>
    </div>
  </div>

  <!-- Bootstrap core JavaScript-->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

</body>

</html>

<script src="<?= base_url('assets/js/account/register.js') ?>"></script>