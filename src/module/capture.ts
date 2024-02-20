import * as readline from 'readline';

// Hàm render PDF
export default async function renderPDF(page: any) {
    await page.pdf({ path: 'example.pdf', format: 'A4' });
    console.log('Đã tạo PDF thành công.');

    // Hỏi người dùng nếu muốn tiếp tục render
    askToContinue(page);
}

// Hàm hỏi người dùng nếu muốn tiếp tục render
function askToContinue(page : any) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Nhấn Enter để tiếp tục render, hoặc nhập "exit" để thoát: ', async (answer) => {
        rl.close();
        if (answer.trim().toLowerCase() === 'exit') {
            console.log('Thoát chương trình.');
            return;
        }

        // Tiếp tục render khi người dùng nhấn Enter
        await renderPDF(page);
    });
}

