var NUMBER_OF_COLS = 8,
    NUMBER_OF_ROWS = 8,
    BLOCK_SIZE =100,
    BLOCK_COLOUR_1 = '#fff',
    BLOCK_COLOUR_2 = '#00A859',
    HIGHLIGHT_COLOUR = '#302C2C',
    SELECT_LINE_WIDTH = 5,
    PIECE_BLUE = 0,
    PIECE_YELLOW = 1,
    PIECE_GREEN = 2,
    PIECE_WHITE = 3,
    IN_PLAY = 0,
    TAKEN = 1,
    SELECTED_PIECE = null,
    PLAYER_ONE = 0,
    PLAYER_TWO = 1,
    PLAYER_ONE_COLOR = '#3E4095',
    PLAYER_TWO_COLOR = '#FFCC29',
    PLAYER_ONE_NAME = 'Blue',
    PLAYER_TWO_NAME = 'Yellow',
    CURRENT_TURN = PLAYER_ONE,
    sound = new Audio("assets/sound/move.mp3");


function defaultPositions() {
    json = {
        "playerOne": 
        [
            {
                "piece": PIECE_BLUE,
                "row": 0,
                "col": 1,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_BLUE,
                "row": 0,
                "col": 3,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_BLUE,
                "row": 0,
                "col": 5,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_BLUE,
                "row": 0,
                "col": 7,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_BLUE,
                "row": 1,
                "col": 0,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_BLUE,
                "row": 1,
                "col": 2,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_BLUE,
                "row": 1,
                "col": 4,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_BLUE,
                "row": 1,
                "col": 6,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_BLUE,
                "row": 1,
                "col": 8,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_BLUE,
                "row": 2,
                "col": 1,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_BLUE,
                "row": 2,
                "col": 3,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_BLUE,
                "row": 2,
                "col": 5,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_BLUE,
                "row": 2,
                "col": 7,
                "status": IN_PLAY
            }                                          
        ],
        "playerTwo": 
        [
            {
                "piece": PIECE_YELLOW,
                "row": 7,
                "col": 0,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_YELLOW,
                "row": 7,
                "col": 2,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_YELLOW,
                "row": 7,
                "col": 4,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_YELLOW,
                "row": 7,
                "col": 6,
                "status": IN_PLAY
            },                        
            {
                "piece": PIECE_YELLOW,
                "row": 6,
                "col": 1,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_YELLOW,
                "row": 6,
                "col": 3,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_YELLOW,
                "row": 6,
                "col": 5,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_YELLOW,
                "row": 6,
                "col": 7,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_YELLOW,
                "row": 5,
                "col": 0,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_YELLOW,
                "row": 5,
                "col": 2,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_YELLOW,
                "row": 5,
                "col": 4,
                "status": IN_PLAY
            },
            {
                "piece": PIECE_YELLOW,
                "row": 5,
                "col": 6,
                "status": IN_PLAY
            }
        ]       
    };
}

function skip(){
    CURRENT_TURN = (CURRENT_TURN === PLAYER_TWO ? PLAYER_ONE:PLAYER_TWO);
    document.getElementById("turn").innerHTML=(CURRENT_TURN === PLAYER_TWO ? PLAYER_TWO_NAME : PLAYER_ONE_NAME);
    document.getElementById("turn").style.color = (CURRENT_TURN === PLAYER_TWO ? PLAYER_TWO_COLOR : PLAYER_ONE_COLOR);
    if (SELECTED_PIECE != null) {
        removeSelection(SELECTED_PIECE); 
        SELECTED_PIECE = null;
    }
}

function getBlockColour(x, y){
    var cStartColour;                 
    if(y % 2) {
        cStartColour = (x % 2 ? BLOCK_COLOUR_1 : BLOCK_COLOUR_2);
    }
    else{
        cStartColour = (x % 2 ? BLOCK_COLOUR_2 : BLOCK_COLOUR_1);
    }     
    return cStartColour;
}

function drawBoard(){   
    for(x = 0; x < NUMBER_OF_COLS; x++){
        for(y = 0; y < NUMBER_OF_ROWS; y++){
            ctx.fillStyle = getBlockColour(x, y);
            ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            ctx.stroke();  
        }
    }
    ctx.strokeStyle=BLOCK_COLOUR_2;   
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, NUMBER_OF_ROWS * BLOCK_SIZE, NUMBER_OF_COLS * BLOCK_SIZE); 
}


function drawPlayerPieces(player) {
    for (i = 0; i < player.length; i++) {   
        
        var imageCoords = { 
            "x": (player[i].piece * BLOCK_SIZE),
            "y": 0
        }; 
        
        ctx.drawImage(
            pieces,
            imageCoords.x,
            imageCoords.y,
            BLOCK_SIZE,
            BLOCK_SIZE,
            (player[i].col * BLOCK_SIZE),
            (player[i].row * BLOCK_SIZE),
            BLOCK_SIZE,
            BLOCK_SIZE
        );
    }   
}

function selectPiece(pieceAtBlock) {
    // Draw border
    ctx.lineWidth = SELECT_LINE_WIDTH;
    ctx.strokeStyle = HIGHLIGHT_COLOUR;
    ctx.strokeRect(
        (pieceAtBlock.col * BLOCK_SIZE) + SELECT_LINE_WIDTH,
        (pieceAtBlock.row * BLOCK_SIZE) + SELECT_LINE_WIDTH, 
        BLOCK_SIZE - (SELECT_LINE_WIDTH * 2), 
        BLOCK_SIZE - (SELECT_LINE_WIDTH * 2)
    ); 
    SELECTED_PIECE = pieceAtBlock;
}

