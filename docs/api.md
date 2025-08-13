---
layout: page
title: "API リファレンス"
---

# API リファレンス

各種APIサービスの情報と使用例をまとめています。実際に利用可能なAPIサービスの概要と具体的な使用方法を提供します。

* 目次
{:toc}

## Weather API サービス

### WeatherAPI.com

#### サービス概要

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

#### 使用例

##### 天気予報の取得

```bash
# 基本的な天気予報リクエスト
curl -X GET "http://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=Tokyo&days=3&aqi=no&alerts=no"
```

**パラメータ説明：**
- `key`: APIキー（必須）
- `q`: 場所（都市名、緯度経度、IPアドレス等）
- `days`: 予報日数（1-10日）
- `aqi`: 大気質データの有無（yes/no）
- `alerts`: 気象警報の有無（yes/no）

##### JavaScript での使用例

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

##### Python での使用例

```python
import requests
import json

def get_weather_forecast(city, days=3, api_key='YOUR_API_KEY'):
    """
    WeatherAPI.com から天気予報を取得する関数
    
    Args:
        city (str): 都市名
        days (int): 予報日数（1-10）
        api_key (str): APIキー
    
    Returns:
        dict: 天気データまたはNone
    """
    base_url = 'http://api.weatherapi.com/v1/forecast.json'
    
    params = {
        'key': api_key,
        'q': city,
        'days': days,
        'aqi': 'no',
        'alerts': 'no'
    }
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()  # HTTPエラーの場合は例外を発生
        
        data = response.json()
        return data
    
    except requests.exceptions.RequestException as e:
        print(f"リクエストエラー: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"JSONデコードエラー: {e}")
        return None

# 使用例
if __name__ == "__main__":
    weather_data = get_weather_forecast('Tokyo', 5)
    
    if weather_data:
        # 現在の天気
        current = weather_data['current']
        print(f"現在の天気: {current['condition']['text']}")
        print(f"気温: {current['temp_c']}°C")
        print(f"湿度: {current['humidity']}%")
        
        # 予報
        for day in weather_data['forecast']['forecastday']:
            date = day['date']
            max_temp = day['day']['maxtemp_c']
            min_temp = day['day']['mintemp_c']
            condition = day['day']['condition']['text']
            print(f"{date}: {condition}, 最高{max_temp}°C/最低{min_temp}°C")
```

### Yahoo! 地図 天気API

#### サービス概要

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

#### 使用例

##### 基本的な天気情報取得

```bash
# Yahoo! 地図 天気APIを使用した天気情報取得
curl -X GET "https://map.yahooapis.jp/weather/V1/place?coordinates=139.7671,35.6812&appid=YOUR_CLIENT_ID&output=json"
```

**パラメータ説明：**
- `coordinates`: 経度,緯度の座標
- `appid`: Client ID（必須）
- `output`: 出力形式（json/xml）

##### JavaScript での使用例

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

##### Python での使用例

```python
import requests
import json

class YahooWeatherAPI:
    """Yahoo! 地図 天気API クライアント"""
    
    def __init__(self, client_id):
        """
        初期化
        
        Args:
            client_id (str): Yahoo! API Client ID
        """
        self.client_id = client_id
        self.base_url = 'https://map.yahooapis.jp/weather/V1/place'
    
    def get_weather_by_coordinates(self, longitude, latitude):
        """
        座標を指定して天気情報を取得
        
        Args:
            longitude (float): 経度
            latitude (float): 緯度
        
        Returns:
            dict: 天気データまたはNone
        """
        coordinates = f"{longitude},{latitude}"
        
        params = {
            'coordinates': coordinates,
            'appid': self.client_id,
            'output': 'json'
        }
        
        try:
            response = requests.get(self.base_url, params=params)
            response.raise_for_status()
            
            data = response.json()
            return data
        
        except requests.exceptions.RequestException as e:
            print(f"Yahoo! 天気API リクエストエラー: {e}")
            return None
        except json.JSONDecodeError as e:
            print(f"JSONデコードエラー: {e}")
            return None
    
    def format_weather_data(self, weather_data):
        """
        天気データを読みやすい形式に整形
        
        Args:
            weather_data (dict): APIレスポンス
        
        Returns:
            dict: 整形された天気情報
        """
        if not weather_data or 'Feature' not in weather_data:
            return None
        
        try:
            feature = weather_data['Feature'][0]
            weather = feature['Property']['WeatherList']['Weather'][0]
            
            return {
                '地域': feature['Name'],
                '天気': weather['Type'],
                '降水量': weather['Rainfall'],
                '日時': weather['Date']
            }
        except (KeyError, IndexError) as e:
            print(f"データ構造エラー: {e}")
            return None

# 使用例
if __name__ == "__main__":
    # YOUR_CLIENT_IDを実際のClient IDに置き換えてください
    yahoo_api = YahooWeatherAPI('YOUR_CLIENT_ID')
    
    # 東京駅の座標で天気を取得
    tokyo_longitude = 139.7671
    tokyo_latitude = 35.6812
    
    weather_data = yahoo_api.get_weather_by_coordinates(tokyo_longitude, tokyo_latitude)
    
    if weather_data:
        formatted_data = yahoo_api.format_weather_data(weather_data)
        if formatted_data:
            print("Yahoo! 天気情報:")
            for key, value in formatted_data.items():
                print(f"  {key}: {value}")
        else:
            print("データの整形に失敗しました")
    else:
        print("天気データの取得に失敗しました")
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