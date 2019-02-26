<?php

function baz($y,$z) {

$x = array();
// or
$x = [];
$x['sales']  = 60;

$x['profit'] = 20;

    foreach($x as $key => $value) {

        echo $key+" "+$value+"<BR>";

    }
}
?>