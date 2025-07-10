//基本的な変数宣言
const message: string = "Hello, TypeScript!";
const version: number = 1.0;
const isLearning: boolean = true;


//関数の定義
function greet(name: string): string {
    return `Hello, ${name}!`;
}

//関数の実行
const greeting = greet("TypeScript Learner");

//出力
console.log(message);
console.log(`Version: ${version}`);
console.log(`Is learning: ${isLearning}`);
console.log(greeting);
