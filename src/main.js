//red car is assumed to be horizontal, size 2, and on row 3
const Pieces = {
	red: { col: 3 },
	pc1: { col: 1, row: 4, orient: "vert", size: 3 },
	pc2: { col: 5, row: 6, orient: "horiz", size: 2 }
};

window.onload = () => {
	const board = document.querySelector("#board");
	renderBoard(board, Pieces);
}
