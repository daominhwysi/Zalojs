const { Chess } = require('chess.js');
const axios = require('axios');
const path = require('path')
const fs = require('fs')
const game = new Chess();
let gameStarted = false;

async function chess(message, client, args) {
    const command = args[0]?.toLowerCase(); // Get the command (start, move, or end)

    if (command === 'start') {
        startGame(client, message);
    } else if (command === 'move') {
        movePiece(client, message, args);
    } else if (command === 'end') {
        await endGame(client);
    } else {
        await client.send({ message : 'Invalid command. Please use "!chess start" to start the game, "!chess move" to make a move, or "!chess end" to end the game.'});
    }
}

// Function to make a move
async function movePiece(client, message, args) {
    if (!gameStarted) {
        await client.send({ message : 'No game is currently running.'});
        return;
    }

    // Assume args[1] contains the move in the format e.g., e2toe4 or e2e4
    const moveString = args.slice(1).join('').toLowerCase();
    let fromSquare, toSquare;

    if (moveString.includes('to')) {
        const [fromPart, toPart] = moveString.split('to');
        fromSquare = fromPart.trim();
        toSquare = toPart.trim();
    } else {
        fromSquare = moveString.substring(0, 2);
        toSquare = moveString.substring(2);
    }

    const move = { from: fromSquare, to: toSquare };

    try {
        if (game.move(move)) {
            await client.send({ message : `Move ${fromSquare} to ${toSquare} successful.`});
            await sendBoardImage(client);
            // Check if game is over
            if (game.isGameOver() || game.isDraw() || game.isCheckmate()) {
                await endGame(client);
            }
        } else {
            await client.send({message : 'Invalid move. Please try again.'});
        }
    } catch (error) {
        console.error('Error occurred while making the move:', error);
        await client.send({ message : 'An error occurred while making the move. Please try again.'})
    }
}

// Function to send board image
async function sendBoardImage(client) {
    const fen = game.fen();
    const imageUrl = `https://fen2png.com/api/?fen=${fen}&raw=true`;
  
    try {
        
      const response = await axios.get(imageUrl, { responseType: 'stream' });
      await response.data.pipe(fs.createWriteStream(path.join(__dirname, 'saved_image.png')));
      await client.send({file : path.join(__dirname, 'saved_image.png')})
    } catch (error) {
      console.error('Error occurred while fetching or uploading the image:', error);
    }
}

// Function to start a game
async function startGame(client, message) {
    if (gameStarted) {
        await client.send({message :'A game is already in progress.'});
        return;
    }

    gameStarted = true;
    await client.send({message : 'A new game has started.'});
    await sendBoardImage(client);
}

// Function to end the game
async function endGame(client) {
    if (!gameStarted) {
        return;
    }

    gameStarted = false;
    await client.send({message : 'Game Over.'});
    game.reset();
}

module.exports = chess;
