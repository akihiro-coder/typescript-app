// チャットアプリケーションでよく使用するUnion型の例

// 接続状態の型 リテラル型の組み合わせ
type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

// メッセージの種類
type MessageType = "test" | "image" | "file" | "system";

// ユーザーの権限レベル
