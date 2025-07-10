// チャットアプリで使用する型定義例
interface ChatMessage {
    id: string; // メッセージの一意なID
    userId: string; // メッセージを送信したユーザーのID
    roomId: string; // メッセージが属するチャットルームのID
    content: string; // メッセージの内容
    timestamp: Date; // メッセージが送信された日時
}

interface ChatRoom {
    id: string; // チャットルームの一意なID
    name: string; // チャットルームの名前
    participants: User[]; // チャットルームの参加者
}

// Union Types (Important!)
// Union型は複数の型のうちのいずれか一つを表す
// パイプ記号（|）は「または」を意味する

/*
 * 文字列リテラル型 (String Literal Types) について
 *
 * 文字列リテラル型とは：
 * - 特定の文字列値のみを許可する型
 * - 通常のstring型とは異なり、指定された文字列値以外は受け入れない
 * - TypeScriptのコンパイル時に型チェックが行われる
 *
 * 利点：
 * 1. タイポや不正な値の代入を防ぐ
 * 2. IDEでの自動補完が効く
 * 3. コードの意図が明確になる
 * 4. リファクタリング時の安全性が向上
 *
 * 例：
 * string型の場合 → どんな文字列でも代入可能（"abc", "xyz", "invalid"など）
 * 文字列リテラル型の場合 → 指定された文字列のみ代入可能
 */

// この型は以下の3つの文字列リテラルのうち、いずれか一つの値のみを許可する：
// - "connecting": 接続中の状態（文字列リテラル）
// - "connected": 接続済みの状態（文字列リテラル）
// - "disconnected": 切断された状態（文字列リテラル）
type ConnectionStatus = "connecting" | "connected" | "disconnected";

// 文字列リテラル型と通常のstring型の比較例
// 通常のstring型（何でも受け入れる）
let anyString: string = "any value"; // ✅ OK
anyString = "invalid status"; // ✅ OK（でも実際のアプリでは問題になる可能性）

// 文字列リテラル型（指定された値のみ受け入れる）
let statusLiteral: ConnectionStatus = "connected"; // ✅ OK
// statusLiteral = "invalid"; // ❌ TypeScriptエラー：Type '"invalid"' is not assignable to type 'ConnectionStatus'

// Union型の使用例
function handleConnectionStatus(status: ConnectionStatus) {
    switch (status) {
        case "connecting":
            console.log("接続を試行中...");
            break;
        case "connected":
            console.log("接続が確立されました");
            break;
        case "disconnected":
            console.log("接続が切断されました");
            break;
        // default: // TypeScriptが全てのケースをカバーしていることを確認できる
    }
}

// 正しい使用例
const currentStatus: ConnectionStatus = "connected"; // ✅ OK

// 間違った使用例（TypeScriptがエラーを出す）
// const invalidStatus: ConnectionStatus = "invalid"; // ❌ Error: Type '"invalid"' is not assignable to type 'ConnectionStatus'

// より複雑なUnion型の例
type MessageType = "text" | "image" | "file" | "system";

// オブジェクトのUnion型（判別可能ユニオン）
type ApiResponse =
    | { success: true; data: ChatMessage[] }
    | { success: false; error: string };

// 数値と文字列のUnion型
type Id = string | number;

// ユーザーの状態を表すUnion型
type UserStatus = "online" | "away" | "busy" | "offline";

// メッセージの内容を表すUnion型（型によって構造が異なる）
type MessageContent =
    | { type: "text"; text: string }
    | { type: "image"; imageUrl: string; caption?: string }
    | { type: "file"; fileName: string; fileUrl: string; fileSize: number };

// Userインターフェースの定義（ChatRoomで使用）
interface User {
    id: string;
    name: string;
    email: string;
    status: UserStatus; // Union型を使用
}

// 拡張されたChatMessage（Union型を活用）
interface ExtendedChatMessage {
    id: Id; // string | number
    userId: string;
    roomId: string;
    content: MessageContent; // Union型
    messageType: MessageType; // Union型
    timestamp: Date;
}

/*
 * ========================================================================
 * チャットアプリケーションでの実用的なInterface活用例（200行）
 * ========================================================================
 */

// 1. インターフェースの継承（extends）- 基本メッセージから特化型を作成
interface BaseMessage {
    id: string;
    userId: string;
    roomId: string;
    timestamp: Date;
    edited?: boolean;
    editedAt?: Date;
}

