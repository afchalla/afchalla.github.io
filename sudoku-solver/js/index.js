var SUDOKU_SIZE = 9;


function validateInput(ele) {
	ele = "#" + ele;
	if (parseInt($(ele).val()) > SUDOKU_SIZE || parseInt($(ele).val()) <= 0) {
		$(ele).css("color", "red");
	} else {
		$(ele).css("color", "inherit");
	}
}

function onClear() {
	for (var row = 0; row < SUDOKU_SIZE; row++) {
		for (var col = 0; col < SUDOKU_SIZE; col++) {
			$("#input"+row+col).val("");
			$("#input"+row+col).removeAttr('disabled');
			$("#btn-soln").show();
			$("#btn-clear").hide();
			$("#response-text").html("");
		}
	}	
}

function getSolution() {
	var inputArray = [];
	inputArray.push("SUDOKU_SIZE");
	inputArray.push(SUDOKU_SIZE);
	for (var row = 0; row < SUDOKU_SIZE; row++) {
		for (var col = 0; col < SUDOKU_SIZE; col++) {
			var input = parseInt($("#input"+row+col).val());
			if(isNaN(input)) {
				input = "0";
			}
			inputArray.push(input);
		}
	}

	var msg = sudokuSolver.main(83, inputArray);
	if(msg == "-1" || msg == "-2" || msg == "-3") {
		$("#response-text").html("Oops! Something wrong with the input. Please try again!");
		$("#response-text").css("color", "red");
	} else if(msg == "100") {
		$("#response-text").html("Oops! We are facing some technical difficulties. Please try later.");
		$("#response-text").css("color", "red");
	} else {
		var results = msg;
		var index = 0;
		for(var row = 0; row < SUDOKU_SIZE; row++) {
			for(var col = 0; col < SUDOKU_SIZE; col++) {
				$("#input"+row+col).val(results[row][col]);
				$("#input"+row+col).attr("disabled", "");
			}
		}
		$("#response-text").html("Yayy! We got a solution!");
		$("#response-text").css("color", "green");
		$("#btn-soln").hide();
		$("#btn-clear").show();
	}
}
