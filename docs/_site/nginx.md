# Nginx リファレンス

Nginxの基本的な使い方と設定のリファレンスです。ウェブサーバーとリバースプロキシとしての利用方法を段階的に説明します。

## 目次
1. [基本概念](#基本概念)
2. [インストール](#インストール)
3. [基本設定](#基本設定)
4. [ウェブサーバー設定](#ウェブサーバー設定)
5. [リバースプロキシ設定](#リバースプロキシ設定)
6. [SSL/TLS設定](#ssltls設定)
7. [ロードバランシング](#ロードバランシング)
8. [ログ設定](#ログ設定)
9. [セキュリティ設定](#セキュリティ設定)
10. [パフォーマンス最適化](#パフォーマンス最適化)
11. [便利なコマンド](#便利なコマンド)
12. [実用的な例](#実用的な例)

## 基本概念

### Nginxとは

Nginxは高性能なウェブサーバー、リバースプロキシ、ロードバランサーです。軽量で高速な処理が特徴で、多くのウェブサイトで利用されています。

**主な特徴:**
- 高いパフォーマンスと低メモリ使用量
- 非同期イベント駆動アーキテクチャ
- リバースプロキシとロードバランサー機能
- モジュラー設計
- 豊富な設定オプション

### 重要な概念
- **サーバーブロック**: バーチャルホストの設定単位
- **ディレクティブ**: 設定項目の指定
- **コンテキスト**: 設定の適用範囲（http、server、location等）
- **アップストリーム**: バックエンドサーバーの定義

## インストール

### Ubuntu/Debianでのインストール

```bash
# パッケージリストの更新
sudo apt update

# Nginxのインストール
sudo apt install nginx

# サービスの開始と自動起動設定
sudo systemctl start nginx
sudo systemctl enable nginx

# ステータス確認
sudo systemctl status nginx
```

### CentOS/RHELでのインストール

```bash
# EPELリポジトリの有効化
sudo yum install epel-release

# Nginxのインストール
sudo yum install nginx

# サービスの開始と自動起動設定
sudo systemctl start nginx
sudo systemctl enable nginx

# ファイアウォール設定
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### ソースからのインストール

```bash
# 依存関係のインストール
sudo apt install build-essential libpcre3-dev libssl-dev zlib1g-dev

# Nginxソースのダウンロード
wget http://nginx.org/download/nginx-1.24.0.tar.gz
tar -xzf nginx-1.24.0.tar.gz
cd nginx-1.24.0

# コンパイルとインストール
./configure --with-http_ssl_module --with-http_v2_module
make
sudo make install
```

## 基本設定

### 主要な設定ファイル

```bash
# メイン設定ファイル
/etc/nginx/nginx.conf

# サイト別設定ディレクトリ
/etc/nginx/sites-available/  # 利用可能なサイト設定
/etc/nginx/sites-enabled/    # 有効なサイト設定

# ログファイル
/var/log/nginx/access.log     # アクセスログ
/var/log/nginx/error.log      # エラーログ
```

### 基本的なnginx.conf

```nginx
# /etc/nginx/nginx.conf
user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
}

http {
    # 基本設定
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    # MIMEタイプ設定
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # ログ設定
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
    
    # Gzip圧縮
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # サイト設定の読み込み
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

#### 各ディレクティブの詳細説明

**メインコンテキスト設定:**
- `user www-data;` - Nginxワーカープロセスの実行ユーザーを指定。セキュリティ上、root以外のユーザーで実行
- `worker_processes auto;` - ワーカープロセス数を設定。`auto`でCPUコア数に自動調整
- `pid /run/nginx.pid;` - マスタープロセスのPIDファイルの保存場所を指定

**eventsコンテキスト:**
- `worker_connections 1024;` - 各ワーカープロセスが同時に処理できる接続数の上限
- `use epoll;` - Linux環境での効率的なイベント処理方式を指定（LinuxではepollがGT推奨）

**httpコンテキスト - 基本設定:**
- `sendfile on;` - カーネル空間でのファイル転送を有効化。静的ファイル配信の高速化に効果的
- `tcp_nopush on;` - sendfileと併用してネットワーク効率を向上（LinuxではTCP_CORK相当）
- `tcp_nodelay on;` - 小さなパケットの即座送信を有効化。応答性向上に寄与
- `keepalive_timeout 65;` - Keep-Alive接続のタイムアウト時間（秒）
- `types_hash_max_size 2048;` - MIMEタイプハッシュテーブルの最大サイズ

**MIMEタイプ設定:**
- `include /etc/nginx/mime.types;` - ファイル拡張子とMIMEタイプの対応表を読み込み
- `default_type application/octet-stream;` - 不明なファイルタイプのデフォルトMIMEタイプ

**ログ設定:**
- `access_log /var/log/nginx/access.log;` - アクセスログの出力先とフォーマット
- `error_log /var/log/nginx/error.log;` - エラーログの出力先とレベル

**Gzip圧縮設定:**
- `gzip on;` - gzip圧縮機能を有効化
- `gzip_vary on;` - Varyヘッダーを追加。プロキシキャッシュとの互換性向上
- `gzip_proxied any;` - プロキシ経由のレスポンスも圧縮対象にする
- `gzip_comp_level 6;` - 圧縮レベル（1-9）。6は速度と圧縮率のバランスが良い
- `gzip_types ...;` - 圧縮対象のMIMEタイプを指定

**設定ファイル読み込み:**
- `include /etc/nginx/conf.d/*.conf;` - 追加設定ファイルの読み込み
- `include /etc/nginx/sites-enabled/*;` - 有効なサイト設定の読み込み

## ウェブサーバー設定

### 基本的な静的サイト設定

```nginx
# /etc/nginx/sites-available/example.com
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/example.com;
    index index.html index.htm;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # 静的ファイルのキャッシュ設定
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # ログ設定
    access_log /var/log/nginx/example.com.access.log;
    error_log /var/log/nginx/example.com.error.log;
}
```

#### サイト設定の各ディレクティブ説明

**serverブロック:**
- `server { ... }` - バーチャルホスト（サイト）の設定を定義するブロック

**基本設定:**
- `listen 80;` - リッスンするポート番号。80はHTTP、443はHTTPSの標準ポート
- `server_name example.com www.example.com;` - このサーバーブロックが応答するドメイン名を指定
- `root /var/www/example.com;` - ドキュメントルート（ウェブファイルが格納されているディレクトリ）
- `index index.html index.htm;` - ディレクトリアクセス時のデフォルトファイル（優先順位順）

**locationブロック:**
- `location / { ... }` - URLパスのマッチング条件と処理を定義
- `try_files $uri $uri/ =404;` - ファイル検索順序を指定。存在しない場合は404エラー
  - `$uri` - リクエストされたURIに対応するファイル
  - `$uri/` - ディレクトリとして扱い、indexファイルを検索
  - `=404` - 見つからない場合は404エラーを返す

**正規表現によるlocation:**
- `location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ { ... }` - 大文字小文字を区別しない正規表現マッチ
- `~*` - 大文字小文字を区別しない正規表現
- `~` - 大文字小文字を区別する正規表現
- `^~` - 前方一致（正規表現より優先）

**キャッシュ設定:**
- `expires 1y;` - ブラウザキャッシュの有効期限を1年に設定
- `add_header Cache-Control "public, immutable";` - キャッシュ制御ヘッダーを追加
  - `public` - プロキシサーバーでもキャッシュ可能
  - `immutable` - ファイルが変更されないことをブラウザに通知

**個別ログ設定:**
- `access_log /var/log/nginx/example.com.access.log;` - サイト固有のアクセスログ
- `error_log /var/log/nginx/example.com.error.log;` - サイト固有のエラーログ

### PHP-FPMとの連携

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/example.com;
    index index.php index.html;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
    
    # .phpファイルの直接アクセスを防ぐ
    location ~ /\.ht {
        deny all;
    }
}
```

#### PHP-FPM設定の詳細説明

**PHP処理設定:**
- `index index.php index.html;` - PHPファイルを最優先のインデックスファイルに設定
- `try_files $uri $uri/ /index.php?$query_string;` - 
  - ファイルが存在しない場合、index.phpにクエリパラメータ付きでリダイレクト
  - フレームワーク（Laravel、WordPressなど）のURL書き換えに対応

**PHPファイル処理location:**
- `location ~ \.php$ { ... }` - .phpで終わるファイルへのリクエストを処理
- `include snippets/fastcgi-php.conf;` - PHP-FPM用の標準設定を読み込み
- `fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;` - PHP-FPMプロセスとの通信方法を指定
  - `unix:` - UNIXソケット通信（TCP通信より高速）
  - `php8.1-fpm.sock` - PHP 8.1のFPMソケットファイル

**FastCGIパラメータ:**
- `fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;` - 
  - 実行するPHPファイルの絶対パスを設定
  - `$realpath_root` - シンボリックリンクを解決した実際のパス
  - `$fastcgi_script_name` - 実行するスクリプト名
- `include fastcgi_params;` - その他のFastCGIパラメータを読み込み

**セキュリティ設定:**
- `location ~ /\.ht { deny all; }` - .htaccessファイルなど隠しファイルへのアクセスを拒否

## リバースプロキシ設定

### 基本的なリバースプロキシ

```nginx
server {
    listen 80;
    server_name app.example.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### リバースプロキシ設定の詳細説明

**プロキシ基本設定:**
- `proxy_pass http://localhost:3000;` - バックエンドサーバーのURLを指定
  - リクエストを指定されたサーバーに転送
  - `http://`、`https://`、`unix:`ソケットが使用可能

**プロキシヘッダー設定:**
- `proxy_set_header Host $host;` - オリジナルのHostヘッダーをバックエンドに転送
- `proxy_set_header X-Real-IP $remote_addr;` - クライアントの実IPアドレスを設定
- `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` - 
  - プロキシチェーンを通過したIPアドレスのリストを設定
  - 既存のX-Forwarded-Forに新しいIPを追加
- `proxy_set_header X-Forwarded-Proto $scheme;` - オリジナルのプロトコル（http/https）を転送

### WebSocketプロキシ

```nginx
server {
    listen 80;
    server_name websocket.example.com;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### WebSocket固有設定の説明

**WebSocket対応設定:**
- `proxy_http_version 1.1;` - HTTP/1.1プロトコルを使用（WebSocketに必要）
- `proxy_set_header Upgrade $http_upgrade;` - WebSocketアップグレードヘッダーを転送
- `proxy_set_header Connection "upgrade";` - 接続のアップグレードを指示
  - この設定により、HTTPからWebSocketプロトコルへの切り替えが可能

**WebSocket接続の仕組み:**
1. クライアントからHTTPリクエストでWebSocket接続要求
2. サーバーがHTTP 101 Switching Protocolsで応答
3. プロトコルがWebSocketに切り替わり、双方向通信開始

## SSL/TLS設定

### Let's Encryptを使用したSSL設定

```bash
# Certbotのインストール
sudo apt install certbot python3-certbot-nginx

# SSL証明書の取得
sudo certbot --nginx -d example.com -d www.example.com

# 自動更新の設定
sudo crontab -e
# 以下の行を追加
0 12 * * * /usr/bin/certbot renew --quiet
```

### 手動SSL設定

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;
    
    # SSL証明書の設定
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # SSL設定
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # HSTS設定
    add_header Strict-Transport-Security "max-age=63072000" always;
    
    location / {
        root /var/www/example.com;
        index index.html;
    }
}

# HTTPからHTTPSへのリダイレクト
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
```

#### SSL/TLS設定の詳細説明

**SSL基本設定:**
- `listen 443 ssl http2;` - HTTPS（443ポート）でSSL/TLSとHTTP/2を有効化
- `ssl_certificate /path/to/certificate.crt;` - SSL証明書ファイルのパスを指定
- `ssl_certificate_key /path/to/private.key;` - 秘密鍵ファイルのパスを指定

**SSL/TLSプロトコル設定:**
- `ssl_protocols TLSv1.2 TLSv1.3;` - 使用するTLSプロトコルバージョンを指定
  - TLSv1.0, TLSv1.1は脆弱性のため非推奨
- `ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;` - 
  - 使用する暗号スイートを指定
  - 強力な暗号化方式のみを許可
- `ssl_prefer_server_ciphers off;` - クライアントの暗号スイート優先順位を尊重

**SSL/TLSセッション設定:**
- `ssl_session_cache shared:SSL:10m;` - SSLセッションキャッシュを10MB確保
  - セッション再利用により、SSL/TLSハンドシェイクの負荷を軽減
- `ssl_session_timeout 10m;` - セッションキャッシュの有効期限（10分）

**セキュリティヘッダー:**
- `add_header Strict-Transport-Security "max-age=63072000" always;` - HSTS設定
  - ブラウザに2年間HTTPSのみでのアクセスを強制
  - `always` - エラーレスポンスにもヘッダーを追加

**HTTPからHTTPSリダイレクト:**
- `return 301 https://$server_name$request_uri;` - 
  - HTTPアクセスを恒久的にHTTPSにリダイレクト
  - 301ステータスコードで検索エンジンにも適切に伝達

## ロードバランシング

### アップストリーム設定

```nginx
# アップストリームの定義
upstream backend {
    least_conn;  # 接続数による負荷分散
    server 192.168.1.10:8080 weight=3;
    server 192.168.1.11:8080 weight=2;
    server 192.168.1.12:8080 weight=1 backup;  # バックアップサーバー
}

server {
    listen 80;
    server_name lb.example.com;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # ヘルスチェック設定
        proxy_connect_timeout 5s;
        proxy_send_timeout 5s;
        proxy_read_timeout 5s;
    }
}
```

#### ロードバランシング設定の詳細説明

**upstreamブロック:**
- `upstream backend { ... }` - バックエンドサーバーグループを定義
- `least_conn;` - 負荷分散アルゴリズムを指定
  - `round_robin` - ラウンドロビン（デフォルト）
  - `least_conn` - 最小接続数優先
  - `ip_hash` - クライアントIPによるセッション維持

**サーバー設定:**
- `server 192.168.1.10:8080 weight=3;` - バックエンドサーバーの指定
  - `weight=3` - 負荷分散の重み（数字が大きいほど多くリクエストを処理）
  - `backup` - バックアップサーバー（他のサーバーが全て停止時のみ使用）
  - `down` - サーバーを無効化
  - `max_fails=3` - 失敗回数の上限
  - `fail_timeout=30s` - 失敗後の待機時間

**プロキシタイムアウト設定:**
- `proxy_connect_timeout 5s;` - バックエンドサーバーとの接続タイムアウト
- `proxy_send_timeout 5s;` - バックエンドへのデータ送信タイムアウト
- `proxy_read_timeout 5s;` - バックエンドからのレスポンス読み込みタイムアウト

### 負荷分散方式

```nginx
# ラウンドロビン（デフォルト）
upstream backend_rr {
    server server1.example.com;
    server server2.example.com;
}

# 最少接続数
upstream backend_lc {
    least_conn;
    server server1.example.com;
    server server2.example.com;
}

# IPハッシュ
upstream backend_ip {
    ip_hash;
    server server1.example.com;
    server server2.example.com;
}

# 重み付け
upstream backend_weighted {
    server server1.example.com weight=3;
    server server2.example.com weight=1;
}
```

## ログ設定

### カスタムログフォーマット

```nginx
http {
    # カスタムログフォーマットの定義
    log_format custom '$remote_addr - $remote_user [$time_local] '
                     '"$request" $status $body_bytes_sent '
                     '"$http_referer" "$http_user_agent" '
                     '$request_time $upstream_response_time';
    
    # アクセスログの設定
    access_log /var/log/nginx/access.log custom;
    
    server {
        listen 80;
        server_name example.com;
        
        # サーバー別ログ
        access_log /var/log/nginx/example.com.access.log custom;
        error_log /var/log/nginx/example.com.error.log warn;
        
        location / {
            root /var/www/example.com;
        }
        
        # 特定のlocationでログを無効化
        location /health {
            access_log off;
            return 200 "OK";
        }
    }
}
```

### ログローテーション

```bash
# /etc/logrotate.d/nginx
/var/log/nginx/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    sharedscripts
    postrotate
        /bin/kill -USR1 `cat /run/nginx.pid 2>/dev/null` 2>/dev/null || true
    endscript
}
```

## セキュリティ設定

### 基本的なセキュリティ設定

```nginx
server {
    listen 80;
    server_name example.com;
    
    # サーバー情報の隠蔽
    server_tokens off;
    
    # セキュリティヘッダー
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # 不要なHTTPメソッドの無効化
    if ($request_method !~ ^(GET|HEAD|POST)$ ) {
        return 405;
    }
    
    # 隠しファイルへのアクセス拒否
    location ~ /\. {
        deny all;
    }
    
    # 特定のファイルタイプへのアクセス拒否
    location ~* \.(log|sql|txt|conf)$ {
        deny all;
    }
    
    location / {
        root /var/www/example.com;
        index index.html;
    }
}
```

#### セキュリティ設定の詳細説明

**サーバー情報の隠蔽:**
- `server_tokens off;` - レスポンスヘッダーからNginxのバージョン情報を隠蔽

**セキュリティヘッダー:**
- `X-Frame-Options "SAMEORIGIN"` - 同一オリジンからのフレーム表示のみ許可（クリックジャッキング対策）
- `X-Content-Type-Options "nosniff"` - ブラウザのMIMEタイプ推測を無効化
- `X-XSS-Protection "1; mode=block"` - ブラウザのXSS保護機能を有効化
- `Referrer-Policy "no-referrer-when-downgrade"` - HTTPS→HTTPではリファラーを送信しない
- `Content-Security-Policy` - コンテンツセキュリティポリシーの設定

**HTTPメソッド制限:**
- `if ($request_method !~ ^(GET|HEAD|POST)$ )` - 指定されたHTTPメソッド以外を拒否
- 不正なHTTPメソッドによる攻撃を防止

**ファイルアクセス制限:**
- `location ~ /\. { deny all; }` - 隠しファイル（.から始まるファイル）へのアクセスを拒否
- `location ~* \.(log|sql|txt|conf)$ { deny all; }` - 機密ファイルへのアクセスを拒否

### Rate Limiting

```nginx
http {
    # Rate limitingの設定
    limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    
    server {
        listen 80;
        server_name example.com;
        
        # ログインページのrate limiting
        location /login {
            limit_req zone=login burst=5 nodelay;
            proxy_pass http://backend;
        }
        
        # API エンドポイントのrate limiting
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://backend;
        }
    }
}
```

#### Rate Limiting設定の詳細説明

**レート制限ゾーンの定義:**
- `limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;` - 
  - `$binary_remote_addr` - クライアントIPアドレスをキーとして使用
  - `zone=login:10m` - "login"ゾーンに10MBのメモリ領域を確保
  - `rate=5r/m` - 1分間に5リクエストまでの制限

**レート制限の適用:**
- `limit_req zone=login burst=5 nodelay;` - 
  - `zone=login` - 上で定義したloginゾーンを使用
  - `burst=5` - 一時的に5リクエストまでバーストを許可
  - `nodelay` - バーストリクエストを遅延なく処理

**レート制限の仕組み:**
1. 通常時：設定されたレート（5r/m）で処理
2. バースト時：burst値（5）まで即座に処理
3. 制限超過時：503エラーまたは遅延処理

## パフォーマンス最適化

### キャッシュ設定

```nginx
http {
    # プロキシキャッシュの設定
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=10g 
                     inactive=60m use_temp_path=off;
    
    server {
        listen 80;
        server_name example.com;
        
        location / {
            proxy_pass http://backend;
            proxy_cache my_cache;
            proxy_cache_revalidate on;
            proxy_cache_min_uses 3;
            proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
            proxy_cache_lock on;
            
            # キャッシュヘッダーの追加
            add_header X-Cache-Status $upstream_cache_status;
        }
        
        # 静的ファイルのキャッシュ
        location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

#### キャッシュ設定の詳細説明

**プロキシキャッシュパス設定:**
- `proxy_cache_path /var/cache/nginx` - キャッシュファイルの保存ディレクトリ
- `levels=1:2` - キャッシュディレクトリの階層構造（1文字/2文字のサブディレクトリ）
- `keys_zone=my_cache:10m` - キャッシュキー用のメモリ領域（10MB）
- `max_size=10g` - キャッシュの最大サイズ（10GB）
- `inactive=60m` - 60分アクセスがないキャッシュを削除
- `use_temp_path=off` - 一時ファイルをキャッシュディレクトリに直接作成

**プロキシキャッシュ制御:**
- `proxy_cache my_cache;` - 指定されたキャッシュゾーンを使用
- `proxy_cache_revalidate on;` - 期限切れキャッシュの再検証を有効化
- `proxy_cache_min_uses 3;` - 3回アクセスされたレスポンスのみキャッシュ
- `proxy_cache_use_stale` - バックエンドエラー時に古いキャッシュを使用
- `proxy_cache_lock on;` - 同一リクエストのキャッシュ更新を1つに制限

**キャッシュステータス表示:**
- `add_header X-Cache-Status $upstream_cache_status;` - キャッシュヒット状態を表示
  - HIT：キャッシュヒット
  - MISS：キャッシュミス
  - BYPASS：キャッシュバイパス

### 圧縮設定

```nginx
http {
    # Gzip圧縮の詳細設定
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        application/atom+xml
        application/javascript
        application/json
        application/rss+xml
        application/vnd.ms-fontobject
        application/x-font-ttf
        application/x-web-app-manifest+json
        application/xhtml+xml
        application/xml
        font/opentype
        image/svg+xml
        image/x-icon
        text/css
        text/plain
        text/x-component;
    
    # Brotli圧縮（モジュールが必要）
    # brotli on;
    # brotli_comp_level 6;
    # brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

#### 圧縮設定の詳細説明

**Gzip圧縮設定:**
- `gzip on;` - Gzip圧縮を有効化
- `gzip_vary on;` - Varyヘッダーを追加（プロキシキャッシュとの互換性向上）
- `gzip_min_length 1024;` - 1024バイト以上のファイルのみ圧縮（小さなファイルは圧縮効率が悪い）
- `gzip_proxied any;` - プロキシ経由のレスポンスも圧縮対象にする
- `gzip_comp_level 6;` - 圧縮レベル（1-9）。6は速度と圧縮率のバランスが良い

**圧縮対象MIMEタイプ:**
- `gzip_types` - 圧縮対象のMIMEタイプを明示的に指定
- テキストベースのファイル（CSS、JS、JSON、XML等）を圧縮
- 画像ファイル（JPEG、PNG等）は既に圧縮済みのため対象外

**Brotli圧縮:**
- より高い圧縮率を実現する新しい圧縮アルゴリズム
- モジュールの追加インストールが必要
- 対応ブラウザでのみ使用可能

## 便利なコマンド

### 基本操作

```bash
# 設定ファイルのテスト
sudo nginx -t

# 設定ファイルのテスト（詳細表示）
sudo nginx -T

# 設定の再読み込み
sudo nginx -s reload

# Nginxの停止
sudo nginx -s stop

# Nginxの安全な停止
sudo nginx -s quit

# プロセスの確認
ps aux | grep nginx

# ポートの確認
sudo netstat -tlnp | grep nginx
```

### systemctlコマンド

```bash
# サービスの開始
sudo systemctl start nginx

# サービスの停止
sudo systemctl stop nginx

# サービスの再起動
sudo systemctl restart nginx

# 設定の再読み込み
sudo systemctl reload nginx

# ステータス確認
sudo systemctl status nginx

# 自動起動の有効化
sudo systemctl enable nginx

# 自動起動の無効化
sudo systemctl disable nginx
```

### ログの確認

```bash
# アクセスログの確認
sudo tail -f /var/log/nginx/access.log

# エラーログの確認
sudo tail -f /var/log/nginx/error.log

# 特定のサイトのログ確認
sudo tail -f /var/log/nginx/example.com.access.log

# ログの検索
sudo grep "404" /var/log/nginx/access.log
sudo grep "error" /var/log/nginx/error.log
```

## 実用的な例

### WordPressサイトの設定

```nginx
server {
    listen 80;
    server_name wordpress.example.com;
    root /var/www/wordpress;
    index index.php;
    
    # セキュリティ設定
    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }
    
    location = /robots.txt {
        log_not_found off;
        access_log off;
        allow all;
    }
    
    location ~* \.(css|gif|ico|jpeg|jpg|js|png)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location / {
        try_files $uri $uri/ /index.php?$args;
    }
    
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
    }
    
    location ~ /\.ht {
        deny all;
    }
    
    # WordPress管理画面の保護
    location /wp-admin/ {
        allow 192.168.1.0/24;
        deny all;
        try_files $uri $uri/ /index.php?$args;
    }
}
```

### Node.jsアプリケーションの設定

```nginx
upstream nodejs_backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}

server {
    listen 80;
    server_name app.example.com;
    
    # 静的ファイルの配信
    location /static/ {
        alias /var/www/app/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # APIエンドポイント
    location /api/ {
        proxy_pass http://nodejs_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocketサポート
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
    
    # メインアプリケーション
    location / {
        proxy_pass http://nodejs_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### ステージング環境の設定

```nginx
# 本番環境
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com www.example.com;
    
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    
    location / {
        proxy_pass http://production_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# ステージング環境（Basic認証付き）
server {
    listen 80;
    server_name staging.example.com;
    
    # Basic認証
    auth_basic "Staging Environment";
    auth_basic_user_file /etc/nginx/.htpasswd;
    
    location / {
        proxy_pass http://staging_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### マイクロサービス環境の設定

```nginx
# API Gateway的な設定
server {
    listen 80;
    server_name api.example.com;
    
    # CORS設定
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
    add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization";
    
    # ユーザーサービス
    location /users/ {
        proxy_pass http://user-service:8001/;
        include proxy_params;
    }
    
    # 注文サービス
    location /orders/ {
        proxy_pass http://order-service:8002/;
        include proxy_params;
    }
    
    # 在庫サービス
    location /inventory/ {
        proxy_pass http://inventory-service:8003/;
        include proxy_params;
    }
    
    # 認証サービス
    location /auth/ {
        proxy_pass http://auth-service:8004/;
        include proxy_params;
    }
    
    # ヘルスチェック
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

このリファレンスは、Nginxの基本的な使い方から高度な設定まで幅広くカバーしています。実際の運用では、セキュリティ、パフォーマンス、監視の観点から継続的に設定を見直すことが重要です。