interface TextMessage extends BaseMessage {
    type: "text";
    content: string;
    mentions?: string[]; // @mention機能用
}

interface ImageMessage extends BaseMessage {
    type: "image";
    imageUrl: string;
    caption?: string;
    thumbnailUrl?: string;
}

interface FileMessage extends BaseMessage {
    type: "file";
    fileName: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
}

// 2. 判別可能ユニオン型 - メッセージの種類を安全に判別
type ChatMessageVariant = TextMessage | ImageMessage | FileMessage;

// 3. ジェネリクス型を使ったAPI応答の型安全性
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: Record<string, any>;
    };
    timestamp: Date;
}

// 4. Socket.IOイベント型定義 - リアルタイム通信の型安全性
interface ServerToClientEvents {
    // メッセージ関連
    messageReceived: (message: ChatMessageVar// チャットアプリで使用する型定義例
    interface ChatMessage {
        id: string; // メッセージの一意なID
        userId: string; // メッセージを送信したユーザーのID
        roomId: string; // メッセージが属するチャットルームのID
        content: string; // メッセージの内容
        timestamp: Date; // メッセージが送信された日時
}

interface ChatRoom {
    id: string; // チャットルームの一意なID
    name: string; // チャットルームの名前
    participants: User[]; // チャットルームの参加者
}

// Union Types (Important!)
// Union型は複数の型のうちのいずれか一つを表す
// パイプ記号（|）は「または」を意味する

/*
 * 文字列リテラル型 (String Literal Types) について
 *
 * 文字列リテラル型とは：
 * - 特定の文字列値のみを許可する型
 * - 通常のstring型とは異なり、指定された文字列値以外は受け入れない
 * - TypeScriptのコンパイル時に型チェックが行われる
 *
 * 利点：
 * 1. タイポや不正な値の代入を防ぐ
 * 2. IDEでの自動補完が効く
 * 3. コードの意図が明確になる
 * 4. リファクタリング時の安全性が向上
 *
 * 例：
 * string型の場合 → どんな文字列でも代入可能（"abc", "xyz", "invalid"など）
 * 文字列リテラル型の場合 → 指定された文字列のみ代入可能
 */

// この型は以下の3つの文字列リテラルのうち、いずれか一つの値のみを許可する：
// - "connecting": 接続中の状態（文字列リテラル）
// - "connected": 接続済みの状態（文字列リテラル）
// - "disconnected": 切断された状態（文字列リテラル）
type ConnectionStatus = "connecting" | "connected" | "disconnected";

// 文字列リテラル型と通常のstring型の比較例
// 通常のstring型（何でも受け入れる）
let anyString: string = "any value"; // ✅ OK
anyString = "invalid status"; // ✅ OK（でも実際のアプリでは問題になる可能性）

// 文字列リテラル型（指定された値のみ受け入れる）
let statusLiteral: ConnectionStatus = "connected"; // ✅ OK
// statusLiteral = "invalid"; // ❌ TypeScriptエラー：Type '"invalid"' is not assignable to type 'ConnectionStatus'

// Union型の使用例
function handleConnectionStatus(status: ConnectionStatus) {
    switch (status) {
        case "connecting":
            console.log("接続を試行中...");
            break;
        case "connected":
            console.log("接続が確立されました");
            break;
        case "disconnected":
            console.log("接続が切断されました");
            break;
        // default: // TypeScriptが全てのケースをカバーしていることを確認できる
    }
}

// 正しい使用例
const currentStatus: ConnectionStatus = "connected"; // ✅ OK

// 間違った使用例（TypeScriptがエラーを出す）
// const invalidStatus: ConnectionStatus = "invalid"; // ❌ Error: Type '"invalid"' is not assignable to type 'ConnectionStatus'

// より複雑なUnion型の例
type MessageType = "text" | "image" | "file" | "system";

// オブジェクトのUnion型（判別可能ユニオン）
type ApiResponse =
    | { success: true; data: ChatMessage[] }
    | { success: false; error: string };

// 数値と文字列のUnion型
type Id = string | number;

// ユーザーの状態を表すUnion型
type UserStatus = "online" | "away" | "busy" | "offline";

// メッセージの内容を表すUnion型（型によって構造が異なる）
type MessageContent =
    | { type: "text"; text: string }
    | { type: "image"; imageUrl: string; caption?: string }
    | { type: "file"; fileName: string; fileUrl: string; fileSize: number };

// Userインターフェースの定義（ChatRoomで使用）
interface User {
    id: string;
    name: string;
    email: string;
    status: UserStatus; // Union型を使用
}

// 拡張されたChatMessage（Union型を活用）
interface ExtendedChatMessage {
    id: Id; // string | number
    userId: string;
    roomId: string;
    content: MessageContent; // Union型
    messageType: MessageType; // Union型
    timestamp: Date;
}

/*
 * ========================================================================
 * チャットアプリケーションでの実用的なInterface活用例（200行）
 * ========================================================================
 */

// 1. インターフェースの継承（extends）- 基本メッセージから特化型を作成
interface BaseMessage {
    id: string;
    userId: string;
    roomId: string;
    timestamp: Date;
    edited?: boolean;
    editedAt?: Date;
}

interface TextMessage extends BaseMessage {
    type: "text";
    content: string;
    mentions?: string[]; // @mention機能用
}

interface ImageMessage extends BaseMessage {
    type: "image";
    imageUrl: string;
    caption?: string;
    thumbnailUrl?: string;
}

interface FileMessage extends BaseMessage {
    type: "file";
    fileName: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
}

// 2. 判別可能ユニオン型 - メッセージの種類を安全に判別
type ChatMessageVariant = TextMessage | ImageMessage | FileMessage;

// 3. ジェネリクス型を使ったAPI応答の型安全性
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: Record<string, any>;
    };
    timestamp: Date;
}

