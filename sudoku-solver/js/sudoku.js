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

	tryFillingInSimple: function() {
		var trySuccess;
		do {
			trySuccess = false;
			for(var row = 0; row < this.size; row++) {
				for(var col = 0; col < this.size; col++) {

					if(this.marker[row][col] == 1) {
						continue;
					}

					var probable = 0;
					var value = 0;
					for(var tryInput = 1; tryInput <= this.size; tryInput++) {
						if(this.canFitInValue(row, col, tryInput)) {
							probable++;
							value = tryInput;
						}
					}
					if(probable == 1) {
						this.input[row][col] = value;
						this.marker[row][col] = 1;
						trySuccess = true;
					}
				}
			}
		} while(trySuccess);
	},

	tryFillingInElimination: function() {

		var colorer = [];
		var counter = 0;

		for (var i = 0; i < this.size; i++) {
			colorer.push(new Array(this.size));
		}

		do {

			counter = 0;
			for(var tryInput = 1; tryInput <= this.size; tryInput++) {

				var colorSuccess = false;
				do {

					colorSuccess = false;

					for(var row = 0; row < this.size; row++) {
						for(var col = 0; col < this.size; col++) {
							colorer[row][col] = 0;
						}
					}

					for(var row = 0; row < this.size; row++) {
						for(var col = 0; col < this.size; col++) {
							if(this.input[row][col] == tryInput) {

								var boxRow = parseInt(row/this.root)*this.root;
								var boxCol = parseInt(col/this.root)*this.root;

								for(var i = 0; i < this.size; i++) {
									colorer[row][i] = 1;
									colorer[i][col] = 1;
									colorer[boxRow][boxCol] = 1;

									boxCol++;
									if(boxCol % this.root == 0) {
										boxCol = parseInt(col/this.root)*this.root;
										boxRow++;
									}
								}

								break;
							}
						}
					}

					for(var row = 0; row < this.size; row++) {
						for(var col = 0; col < this.size; col++) {
							if(colorer[row][col] == 0 && this.input[row][col] == 0) {

								var onlyProbable = true;
								for(var rowCheck = 0 ; rowCheck < this.size; rowCheck++) {
									if(col == rowCheck) {
										continue;
									}

									if(colorer[row][rowCheck] != 0 || this.input[row][rowCheck] != 0) {
										continue;
									}

									onlyProbable = false;
									break;
								}

								if(!onlyProbable) {
									onlyProbable = true;
									for(var colCheck = 0 ; colCheck < this.size; colCheck++) {
										if(row == colCheck) {
											continue;
										}

										if(colorer[colCheck][col] != 0 || this.input[colCheck][col] != 0) {
											continue;
										}

										onlyProbable = false;
										break;
									}
								}

								if(onlyProbable) {
									this.input[row][col] = tryInput;
									this.marker[row][col] = 1;
									colorSuccess = true;
									counter++;
									break;
								}
							}
						}
						if(colorSuccess) {
							break;
						}
					}

				} while(colorSuccess);

			}
		} while (counter > 0);

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

	main: function(size, inputs) {

		this.input = [];
		this.marker = [];

		this.size = parseInt(size);
		this.root = Math.sqrt(this.size);

		for (var i = 0; i < this.size; i++) {
			this.input.push(new Array(this.size));
			this.marker.push(new Array(this.size));
		}

		if(inputs.length != (this.size * this.size)) {
			return -1;
		}

		var row = 0;
		var col = 0;

		for(var i = 0; i < inputs.length; i++) {

			//clear the existing values
			this.input[row][col] = 0;
			this.marker[row][col] = 0;

			//Input the values and mark the appropriate fields
			this.input[row][col] = parseInt(inputs[i]);

			if(this.input[row][col] != 0) {
				this.marker[row][col] = 1;
			}

			col++;

			if(col == this.size) {
				col = 0;
				row++;
			}
		}

		this.tryFillingInSimple();
		this.tryFillingInElimination();

		if(!this.checkInputValidity() || !this.solveSudoku(0,0)) {
			return -2;
		}

		return this.input;
	}
};
