function renderBoard(boardElement, pieces) {
	for (let id in pieces) {
		let p = pieces[id];

		console.log(`${p.col},${p.row}, ${p.orient} x ${p.size}`);

		const newPiece = document.createElement("div");

		newPiece.id = id;

		if (p.size === 2) {
			newPiece.classList.add("car");
		} else if (p.size === 3) {
			newPiece.classList.add("truck");
		}

		//TODO: error checking here
		if (p.orient) {
			newPiece.classList.add(p.orient);
		}
		
		newPiece.addEventListener("click", ev => {
			selectPiece(ev.target.id, pieces);
		});

		boardElement.appendChild(newPiece);
	}

	//move pieces to where they need to go
	updateBoard(pieces);
	
	initAvailableMoveElements(boardElement);
}

function updateBoard(pieces) {
	for (let id in pieces) {
		const p = pieces[id];
		const e = document.getElementById(id);

		e.style.gridColumnStart = p.col;

		if (p.row) {
			e.style.gridRowStart = p.row;
		}
	}
}

//create elements to visualize possible moves
function initAvailableMoveElements(boardElement) {
	for (let i=1; i<=6; i++) {
		for (let j=1; j<=6; j++) {
			const e = document.createElement("div");
			e.id = `available-${i}-${j}`;
			e.className = "available";
			//only show these elements when a piece is selected,
			//and the space represented by the element in question is
			//one of the possible moves for that piece. 
			e.style.display = "none";

			boardElement.appendChild(e);
		}
	}
}

function deselectAll() {
	//remove selected class from all elements
	const selected = document.getElementsByClassName("selected");
	for (e of selected) {
		e.classList.remove("selected");
	}

	//hide available moves squares
	const available = document.getElementsByClassName("available");
	for (e of available) {
		e.style.display = "none";
	}
}

function selectPiece(pieceId, pieces) {
	const el = document.getElementById(pieceId);
	const isSelected = el.classList.contains("selected");

	deselectAll();

	//if already selected, then deselect and go
	if (isSelected) { return; }

	el.classList.add("selected");

	const pc = pieces[pieceId];

	const possibleMoves = getPossibleMoves(pieceId, pieces);
	for (let move of possibleMoves) {
		const availableElement = getAvailableElementForMove(move, pc);
		availableElement.style.display = "block";

		//event handler needs to be a singleton,
		//so use onclick instead of addEventListener
		availableElement.onclick = function() {
			deselectAll();
			movePiece(pieceId, pieces, move);
			updateBoard(pieces);

			//did we win with this move?
			if (isWinner(pieces)) {
				const redElement = document.getElementById("red");
				const boardElement = redElement.parentElement;
				redElement.classList.add("free");
				boardElement.classList.add("winner");
			}
		}
	}
}

//pieces move based on their top-left position, but that doesn't look
//good in the UI: instead, we want availablity hints to show up on
//either side of the piece
function getAvailableElementForMove(move, piece) {
	//adjust position of possible move (which is
	//relative to top-left of piece) for UI (so squares look good)
	const pos = move.split(",").map(x => parseInt(x));

	if (pos[0] > piece.col) {
		pos[0] += piece.size;
		pos[0]--;
	} else if (pos[1] > piece.row) {
		pos[1] += piece.size;
		pos[1]--;
	}

	//map to element ID
	const availableId = "available-" + pos.join("-");
	return document.getElementById(availableId);
}
