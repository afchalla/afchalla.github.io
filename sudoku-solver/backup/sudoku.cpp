#include <iostream>
#include <math.h>
using namespace std;

const int STATUS_NO_INPUT  = -1;
const int STATUS_INCORRECT_INPUT_SIZE = -2;
const int STATUS_INCORRECT_INPUT = -3;
const int STATUS_SUCCESS = 1;

int input[25][25];
int marker[25][25];
int size = 0;
int root = 0;

bool canFitInValue(int row, int col, int proposedInput) {
	bool success = true;
	int boxRow = (row/root)*root;
	int boxCol = (col/root)*root;
	for(int i = 0; i < size; i++) {

		if(input[row][i] == proposedInput 
				|| input[i][col] == proposedInput
				|| input[boxRow][boxCol] == proposedInput) {
			success = false;
			break;
		}

		boxCol++;
		if(boxCol % root == 0) {
			boxCol = (col/root)*root;
			boxRow++;
		}
	}
	return success;	
}


bool checkInputValidity() {
	bool result = true;
	for(int row = 0; row < size; row++) {
		for(int col = 0; col < size; col++) {

			int proposedInput = input[row][col];
			input[row][col] = 0;
			if(proposedInput != 0 && ((canFitInValue(row, col, proposedInput) == false) || (proposedInput < 1 || proposedInput > size))) {
				result = false;
			}
			input[row][col] = proposedInput;

			if(result == false) {
				return result;
			}
		}
	}
	return result;
}

bool solveSudoku(int row = 0, int col = 0) {

	if(col == size) {
		col = 0;
		row++;
	}

	if(row == size) {
		return true; //successfully solved
	}

	if(marker[row][col] == 1) {
		return solveSudoku(row, col+1);
	} else {

		int boxRow, boxCol;
		bool ret;

		for(int proposedInput = 1; proposedInput <= size; proposedInput++) { 
/*
			bool success = true;
			boxRow = (row/root)*root;
			boxCol = (col/root)*root;
			for(int i = 0; i < size; i++) {

				if(input[row][i] == proposedInput
						|| input[i][col] == proposedInput
						|| input[boxRow][boxCol] == proposedInput) {
					success = false;
					break;
				}

				boxCol++;
				if(boxCol % root == 0) {
					boxCol = (col/root)*root;
					boxRow++;
				}
			}
*/
//			if(success == true) {
			if(canFitInValue(row,col,proposedInput) == true) {
				input[row][col] = proposedInput;
				ret = solveSudoku(row , col+1);
				if(ret) {
					return true;
				} else {
					input[row][col] =  0;
				}
			}
		}
		return false;
	}
}

int main(int argc, char* argv[]) {
	if(argc <= 1) {
		return STATUS_NO_INPUT;
	}
	
	size = atoi(argv[1]);

	double val = sqrt(double(size));
	if(floor(val) != val) {
		cout<<STATUS_INCORRECT_INPUT_SIZE<<endl;
		return STATUS_INCORRECT_INPUT_SIZE;
	}
	root = int(val);

	// The two additional arguments being the command and the size specifier at index 0 and 1 respectively
	if(argc != (size*size+2)) {
		cout<<STATUS_INCORRECT_INPUT_SIZE<<endl;
		return STATUS_INCORRECT_INPUT_SIZE;
	}


	int row = 0;
	int col = 0;

	for(int i = 2; i < argc; i++) {

		//clear the existing values
		input[row][col] = 0;
		marker[row][col] = 0;

		//Input the values and mark the appropriate fields
		input[row][col] = atoi(argv[i]);

		if(input[row][col] != 0) {
			marker[row][col] = 1;
		}

		col++;
		
		if(col == size) {
			col = 0;
			row++;	
		}
	}

	if(!checkInputValidity() || !solveSudoku()) {
		cout<<STATUS_INCORRECT_INPUT<<endl;
		return STATUS_INCORRECT_INPUT;
	}

	for(int i = 0; i < size; i++) {
		for(int j = 0; j < size; j++) {
			cout<<input[i][j]<<" ";
		}
	}

	return STATUS_SUCCESS;
}
