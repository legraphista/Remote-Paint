<?php 
	//THIS FILE WILL BE HOSTED ON A PHP SERVER
	
   
    header('Content-type: image/png');
     
    header('Content-Disposition: attachment; filename="' . $_POST['name'] .'"');
     
    $encoded = $_POST['imgdata'];
    $encoded = str_replace(' ', '+', $encoded);
    $decoded = base64_decode($encoded);
     
    echo $decoded;
?>
