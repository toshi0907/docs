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