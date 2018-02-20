<?php
//Get Params & Settings
$logo = $this->params->get('logo');
$logotext = $this->params->get('logotext','Jumbotron Narrow');
$copyright = $this->params->get('copyright');
$show_frontpage_component = $this->params->get('show_frontpage_component');
$includejquery = $this->params->get('includejquery', 1);

//Get Application Object
$app = JFactory::getApplication();
//Get Document Object
$doc = JFactory::getDocument();
//Get Params Object
$templateparams = $app->getTemplate(true)->params;
//Get Menu Object
$menu = &JSite::getMenu();
//Get User Object
$user = &JFactory::getUser();
//Get Task
$task = JRequest::getCmd('task');
//Get Option
$option = JRequest::getCmd('option');

//Include Sidebar?
if ($this->countModules('sidebar'))
	$sidebar = true;
?>