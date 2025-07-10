// 動作確認用のテストファイル
console.log("TypeScript練習環境のセットアップ完了！");

const message: string = "Hello TypeScript!";
const numbers: number[] = [1, 2, 3];

console.log(message);
console.log("配列の合計:", numbers.reduce((a, b) => a + b, 0));
