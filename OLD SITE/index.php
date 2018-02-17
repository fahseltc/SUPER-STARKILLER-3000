<?php
/**
 * @package tpl_justified_nav
 * @version 1.0.0
 * @author Joomla Bootstrapped
 * @link http://cambridgesoftware.co.uk/
 * @license GNU General Public License version 2 or later; see LICENSE.txt
 */

//No Direct Access
defined('_JEXEC') or die;

//Include Logic
include('logic.php');
?>
<!DOCTYPE html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width,initial-scale=1">

	<!-- Joomla Head -->
	<jdoc:include type="head" />

    <!-- Bootstrap core CSS -->
    <link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/bootstrap.css" rel="stylesheet">
     <!-- Justified-Nav CSS -->
	<link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/jumbotron-narrow.css" rel="stylesheet">
    <!-- Font Awesome CSS -->
    <link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- Custom CSS -->
	<link href="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/css/custom.css" rel="stylesheet">
 </head>

<body>
  <div class="container">
      <div class="header">
        <!-- Menu Module -->
        <jdoc:include type="modules" name="menu" style="none" />
        <?php if($logo) : ?>
          <img class="logo" src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template ?>/<?php echo $logo; ?>" alt="JD Classifieds Template" />
        <?php else : ?>
          <h3 class="text-muted"><?php echo $logotext; ?></h3>
        <?php endif; ?>
      </div>
       <!-- Showcase Module -->
        <?php if($this->countModules('showcase')) : ?>
          <jdoc:include type="modules" name="showcase" style="none" />
        <?php endif; ?>
      <div class="row marketing">
        <jdoc:include type="component" />
      </div>

      <div class="footer">
        <p><?php echo $copyright; ?></p>
      </div>

    </div> <!-- /container -->


	<script defer src="templates/<?php echo $this->template ?>/js/bootstrap.js"></script>
	<script defer src="templates/<?php echo $this->template ?>/js/jquery.js"></script>
	<script defer src="templates/<?php echo $this->template ?>/js/script.js"></script>
	<!-- end scripts-->


	<script> // Change UA-XXXXX-X to be your site's ID
		window._gaq = [['_setAccount','UAXXXXXXXX1'],['_trackPageview'],['_trackPageLoadTime']];
			Modernizr.load({
			load: ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js'
		});
	</script>


	<!--[if lt IE 7 ]>
		<script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
		<script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
	<![endif]-->
  
</body>
</html>


