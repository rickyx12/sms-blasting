<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Text Blast</title>


  <link rel="shortcut icon" href="<?= base_url('assets/img/favicon.ico') ?>" type="image/x-icon">
  <link rel="icon" href="<?= base_url('assets/img/favicon.ico') ?>" type="image/x-icon">  
  <!-- Custom fonts for this template-->
  <!-- <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"> -->

  <!-- Custom styles for this template-->
  <link href="<?= base_url('assets/css/sb-admin.css') ?>" rel="stylesheet">
</head>

<body class="bg-dark">

  <div class="container">


    <div class="card card-login mx-auto mt-5">
      <div class="card-header">Login</div>
      <div class="card-body pt-0">

          <div class="row">
            <div class="col-md-12 mt-4 mb-4 text-center">
              <img src="<?= base_url("assets/img/sbt.png") ?>" height="100" width="100">
            </div>
          </div> 

          <form method="POST" action="<?= base_url('Account/loginNow') ?>">
            <div class="form-group">
              <div class="form-label-group">
                <input type="text" id="username" name="username" class="form-control" placeholder="Username" required="required" autofocus="autofocus" autocomplete="off">
                <label for="username">Username</label>
              </div>
            </div>
            <div class="form-group">
              <div class="form-label-group">
                <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required="required">
                <label for="inputPassword">Password</label>
              </div>
            </div>
            <input type="submit" class="btn btn-primary btn-block" value="Login">
          </form>
      </div>
    </div>



  </div>

  <!-- Bootstrap core JavaScript-->
  <script src="<?= base_url('assets/vendor/jquery/jquery.min.js') ?>"></script>
  <script src="<?= base_url('assets/js/loadingoverlay.min.js') ?>"></script>
  <!-- <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script> -->

<script>
  
  $(function(){

    function startup() {

      $.ajax({
        url: 'http://192.168.1.92/startup',
        beforeSend:function() {
          $.LoadingOverlay('show',{
              image: "",
              text: "Connecting to SMS."
          });
        },
        success:function(result) {
          $.LoadingOverlay('hide');
        },
        error:function() {
          $.LoadingOverlay("text","Can't connect to SMS. Refresh the page.");   
        }
      }); 

    }

    startup();

  });

</script>

</body>
</html>
