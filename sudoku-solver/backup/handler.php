<?php

if(isset($_POST['input'])) {
	echo exec("./sudoku 9 " . $_POST['input']);
} else {
	echo "100";
}