// 4. Socket.IOイベント型定義 - リアルタイム通信の型安全性
interface ServerToClientEvents {
    // メッセージ関連
    messageReceived: (message: ChatMessageVariant) => void;
    messageDeleted: (data: { messageId: string; roomId: string }) => void;
    messageEdited: (data: { messageId: string; newContent: string }) => void;

    // ユーザー関連
    userJoined: (data: { user: User; roomId: string }) => void;
    userLeft: (data: { userId: string; roomId: string }) => void;
    userTyping: (data: { userId: string; roomId: string; isTyping: boolean }) => void;

    // ルーム関連
    roomCreated: (room: ChatRoom) => void;
    roomUpdated: (room: Partial<ChatRoom> & { id: string }) => void;

    // エラー処理
    error: (error: { message: string; code: string }) => void;
}

interface ClientToServerEvents {
    // メッセージ送信
    sendMessage: (data: Omit<ChatMessageVariant, "id" | "timestamp">) => void;
    editMessage: (data: { messageId: string; newContent: string }) => void;
    deleteMessage: (data: { messageId: string }) => void;

    // ルーム操作
    joinRoom: (data: { roomId: string }) => void;
    leaveRoom: (data: { roomId: string }) => void;
    createRoom: (data: { name: string; isPrivate: boolean }) => void;

    // タイピング状態
    startTyping: (data: { roomId: string }) => void;
    stopTyping: (data: { roomId: string }) => void;
}

// 5. React Props型定義 - コンポーネント間の型安全性
interface ChatMessageProps {
    message: ChatMessageVariant;
    currentUserId: string;
    showAvatar?: boolean;
    showTimestamp?: boolean;
    onReply?: (messageId: string) => void;
    onEdit?: (messageId: string, newContent: string) => void;
    onDelete?: (messageId: string) => void;
    onUserClick?: (userId: string) => void;
}

interface ChatInputProps {
    roomId: string;
    onSendMessage: (content: string, type: MessageType) => void;
    onFileUpload: (file: File) => void;
    onTypingStart: () => void;
    onTypingStop: () => void;
    disabled?: boolean;
    placeholder?: string;
    maxLength?: number;
}

interface ChatRoomListProps {
    rooms: ChatRoom[];
    activeRoomId?: string;
    onRoomSelect: (roomId: string) => void;
    onRoomCreate: () => void;
    onRoomLeave: (roomId: string) => void;
}

// 6. カスタムフック型定義 - Reactフックの型安全性
interface UseWebSocketReturn {
    socket: any | null; // 実際はSocket.IOの型
    isConnected: boolean;
    connectionError: string | null;
    sendMessage: (message: Omit<ChatMessageVariant, "id" | "timestamp">) => void;
    joinRoom: (roomId: string) => void;
    leaveRoom: (roomId: string) => void;
}

