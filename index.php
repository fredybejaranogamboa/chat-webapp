<?php ?>
<!DOCTYPE html>
<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>
<html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>
<html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js"> <!--<![endif]-->
    <head>
        <!--PRETTY URLs-->
        <?php
            $path = dirname($_SERVER['SCRIPT_NAME']);
            $uri = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['SERVER_NAME'].$path.'/';
            echo '<base href="' . $uri . '" />';
        ?>
        <!-- Meta-Information -->
        <title>MiChat</title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="description" content="MiChat">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Vendor: Bootstrap Stylesheets http://getbootstrap.com -->
        <link rel="stylesheet" href="app/resources/css/bootstrap.min.css">
        <!--<link rel="stylesheet" href="app/resources/css/bootstrap-theme.min.css">-->
        <link href="app/resources/css/font-awesome.min.css" rel="stylesheet">
        
        <!-- Link Swiper's CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.0/css/swiper.min.css">

        <!-- Our Website CSS Styles -->
        <link rel="stylesheet" href="app/resources/css/bootstrap-social.css">
        <link rel="stylesheet" href="app/resources/css/style.css">
        

    </head>
    <body ng-app="chatWebApp">
        <!--[if lt IE 7]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
            your browser</a> to improve your experience.</p>
        <![endif]-->

        <!-- Our Website Content Goes Here -->
        <div ng-include='"app/templates/header.html"'></div>
        <div ng-view></div>
        <div ng-include='"app/templates/footer.html"'></div>

        <!-- Vendor: Javascripts -->
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

        <!-- Vendor: Angular, followed by our custom Javascripts -->
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.18/angular.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.18/angular-route.min.js"></script>
        <script src="app/resources/js/swiper.jquery.min.js"></script>
        
        <!-- Swiper JS -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.0/js/swiper.min.js"></script>
        
        <!-- Our Website Javascripts -->
        <script src="app/modules/main.js"></script>
        <script src="app/resources/lib/angular-facebook.js"></script>
        <script src="app/modules/chatService.js"></script>
        
        <script type="text/javascript" src="app/resources/js/chat.js"></script>
    </body>
</html>

