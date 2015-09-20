var sudokuSolver = {
	input: [],
	marker: [],
	size: 0,
	root: 0,

	canFitInValue: function(row, col, proposedInput) {
		var success = true;
		var boxRow = parseInt(row/this.root)*this.root;
		var boxCol = parseInt(col/this.root)*this.root;
		for(var i = 0; i < this.size; i++) {
			if(this.input[row][i] == proposedInput
					|| this.input[i][col] == proposedInput
					|| this.input[boxRow][boxCol] == proposedInput) {
				success = false;
				break;
			}

			boxCol++;
			if(boxCol % this.root == 0) {
				boxCol = parseInt(col/this.root)*this.root;
				boxRow++;
			}
		}
		return success;
	},


	checkInputValidity: function() {
		var result = true;
		for(var row = 0; row < this.size; row++) {
			for(var col = 0; col < this.size; col++) {

				var proposedInput = this.input[row][col];
				this.input[row][col] = 0;
				if(proposedInput != 0 && ((this.canFitInValue(row, col, proposedInput) == false) || (proposedInput < 1 || proposedInput > this.size))) {
					result = false;
				}
				this.input[row][col] = proposedInput;

				if(result == false) {
					return result;
				}
			}
		}
		return result;
	},

	solveSudoku: function(row, col) {

		if(col == this.size) {
			col = 0;
			row++;
		}

		if(row == this.size) {
			return true; //successfully solved
		}

		if(this.marker[row][col] == 1) {
			return this.solveSudoku(row, col+1);
		} else {

			var boxRow, boxCol;
			var ret;

			for(var proposedInput = 1; proposedInput <= this.size; proposedInput++) {
				if(this.canFitInValue(row,col,proposedInput) == true) {
					this.input[row][col] = proposedInput;
					ret = this.solveSudoku(row , col+1);
					if(ret) {
						return true;
					} else {
						this.input[row][col] =  0;
					}
				}
			}
			return false;
		}
	},

	main: function(argc, argv) {
		if(argc <= 1) {
			return -1;
		}

		this.input = [];
		this.marker = [];

		for (var i = 0; i < SUDOKU_SIZE; i++) {
			this.input.push(new Array(SUDOKU_SIZE));
			this.marker.push(new Array(SUDOKU_SIZE));
		}

		this.size = parseInt(argv[1]);
		this.root = Math.sqrt(this.size);

		var row = 0;
		var col = 0;

		for(var i = 2; i < argc; i++) {

			//clear the existing values
			this.input[row][col] = 0;
			this.marker[row][col] = 0;

			//Input the values and mark the appropriate fields
			this.input[row][col] = parseInt(argv[i]);

			if(this.input[row][col] != 0) {
				this.marker[row][col] = 1;
			}

			col++;

			if(col == this.size) {
				col = 0;
				row++;
			}
		}

		if(!this.checkInputValidity() || !this.solveSudoku(0,0)) {
			return -2;
		}

		return this.input;
	}
};