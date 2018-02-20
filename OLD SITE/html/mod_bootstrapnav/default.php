<?php
/**
 * @version     1.1
 * @package     mod_bootstrapnav
 * @copyright   Copyright (C) 2014. All rights reserved.
 * @license     http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 * @author      Brad Traversy <support@joomdigi.com> - http://www.joomdigi.com
 */
//No Direct Access
defined('_JEXEC') or die;
?>
<?php //print_r($list); ?>
<style>
.dropdown-menu .sub-menu {
    left: 100%;
    position: absolute;
    top: 0;
    visibility: hidden;
    margin-top: -1px;
}

.dropdown-menu li:hover .sub-menu {
    visibility: visible;
}

.dropdown:hover .dropdown-menu {
    display: block;
}

.nav-tabs .dropdown-menu, .nav-pills .dropdown-menu, .navbar .dropdown-menu {
    margin-top: 0;
}

.navbar .sub-menu:before {
    border-bottom: 7px solid transparent;
    border-left: none;
    border-right: 7px solid rgba(0, 0, 0, 0.2);
    border-top: 7px solid transparent;
    left: -7px;
    top: 10px;
}
.navbar .sub-menu:after {
    border-top: 6px solid transparent;
    border-left: none;
    border-right: 6px solid #fff;
    border-bottom: 6px solid transparent;
    left: 10px;
    top: 11px;
    left: -6px;
}
</style>
<?php if($nav_type == 'navbar') : ?>
     <ul class="nav nav-pills pull-right">
        <?php foreach ($list as $i => &$item) : ?>
            <?php 
                $class = $item->id;
                if($item->id == $active_id){
                     //$class .= ' current';
                }
                if (in_array($item->id, $path)){
				    $class .= ' active';
				}
         ?>
                            	
                <?php if($item->level == 1) : ?>
                    <li class="<?php echo $class; ?>"><a href="<?php echo $item->flink; ?>"><?php echo $item->title; ?></a></li>
                 <?php endif; ?>
                            		
        <?php endforeach; ?>                            								              </ul>
                        

    <?php else : ?>
        <div class="list-group">
            <?php foreach ($list as $i => &$item) : ?>
            <?php 
                $class = $item->id; 
                $class .= ' list-group-item';
            ?>
                 <a href="<?php echo $item->flink; ?>" class="<?php echo $class; ?>"><?php echo $item->title; ?></a>                     
            <?php endforeach; ?>
        </div><!-- /.list-group-->
    <?php endif; ?>