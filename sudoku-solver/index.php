<?php

include_once("config.php");

$markup = "";
for($row = 0; $row < SUDOKU_SIZE; $row++) {
	$inner = "";
	for($col = 0; $col < SUDOKU_SIZE ; $col++) {
		$class = "";
		if((($col + 1)%SUDOKU_BLOCK == 0) && (($row + 1)%SUDOKU_BLOCK == 0) && ($row+1) != SUDOKU_SIZE && ($col+1) != SUDOKU_SIZE) {
			$class="bd-right-bottom";
		} else if((($col + 1)%SUDOKU_BLOCK == 0) && ($col+1) != SUDOKU_SIZE) {
			$class="bd-right";
		} else if((($row + 1)%SUDOKU_BLOCK == 0) && ($row+1) != SUDOKU_SIZE) {
			$class="bd-bottom";
		}
		$size = SUDOKU_SIZE;
		$inner .=<<<markup
			<td class="{$class}">
				<input  id="input{$row}{$col}" onchange="validateInput('input{$row}{$col}')" type="number" min="1" max="{$size}"></input>
			</td>
markup;
	}
	$markup .=<<<markup
	<tr>{$inner}</tr>
markup;
}
?>

<html>
	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" type="text/css" href="css/index.css"/>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<script src="js/index.js"></script>
		<title>Sudoku Solver</title>
		<meta name="keywords" content="sudoku, solve, solver, afchalla, 9x9">
		<meta name="description" content="Solve and verify your Sudokus">
	</head>

	<body>
		<div>Enter a given 9x9 Sudoku and see if we can get the answer for you!</div>
		<div>
			<table id="sudoku-table" cellspacing="0" cellpadding="0">
				<?=$markup?>
			</table>
			<button id="btn-soln" class="btn" onclick="getSolution()">Get Solution</button>
			<button id="btn-clear" class="btn" onclick="onClear()">Enter another</button>
			<div id="response-text"></div>
		</div>
		<footer>Made by <a target="_blank" href="https://afchalla.github.io">Abdul Qadir</a></footer>
	</body>
</html>