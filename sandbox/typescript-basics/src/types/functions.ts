// 関数型定義
type MessageHandler = (message: ChatMessage) => void;

// Promise型(API通信で重要)
async function fetchMessages(roomId: string): Promise<ChatMessage[]> {
    const response = await fetch(`/api/messages/${roomId}`);
    return response.json();
}

// エラーハンドリング
type ApiResponse<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: string;
}