interface UseChatReturn {
    messages: Record<string, ChatMessageVariant[]>; // roomId -> messages
    sendMessage: (roomId: string, content: string, type: MessageType) => Promise<void>;
    editMessage: (messageId: string, newContent: string) => Promise<void>;
    deleteMessage: (messageId: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}

// 7. 状態管理型定義（Redux/Zustand用）
interface ChatState {
    // ユーザー情報
    currentUser: User | null;
    isAuthenticated: boolean;

    // チャットルーム
    rooms: Record<string, ChatRoom>;
    activeRoomId: string | null;

    // メッセージ
    messages: Record<string, ChatMessageVariant[]>; // roomId -> messages

    // UI状態
    typingUsers: Record<string, string[]>; // roomId -> userIds
    connectionStatus: ConnectionStatus;

    // 設定
    notifications: boolean;
    soundEnabled: boolean;
}

interface ChatActions {
    // 認証
    login: (user: User) => void;
    logout: () => void;

    // ルーム操作
    setActiveRoom: (roomId: string) => void;
    addRoom: (room: ChatRoom) => void;
    removeRoom: (roomId: string) => void;

    // メッセージ操作
    addMessage: (roomId: string, message: ChatMessageVariant) => void;
    updateMessage: (roomId: string, messageId: string, updates: Partial<ChatMessageVariant>) => void;
    removeMessage: (roomId: string, messageId: string) => void;

    // UI状態
    setTypingUsers: (roomId: string, userIds: string[]) => void;
    setConnectionStatus: (status: ConnectionStatus) => void;
}

// 8. データベース関連型定義（ORMとの連携）
interface DatabaseUser {
    id: string;
    username: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
    isOnline: boolean;
    lastSeenAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

interface DatabaseMessage {
    id: string;
    content: string;
    messageType: MessageType;
    userId: string;
    roomId: string;
    replyToId?: string;
    isEdited: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

interface DatabaseRoom {
    id: string;
    name: string;
    description?: string;
    isPrivate: boolean;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}

// 9. API エンドポイント型定義
interface CreateRoomRequest {
    name: string;
    description?: string;
    isPrivate: boolean;
}

interface JoinRoomRequest {
    roomId: string;
    password?: string;
}

interface SendMessageRequest {
    roomId: string;
    content: string;
    type: MessageType;
    replyToId?: string;
}

// 10. フォームバリデーション型定義
interface LoginForm {
    email: string;
    password: string;
}

interface RegisterForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    displayName: string;
}

interface CreateRoomForm {
    name: string;
    description: string;
    isPrivate: boolean;
    password?: string;
}

// 型ガード関数（実装例）
function isTextMessage(message: ChatMessageVariant): message is TextMessage {
    return message.type === "text";
}

function isImageMessage(message: ChatMessageVariant): message is ImageMessage {
    return message.type === "image";
}

// Utility Types の活用例
type PartialUser = Partial<User>; // 全プロパティがオプショナル
type RequiredUser = Required<User>; // 全プロパティが必須
type UserWithoutId = Omit<User, "id">; // idを除外
type UserIdAndName = Pick<User, "id" | "name">; // idとnameのみ
iant) => void;
    messageDeleted: (data: { messageId: string; roomId: string }) => void;
    messageEdited: (data: { messageId: string; newContent: string }) => void;

    // ユーザー関連
    userJoined: (data: { user: User; roomId: string }) => void;
    userLeft: (data: { userId: string; roomId: string }) => void;
    userTyping: (data: { userId: string; roomId: string; isTyping: boolean }) => void;

    // ルーム関連
    roomCreated: (room: ChatRoom) => void;
    roomUpdated: (room: Partial<ChatRoom> & { id: string }) => void;

    // エラー処理
    error: (error: { message: string; code: string }) => void;
}

interface ClientToServerEvents {
    // メッセージ送信
    sendMessage: (data: Omit<ChatMessageVariant, "id" | "timestamp">) => void;
    editMessage: (data: { messageId: string; newContent: string }) => void;
    deleteMessage: (data: { messageId: string }) => void;

    // ルーム操作
    joinRoom: (data: { roomId: string }) => void;
    leaveRoom: (data: { roomId: string }) => void;
    createRoom: (data: { name: string; isPrivate: boolean }) => void;

    // タイピング状態
    startTyping: (data: { roomId: string }) => void;
    stopTyping: (data: { roomId: string }) => void;
}

