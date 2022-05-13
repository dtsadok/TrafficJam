function renderBoard(boardElement, pieces) {
	for (let id in Pieces) {

		let p = Pieces[id];

		console.log(`${p.col},${p.row}, ${p.orient} x ${p.size}`);

		const newPiece = document.createElement("div");

		newPiece.id = id;

		newPiece.style.gridColumnStart = p.col;

		if (p.row) {
			newPiece.style.gridRowStart = p.row;
		}

		if (p.size === 2) {
			newPiece.classList.add("car");
		} else if (p.size === 3) {
			newPiece.classList.add("truck");
		}

		//TODO: error checking here
		if (p.orient) {
			newPiece.classList.add(p.orient);
		}

		boardElement.appendChild(newPiece);
	}
}
