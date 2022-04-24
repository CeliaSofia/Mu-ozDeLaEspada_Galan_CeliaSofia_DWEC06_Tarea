<?php
    $fecha=getdate(date("U"));
    $fechaHoy = "$fecha[mday]-$fecha[mon]-$fecha[year]";
    $path = "Backup";
    if (!file_exists($path)) {
        mkdir($path, 0777, true);
    }
    $fichero = "Backup\Backup$fechaHoy.json";
    $fh = fopen($fichero, 'w') or die("can't open file");
    $stringData = $_POST["data"];
    fwrite($fh, $stringData);
    fclose($fh)
?>