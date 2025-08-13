---
layout: page
title: "API リファレンス"
---

# API リファレンス

各種APIサービスの情報と使用例をまとめています。実際に利用可能なAPIサービスの概要と具体的な使用方法を提供します。

* 目次
{:toc}

## WeatherAPI.com

### 概要

**WeatherAPI.com** は、世界中の天気情報を提供するRESTful APIサービスです。現在の天気、予報、履歴データにアクセスできます。

**基本情報：**
- **ベースURL**: `http://api.weatherapi.com/v1/`
- **認証**: APIキー必須
- **フォーマット**: JSON
- **レート制限**: 無料プランは月100万リクエストまで

**主な機能：**
- 現在の天気情報
- 天気予報（最大10日間）
- 過去の天気データ
- アラートと警報
- 天文データ（日の出・日の入り）

### 使用例

```javascript
// WeatherAPI.com を使用した天気情報取得
async function getWeatherForecast(city, days = 3) {
    const apiKey = 'YOUR_API_KEY'; // 実際のAPIキーに置き換えてください
    const baseUrl = 'http://api.weatherapi.com/v1/forecast.json';
    
    try {
        const response = await fetch(
            `${baseUrl}?key=${apiKey}&q=${city}&days=${days}&aqi=no&alerts=no`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP エラー! ステータス: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('天気情報の取得に失敗しました:', error);
        return null;
    }
}

// 使用例
getWeatherForecast('東京', 3)
    .then(data => {
        if (data) {
            console.log('現在の天気:', data.current);
            console.log('予報:', data.forecast);
        }
    });
```

## Yahoo! 地図 天気API

### 概要

**Yahoo! 地図 天気API** は、Yahoo! JAPANが提供する日本国内の天気情報APIサービスです。日本の詳細な天気予報と観測データを提供します。

**基本情報：**
- **ベースURL**: `https://map.yahooapis.jp/weather/V1/place`
- **認証**: Client IDが必須
- **フォーマット**: JSON/XML
- **対象地域**: 日本国内

**主な機能：**
- 現在の天気観測データ
- 天気予報情報
- 降水量予測
- 日本全国の詳細データ

### 使用例

```javascript
// Yahoo! 地図 天気API を使用した天気情報取得
class YahooWeatherAPI {
    constructor(clientId) {
        this.clientId = clientId;
        this.baseUrl = 'https://map.yahooapis.jp/weather/V1/place';
    }
    
    /**
     * 座標を指定して天気情報を取得
     * @param {number} longitude - 経度
     * @param {number} latitude - 緯度
     * @returns {Promise<Object>} 天気データ
     */
    async getWeatherByCoordinates(longitude, latitude) {
        const coordinates = `${longitude},${latitude}`;
        
        try {
            const response = await fetch(
                `${this.baseUrl}?coordinates=${coordinates}&appid=${this.clientId}&output=json`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP エラー! ステータス: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Yahoo! 天気API エラー:', error);
            return null;
        }
    }
    
    /**
     * 天気データを読みやすい形式に整形
     * @param {Object} weatherData - APIレスポンス
     * @returns {Object} 整形された天気情報
     */
    formatWeatherData(weatherData) {
        if (!weatherData || !weatherData.Feature) {
            return null;
        }
        
        const feature = weatherData.Feature[0];
        const weather = feature.Property.WeatherList.Weather[0];
        
        return {
            地域: feature.Name,
            天気: weather.Type,
            降水量: weather.Rainfall,
            日時: weather.Date
        };
    }
}

// 使用例
const yahooWeather = new YahooWeatherAPI('YOUR_CLIENT_ID');

// 東京駅の座標で天気を取得
yahooWeather.getWeatherByCoordinates(139.7671, 35.6812)
    .then(data => {
        if (data) {
            const formatted = yahooWeather.formatWeatherData(data);
            console.log('Yahoo! 天気情報:', formatted);
        }
    });
```

## APIキーの取得方法

### WeatherAPI.com

1. [WeatherAPI.com](https://www.weatherapi.com/) にアクセス
2. 「Sign Up Free」をクリックしてアカウント作成
3. メール認証を完了
4. ダッシュボードでAPIキーを確認

### Yahoo! 地図 天気API

1. [Yahoo! デベロッパーネットワーク](https://developer.yahoo.co.jp/) にアクセス
2. Yahoo! JAPAN IDでログイン
3. 「アプリケーションの管理」から新規アプリケーションを作成
4. 「地図」カテゴリを選択してClient IDを取得

## エラーハンドリングとベストプラクティス

### 共通のエラーハンドリング

```javascript
// レート制限とタイムアウトを考慮したリクエスト関数
async function safeApiRequest(url, options = {}) {
    const defaultOptions = {
        timeout: 10000, // 10秒のタイムアウト
        retries: 3     // 3回までリトライ
    };
    
    const config = { ...defaultOptions, ...options };
    
    for (let attempt = 1; attempt <= config.retries; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), config.timeout);
            
            const response = await fetch(url, {
                signal: controller.signal,
                ...config.fetchOptions
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                if (response.status === 429) {
                    // レート制限の場合は待機してリトライ
                    const waitTime = Math.pow(2, attempt) * 1000; // 指数バックオフ
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                    continue;
                }
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
            
        } catch (error) {
            if (attempt === config.retries) {
                throw error; // 最後の試行で失敗した場合は例外を投げる
            }
            
            console.warn(`API リクエスト失敗 (試行 ${attempt}/${config.retries}):`, error.message);
            
            // エラーの種類に応じて待機時間を調整
            const waitTime = error.name === 'AbortError' ? 2000 : 1000;
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    }
}
```

### セキュリティのベストプラクティス

1. **APIキーの保護**
   - フロントエンドコードにAPIキーを直接埋め込まない
   - 環境変数や設定ファイルを使用
   - サーバーサイドでAPIキーを管理

2. **レート制限の遵守**
   - APIの利用制限を確認
   - 指数バックオフでリトライ
   - キャッシュの活用

3. **データの検証**
   - APIレスポンスの構造を検証
   - 不正なデータに対する適切な処理
   - ユーザー入力の検証

このAPIリファレンスを参考に、各種APIサービスを効果的に活用してください。実際の開発では、各APIサービスの最新のドキュメントも併せて確認することをお勧めします。