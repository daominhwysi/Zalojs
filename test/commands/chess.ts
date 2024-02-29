// // chessBot.ts

// import { Chess } from 'chess.js';

// const game = new Chess();
// let gameStarted = false;

// export default async function(client: any, message: any, args: any[]) {
//     const command = args[0]?.toLowerCase(); // Get the command (start, move, or end)

//     if (command === 'start') {
//         startGame(client, message);
//     } else if (command === 'move') {
//         movePiece(client, message, args);
//     } else if (command === 'end') {
//         await endGame(client);
//     } else {
//         await client.sendMsg('Invalid command. Please use "!chess start" to start the game, "!chess move" to make a move, or "!chess end" to end the game.');
//     }
// }

// // Function to make a move
// async function movePiece(client: any, message: any, args: string[]) {
//     if (!gameStarted) {
//         await client.sendMsg('No game is currently running.');
//         return;
//     }

//     // Assume args[1] contains the move in the format e.g., e2toe4 or e2e4
//     const moveString = args.slice(1).join('').toLowerCase();
//     let fromSquare: string, toSquare: string;

//     if (moveString.includes('to')) {
//         const [fromPart, toPart] = moveString.split('to');
//         fromSquare = fromPart.trim();
//         toSquare = toPart.trim();
//     } else {
//         fromSquare = moveString.substring(0, 2);
//         toSquare = moveString.substring(2);
//     }

//     const move = { from: fromSquare, to: toSquare };

//     try {
//         if (game.move(move)) {
//             await client.sendMsg(`Move ${fromSquare} to ${toSquare} successful.`);
//             await client.sendMsg(`Current board:\n${game.ascii()}`); // Send ASCII representation of the board
//             // Check if game is over
//             if (game.isGameOver() || game.isDraw() || game.isCheckmate()) {
//                 await endGame(client);
//             }
//         } else {
//             await client.sendMsg('Invalid move. Please try again.');
//         }
//     } catch (error) {
//         console.error('Error occurred while making the move:', error);
//         await client.sendMsg('An error occurred while making the move. Please try again.');
//     }
// }



// // Function to start a game
// async function startGame(client: any, message: any) {
//     if (gameStarted) {
//         await client.sendMsg('A game is already in progress.');
//         return;
//     }

//     gameStarted = true;
//     await client.sendMsg('A new game has started.');
//     await client.sendMsg(`Current board:\n${game.ascii()}`); // Send ASCII representation of the initial board
// }

// // Function to end the game
// async function endGame(client: any) {
//     if (!gameStarted) {
//         return;
//     }

//     gameStarted = false;
//     await client.sendMsg('Game Over.');
//     game.reset();
// }
