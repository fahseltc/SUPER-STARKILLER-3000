<?php
/**
 * @version     1.1
 * @package     mod_jumbotron
 * @copyright   Copyright (C) 2013. All rights reserved.
 * @license     http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 * @author      Brad Traversy <support@joomdigi.com> - http://www.joomdigi.com
 */
//No Direct Access
defined('_JEXEC') or die;
?>
<style>
<?php if(isset($background_image) && $background_image != '') : ?>
    .jumbotron{
        background:url(<?php echo JURI::base(); ?><?php echo $background_image; ?>) no-repeat 0 -700px;
	}
<?php endif; ?>
	.jumbotron h1{color:<?php echo $headingtextcolor; ?>;}
	.jumbotron p{color:<?php echo $paragraphtextcolor; ?>;}
	.jumbotron .btn{color:#fff !important;}
</style>
 <div class="jumbotron <?php echo $moduleclass_sfx; ?>">
  <h1><?php echo $header_text; ?></h1>
  <p class="lead"><?php echo $paragraph_text; ?></p>
  <?php if($show_read_more) : ?>
  <p><a class="<?php echo $buttonstyle; ?>" role="button" href="<?php echo $read_more_link; ?>"><?php echo $read_more_text; ?></a></p>
<?php endif; ?>
 </div><!-- /.jumbotron -->