// 5. React Props型定義 - コンポーネント間の型安全性
interface ChatMessageProps {
    message: ChatMessageVariant;
    currentUserId: string;
    showAvatar?: boolean;
    showTimestamp?: boolean;
    onReply?: (messageId: string) => void;
    onEdit?: (messageId: string, newContent: string) => void;
    onDelete?: (messageId: string) => void;
    onUserClick?: (userId: string) => void;
}

interface ChatInputProps {
    roomId: string;
    onSendMessage: (content: string, type: MessageType) => void;
    onFileUpload: (file: File) => void;
    onTypingStart: () => void;
    onTypingStop: () => void;
    disabled?: boolean;
    placeholder?: string;
    maxLength?: number;
}

interface ChatRoomListProps {
    rooms: ChatRoom[];
    activeRoomId?: string;
    onRoomSelect: (roomId: string) => void;
    onRoomCreate: () => void;
    onRoomLeave: (roomId: string) => void;
}

// 6. カスタムフック型定義 - Reactフックの型安全性
interface UseWebSocketReturn {
    socket: any | null; // 実際はSocket.IOの型
    isConnected: boolean;
    connectionError: string | null;
    sendMessage: (message: Omit<ChatMessageVariant, "id" | "timestamp">) => void;
    joinRoom: (roomId: string) => void;
    leaveRoom: (roomId: string) => void;
}

interface UseChatReturn {
    messages: Record<string, ChatMessageVariant[]>; // roomId -> messages
    sendMessage: (roomId: string, content: string, type: MessageType) => Promise<void>;
    editMessage: (messageId: string, newContent: string) => Promise<void>;
    deleteMessage: (messageId: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}

// 7. 状態管理型定義（Redux/Zustand用）
interface ChatState {
    // ユーザー情報
    currentUser: User | null;
    isAuthenticated: boolean;

    // チャットルーム
    rooms: Record<string, ChatRoom>;
    activeRoomId: string | null;

    // メッセージ
    messages: Record<string, ChatMessageVariant[]>; // roomId -> messages

    // UI状態
    typingUsers: Record<string, string[]>; // roomId -> userIds
    connectionStatus: ConnectionStatus;

    // 設定
    notifications: boolean;
    soundEnabled: boolean;
}

interface ChatActions {
    // 認証
    login: (user: User) => void;
    logout: () => void;

    // ルーム操作
    setActiveRoom: (roomId: string) => void;
    addRoom: (room: ChatRoom) => void;
    removeRoom: (roomId: string) => void;

    // メッセージ操作
    addMessage: (roomId: string, message: ChatMessageVariant) => void;
    updateMessage: (roomId: string, messageId: string, updates: Partial<ChatMessageVariant>) => void;
    removeMessage: (roomId: string, messageId: string) => void;

    // UI状態
    setTypingUsers: (roomId: string, userIds: string[]) => void;
    setConnectionStatus: (status: ConnectionStatus) => void;
}

// 8. データベース関連型定義（ORMとの連携）
interface DatabaseUser {
    id: string;
    username: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
    isOnline: boolean;
    lastSeenAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

interface DatabaseMessage {
    id: string;
    content: string;
    messageType: MessageType;
    userId: string;
    roomId: string;
    replyToId?: string;
    isEdited: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

interface DatabaseRoom {
    id: string;
    name: string;
    description?: string;
    isPrivate: boolean;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}

// 9. API エンドポイント型定義
interface CreateRoomRequest {
    name: string;
    description?: string;
    isPrivate: boolean;
}

interface JoinRoomRequest {
    roomId: string;
    password?: string;
}

interface SendMessageRequest {
    roomId: string;
    content: string;
    type: MessageType;
    replyToId?: string;
}

// 10. フォームバリデーション型定義
interface LoginForm {
    email: string;
    password: string;
}

interface RegisterForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    displayName: string;
}

interface CreateRoomForm {
    name: string;
    description: string;
    isPrivate: boolean;
    password?: string;
}

// 型ガード関数（実装例）
function isTextMessage(message: ChatMessageVariant): message is TextMessage {
    return message.type === "text";
}

function isImageMessage(message: ChatMessageVariant): message is ImageMessage {
    return message.type === "image";
}

// Utility Types の活用例
type PartialUser = Partial<User>; // 全プロパティがオプショナル
type RequiredUser = Required<User>; // 全プロパティが必須
type UserWithoutId = Omit<User, "id">; // idを除外
type UserIdAndName = Pick<User, "id" | "name">; // idとnameのみ
