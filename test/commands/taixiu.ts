import crypto from 'crypto';

// Generate a cryptographically secure random number between 1 and 6
function getRandomNumber(min: number, max: number) {
    const range = max - min + 1;
    const bytesNeeded = Math.ceil(Math.log2(range) / 8);
    const randomBytes = crypto.randomBytes(bytesNeeded);
    const randomNumber = randomBytes.readUIntBE(0, bytesNeeded);
    return min + (randomNumber % range);
}

let gameStarted = false;
let betsPlaced: Record<string, { amount: number; choice: string }> = {};
let result = '';
let gameTimer: NodeJS.Timeout | null = null;

// Function to start the game or place a bet
export default async function(client: any, message: any, args: string[]) {
    const command = args[0]?.toLowerCase(); // Get the command (start or bet)

    if (command === 'start') {
        startGame(client);
    } else if (command === 'bet') {
        placeBet(client, message, args);
    } else {
        await client.sendMsg('Invalid command. Please use "!taixiu start" to start the game or "!taixiu bet <sotien>" to place a bet.');
    }
}

// Function to start the game
async function startGame(client: any) {
    if (gameStarted) {
        await client.sendMsg('A game is already in progress.');
        return;
    }

    gameStarted = true;
    await client.sendMsg('Tài Xỉu game has started! Place your bets now.');

    // Start the game timer
    gameTimer = setTimeout(() => {
        endGame(client);
    }, 20000); // 20 seconds in milliseconds
}

// Function to place a bet
async function placeBet(client: any, message: any, args: string[]) {
    if (!gameStarted) {
        await client.sendMsg('No game is currently running.');
        return;
    }

    const betAmount = parseInt(args[1]);
    const betChoice = args[2]?.toLowerCase(); // 'tai' or 'xiu'

    if (isNaN(betAmount) || betAmount <= 0) {
        await client.sendMsg('Invalid bet amount.');
        return;
    }

    if (betChoice !== 'tai' && betChoice !== 'xiu') {
        await client.sendMsg('Invalid bet choice. Please choose either "tai" or "xiu".');
        return;
    }

    const user = message.author.name;
    if (betsPlaced[user]) {
        await client.sendMsg('You have already placed a bet.');
        return;
    }

    betsPlaced[user] = { amount: betAmount, choice: betChoice };
    await client.sendMsg(`Bet placed successfully! You've bet ${betAmount} on ${betChoice}.`);
}

// Function to end the game and calculate the result
async function endGame(client: any) {
    if (!gameStarted || !gameTimer) {
        return;
    }

    // Clear the game timer
    clearTimeout(gameTimer);

    // Simulate rolling the dice for the result (tai or xiu)
    function rollDice() {
        const result: number[] = [];
        for (let i = 0; i < 3; i++) {
            result.push(getRandomNumber(1, 6));
        }
        return result;
    }

    // Function to convert dice numbers to emoji
// Function to convert dice numbers to emoji
function convertToEmoji(diceNumbers: number[]) {
    const emojiMap: { [key: number]: string } = {
        1: '⚀',
        2: '⚁',
        3: '⚂',
        4: '⚃',
        5: '⚄',
        6: '⚅'
    };

    return diceNumbers.map(number => emojiMap[number]).join(' ');
}

    const diceNumbers = rollDice();
    const diceEmoji = convertToEmoji(diceNumbers);

    // Calculate winners and losers
    const winners = Object.keys(betsPlaced).filter(user => betsPlaced[user].choice === result);
    const losers = Object.keys(betsPlaced).filter(user => betsPlaced[user].choice !== result);

    // Send result message
    await client.sendMsg(`The result is: ${diceEmoji}.`);

    // Send winnings/losses message to each user
    for (const user of winners) {
        const winnings = betsPlaced[user].amount * 2;
        await client.sendMsg(`${user} wins ${winnings}!`);
    }

    for (const user of losers) {
        await client.sendMsg(`${user} loses.`);
    }

    // Reset game state
    gameStarted = false;
    betsPlaced = {};
    result = '';
}
