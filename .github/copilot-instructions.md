# プロジェクトの目的
- (前提)僕はTypeScriptを使った開発が初心者です。
- このプロジェクトの目的は以下のとおりです。
  - TypeScriptのコーディングに慣れること。
  - WebSocketを使ったリアルタイムチャットアプリケーションを開発すること。
  - リアルタイムチャットアプリケーションの開発を通じて、システムデザイン、特にスケーリングやパフォーマンスの最適化について学ぶこと。
- このプロジェクトでは、以下の技術スタックを使用します。
  - フロントエンド: React (Next.js) + TypeScript
  - バックエンド: Node.js (Express または Fastify) + TypeScript
  - リアルタイム通信: Socket.IO
  - データベース: PostgreSQL
  - ORM: Prisma または TypeORM / Drizzle ORM
- 開発は段階的に以下のように進めていきます。
* **ステップ1: 基本的なチャット（HTTP + WebSocket）**
    * **目的**: HTTPでの履歴取得とWebSocketでのリアルタイム通信の連携を理解する。
    * **フロントエンド**: React (またはVue.js, Svelteなど) でチャットUIを作成。
        * 起動時にHTTP GETで過去メッセージを取得・表示。
        * メッセージ送信はWebSocketでサーバーへ。
        * WebSocketで受信したメッセージを画面に追加。
    * **バックエンド**: Node.js (Express + `ws` または Socket.IO) / Python (Flask + Flask-SocketIO) / Go (Gorilla WebSocket) など。
        * HTTP GETエンドポイントでDBからメッセージ履歴を返す。
        * WebSocketエンドポイントでメッセージを受信・ブロードキャスト。
        * **データベース**: SQLite (簡易的) または PostgreSQL/MySQL (本番志向) を利用し、メッセージを永続化。

* **ステップ2: 複数チャットルームとユーザー管理**
    * **目的**: ユーザー認証、複数ルームへの対応、ユーザー状態管理。
    * **機能追加**:
        * ユーザー登録・ログイン機能（HTTP POSTで認証、JWTなどでセッション管理）。
        * 複数のチャットルームを作成・参加できる機能。
        * WebSocket接続時にユーザーIDとルームIDを紐付け、特定のルームにのみメッセージをブロードキャストするロジック。
        * ユーザーのオンライン/オフライン状態をWebSocketで通知し、表示する機能。

* **ステップ3: スケーリングの考慮（簡易版）**
    * **目的**: 単一サーバーの限界と、複数サーバーでの連携の必要性を体験。
    * **機能追加**:
        * **メッセージキューの導入**: バックエンドサーバーを複数台にする前提で、メッセージ送信時に直接ブロードキャストせず、メッセージキュー（例: Redis Pub/Sub、RabbitMQ）にメッセージを発行する。
        * **複数のWebSocketサーバー**: 複数のバックエンドサーバーがメッセージキューを購読し、それぞれが接続しているクライアントにメッセージをブロードキャストするようにする。
        * **課題の認識**: この段階で、スティッキーセッション、セッション状態の共有、デプロイの複雑さなど、分散システム特有の課題に直面するはずです。




# このプロジェクトの目的を達成するためのTypeScriptの学習計画

## 📚 TypeScript学習ロードマップ

### **Phase 1: TypeScript基礎（必須）**

#### 1. 型システムの基本
````typescript
// 基本型
let message: string = "Hello";
let count: number = 10;
let isOnline: boolean = true;

// オブジェクト型
interface User {
  id: number;
  name: string;
  email?: string; // オプショナル
}

// 配列型
let users: User[] = [];
let messages: Array<string> = [];
````

#### 2. インターフェースと型エイリアス
````typescript
// チャットアプリで使用する型定義例
interface ChatMessage {
  id: string;
  userId: string;
  roomId: string;
  content: string;
  timestamp: Date;
}

interface ChatRoom {
  id: string;
  name: string;
  participants: User[];
}

// Union Types（重要！）
type ConnectionStatus = "connecting" | "connected" | "disconnected";
````

#### 3. 関数型とPromise/async-await
````typescript
// 関数型定義
type MessageHandler = (message: ChatMessage) => void;

// Promise型（API通信で重要）
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
};
````

### **Phase 2: React + TypeScript（フロントエンド）**

#### 1. コンポーネント型定義
````typescript
// React Props
interface ChatMessageProps {
  message: ChatMessage;
  currentUserId: string;
  onReply?: (messageId: string) => void;
}

// React Component
const ChatMessageComponent: React.FC<ChatMessageProps> = ({
  message,
  currentUserId,
  onReply
}) => {
  // コンポーネント実装
};
````

#### 2. Hooks with TypeScript
````typescript
// useState
const [messages, setMessages] = useState<ChatMessage[]>([]);
const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected");

// useEffect
useEffect(() => {
  // WebSocket接続処理
}, []);

// Custom Hook
function useWebSocket(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  return { socket, isConnected };
}
````

### **Phase 3: Node.js + TypeScript（バックエンド）**

#### 1. Express型定義
````typescript
import express, { Request, Response } from 'express';

// リクエスト/レスポンス型の拡張
interface AuthenticatedRequest extends Request {
  user?: User;
}

// API エンドポイント
app.get('/api/messages/:roomId', async (req: Request, res: Response) => {
  const { roomId } = req.params;
  // 実装
});
````

#### 2. Socket.IO型定義
````typescript
// Socket.IO Events型定義（重要！）
interface ServerToClientEvents {
  message: (data: ChatMessage) => void;
  userJoined: (user: User) => void;
  userLeft: (userId: string) => void;
}

interface ClientToServerEvents {
  sendMessage: (data: { roomId: string; content: string }) => void;
  joinRoom: (roomId: string) => void;
}

// Socket型
type Socket = SocketIOSocket<ClientToServerEvents, ServerToClientEvents>;
````

### **Phase 4: データベース + ORM**

#### 1. Prisma Schema定義
````prisma
// schema.prisma
model User {
  id       String @id @default(cuid())
  name     String
  email    String @unique
  messages Message[]
}

model Message {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())
  userId    String
  roomId    String
  user      User     @relation(fields: [userId], references: [id])
}
````

#### 2. Generated Types
````typescript
// Prismaが自動生成する型
import { User, Message, Prisma } from '@prisma/client';

// 関連データを含む型
type UserWithMessages = Prisma.UserGetPayload<{
  include: { messages: true }
}>;
````

## 🎯 学習の優先順位

1. **今すぐ必要**: Phase 1の基礎型システム
2. **ステップ1で必要**: Phase 2のReact型定義、Phase 3のExpress基礎
3. **ステップ2で必要**: Socket.IO型定義、認証関連
4. **ステップ3で必要**: 分散システム型定義

どのPhaseから詳しく学習したいですか？具体的なコード例やハンズオン形式で進めることも可能です。