function getPieceAtBlockForPlayer(PlayerOfPieces, clickedBlock) {
    var currentPiece = null,
        pieceAtBlock = null;
     
    for (i = 0; i < PlayerOfPieces.length; i++) {
        currentPiece = PlayerOfPieces[i];
        if (currentPiece.status === IN_PLAY && currentPiece.col === clickedBlock.col && currentPiece.row === clickedBlock.row){
            currentPiece.position = i;
            pieceAtBlock = currentPiece;
            i = PlayerOfPieces.length;
        }
    } 
    return pieceAtBlock;
}

function getPieceAtBlock(clickedBlock) {
    var player = (CURRENT_TURN === PLAYER_ONE ? json.playerOne : json.playerTwo );
    return getPieceAtBlockForPlayer(player, clickedBlock);
}

function blockOccupiedByEnemy(clickedBlock) {
    var player = (CURRENT_TURN === PLAYER_ONE ? json.playerTwo : json.playerOne );
    return getPieceAtBlockForPlayer(player, clickedBlock);
}


function checkIfPieceClicked(clickedBlock){
    var pieceAtBlock = getPieceAtBlock(clickedBlock);
     
    if (pieceAtBlock !== null){
        selectPiece(pieceAtBlock);
    }
}

function getImageCoords(pieceCode) {

    var imageCoords =  {
        "x": pieceCode * BLOCK_SIZE,
        "y": 0
    };

    return imageCoords;
}

function drawPiece(curPiece) {

    var imageCoords = getImageCoords(curPiece.piece);

    // Draw the piece onto the canvas
    ctx.drawImage(pieces,
        imageCoords.x, imageCoords.y,
        BLOCK_SIZE, BLOCK_SIZE,
        curPiece.col * BLOCK_SIZE, curPiece.row * BLOCK_SIZE,
        BLOCK_SIZE, BLOCK_SIZE);
}

function drawBlock(iRowCounter, iBlockCounter) {
    // Set the background
    ctx.fillStyle = getBlockColour(iRowCounter, iBlockCounter);

    // Draw rectangle for the background
    ctx.fillRect(iRowCounter * BLOCK_SIZE, iBlockCounter * BLOCK_SIZE,
        BLOCK_SIZE, BLOCK_SIZE);

    ctx.stroke();
}

function blockOccupied(clickedBlock) {
    var pieceAtBlock = getPieceAtBlockForPlayer(json.playerOne, clickedBlock);

    if (pieceAtBlock === null) {
        pieceAtBlock = getPieceAtBlockForPlayer(json.playerTwo, clickedBlock);
    }

    return (pieceAtBlock !== null);
}

function movePiece(clickedBlock, enemyPiece) {
    // Clear the block in the original position
    drawBlock(SELECTED_PIECE.col, SELECTED_PIECE.row);
     
    var player = (CURRENT_TURN === PLAYER_TWO ? json.playerTwo : json.playerOne );
    var opposite = (CURRENT_TURN !== PLAYER_TWO ? json.playerTwo : json.playerOne );
 
    player[SELECTED_PIECE.position].col = clickedBlock.col;
    player[SELECTED_PIECE.position].row = clickedBlock.row;
     
    if (enemyPiece !== null){
        // Clear the piece your about to take
        drawBlock(enemyPiece.col, enemyPiece.row);  
        opposite[enemyPiece.position].status = TAKEN;
    }
     
    // Draw the piece in the new position
    sound.play();
    drawPiece(SELECTED_PIECE);             
     
    CURRENT_TURN = (CURRENT_TURN === PLAYER_TWO ? PLAYER_ONE:PLAYER_TWO);
    document.getElementById("turn").innerHTML=(CURRENT_TURN === PLAYER_TWO ? PLAYER_TWO_NAME : PLAYER_ONE_NAME);
    document.getElementById("turn").style.color = (CURRENT_TURN === PLAYER_TWO ? PLAYER_TWO_COLOR : PLAYER_ONE_COLOR);
    SELECTED_PIECE = null;
}

function canPieceMoveToBlock(selectedPiece, clickedBlock, enemyPiece){
    //TODO: make shure that piece only move in allowed areas                      
    return true;
}

function removeSelection(selectedPiece) {
    drawBlock(selectedPiece.col, selectedPiece.row);
    drawPiece(selectedPiece);
}

function processMove(clickedBlock){
    var pieceAtBlock = getPieceAtBlock(clickedBlock),
        enemyPiece = blockOccupiedByEnemy(clickedBlock);

    if (pieceAtBlock !== null) {
        removeSelection(SELECTED_PIECE);
        checkIfPieceClicked(clickedBlock);          
    }
    else { //if (canPieceMoveToBlock(SELECTED_PIECE, clickedBlock, enemyPiece) === true)
        movePiece(clickedBlock, enemyPiece);
    }
}

function board_click(event) {

    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;

    var clickedBlock = {
        "row": Math.floor(y / BLOCK_SIZE),
        "col": Math.floor(x / BLOCK_SIZE)
    };
     
    if(SELECTED_PIECE == null){
        checkIfPieceClicked(clickedBlock);
    }
    else{
        processMove(clickedBlock);
    }
}

function draw(){
    canvas = document.getElementById('board');
    
    //if canvas is supported 
    if(canvas.getContext){
        ctx = canvas.getContext('2d');
         
        // Draw the background
        drawBoard();
 
        // Load initial game
        defaultPositions();
         
        // Draw pieces
        pieces = new Image();
        pieces.onload = function() {
            drawPlayerPieces(json.playerOne);
            drawPlayerPieces(json.playerTwo);
        };
        pieces.src = 'assets/images/pieces.png';
 
        //game loop
        canvas.addEventListener('click', board_click, false);
    }
    else{
        alert("Canvas not supported!");
    }
}            