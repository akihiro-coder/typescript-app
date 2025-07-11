// ===== letとは =====
// let: 再代入可能な変数を宣言するキーワード
// const: 再代入不可な定数を宣言するキーワード
// var: 古い書き方（スコープの問題があるため非推奨）

// 基本的なデータ型の定義
let userName: string = "Taro";        // 再代入可能
const appName: string = "ChatApp";    // 再代入不可（推奨）
let userAge: number = 30;
let isLoggedIn: boolean = true;
let lastLoginDate: Date = new Date();

// ===== nullとundefinedの違い =====
// null: 意図的に「値がない」ことを示す
// undefined: 変数が宣言されているが値が設定されていない状態

// 明示的にnull/undefinedを指定することのメリット：
// 1. コードの意図が明確になる
// 2. TypeScriptがより厳密な型チェックを行える
// 3. ランタイムエラーを防げる

let optionalValue: string | null = null;           // 意図的に空の値
let maybeNumber: number | undefined = undefined;   // まだ値が決まっていない

// ===== 実際のチャットアプリでの使用例 =====

// ユーザー情報（ログイン前はnull）
let currentUser: { id: string; name: string } | null = null;

// メッセージの返信先（通常のメッセージはundefined、返信メッセージは親IDを持つ）
let replyToMessageId: string | undefined = undefined;

// WebSocket接続状態
let socketConnection: WebSocket | null = null;

// ===== 型指定のメリットを示す例 =====

// ❌ 型指定なし - どんな値でも代入できてしまう
let userInput: any = "Hello";
userInput = 123;        // エラーにならない（危険）
userInput = true;       // エラーにならない（危険）

// ✅ 型指定あり - 間違った型の代入でコンパイルエラー
let safeUserInput: string = "Hello";
// safeUserInput = 123;  // コンパイルエラー！

// ===== いつ使うか =====

// 1. let vs const の使い分け
const API_URL = "https://api.example.com";  // 変更されない値はconst
let connectionRetryCount = 0;               // カウンターなど変更される値はlet

// 2. null vs undefined の使い分け
let profileImage: string | null = null;           // ユーザーが画像を設定していない（意図的に空）
let validationResult: string | undefined;         // バリデーション結果（まだチェックしていない）

// 3. チャットアプリでの実用例
interface ChatMessage {
  id: string;
  content: string;
  userId: string;
  replyTo?: string;      // undefined許可（返信でない場合）
  editedAt: Date | null; // null許可（編集されていない場合）
}

// メッセージ作成時の例
let newMessage: ChatMessage = {
  id: "msg-001",
  content: "Hello World!",
  userId: "user-001",
  replyTo: undefined,    // 新規メッセージなので返信ではない
  editedAt: null         // まだ編集されていない
};

// 編集後
newMessage.editedAt = new Date(); // 編集日時を設定
