---
layout: page
title: "C# リファレンス"
---

# C# リファレンス

C#の基本的な使い方から実用的な応用まで、フォームアプリケーション開発とExcel操作を中心に解説します。

* 目次
{:toc}

## 基本概念

### C# とは

**C#**（シーシャープ）は、Microsoftが開発したオブジェクト指向プログラミング言語です。.NET Frameworkまたは.NET Core/.NET上で動作し、型安全性と高いパフォーマンスを持つ言語として設計されています。

**特徴:**
- 型安全性が高い（コンパイル時エラー検出）
- 自動メモリ管理（ガベージコレクション）
- 豊富な標準ライブラリ
- クロスプラットフォーム対応（.NET Core以降）
- Visual Studioとの優れた統合

### 開発環境の準備

**Visual Studio のインストール:**
1. https://visualstudio.microsoft.com/ にアクセス
2. Visual Studio Community（無料版）をダウンロード
3. C#開発に必要なワークロードを選択してインストール

**最初のプログラム:**

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello, C#!");
        Console.ReadKey(); // キー入力を待つ
    }
}
```

## C# 基本文法

### 変数とデータ型

```csharp
// 基本的なデータ型
int age = 30;                    // 整数型
double price = 1500.50;          // 倍精度浮動小数点型
string name = "田中太郎";         // 文字列型
bool isActive = true;            // 真偽値型
char grade = 'A';                // 文字型

// var キーワード（型推論）
var count = 100;                 // int として推論
var message = "こんにちは";       // string として推論

// null許容型
int? nullableInt = null;         // nullを許可する整数型
string? nullableString = null;   // nullを許可する文字列型
```

### 制御文

```csharp
// if文
if (age >= 20)
{
    Console.WriteLine("成人です");
}
else if (age >= 13)
{
    Console.WriteLine("中高生です");
}
else
{
    Console.WriteLine("小学生以下です");
}

// switch文
switch (grade)
{
    case 'A':
        Console.WriteLine("優秀");
        break;
    case 'B':
        Console.WriteLine("良好");
        break;
    default:
        Console.WriteLine("要改善");
        break;
}

// for文
for (int i = 0; i < 10; i++)
{
    Console.WriteLine($"カウント: {i}");
}

// foreach文
string[] fruits = { "りんご", "みかん", "バナナ" };
foreach (string fruit in fruits)
{
    Console.WriteLine($"果物: {fruit}");
}
```

### クラスとオブジェクト

```csharp
// クラス定義
public class Person
{
    // プロパティ
    public string Name { get; set; }
    public int Age { get; set; }
    
    // コンストラクタ
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
    
    // メソッド
    public void SayHello()
    {
        Console.WriteLine($"こんにちは、{Name}です。{Age}歳です。");
    }
}

// クラスの使用
Person person = new Person("田中太郎", 30);
person.SayHello();
```

## Windows Forms アプリケーション

### プロジェクトの作成

```csharp
// Visual Studio で新規プロジェクト作成
// 1. ファイル > 新規 > プロジェクト
// 2. Windows Forms アプリケーション (.NET Framework) を選択
// 3. プロジェクト名と場所を指定して作成
```

### 基本的なフォーム構造

```csharp
using System;
using System.Windows.Forms;

public partial class MainForm : Form
{
    public MainForm()
    {
        InitializeComponent();
        SetupForm();
    }
    
    private void SetupForm()
    {
        // フォームの基本設定
        this.Text = "C# フォームアプリケーション";
        this.Size = new System.Drawing.Size(800, 600);
        this.StartPosition = FormStartPosition.CenterScreen;
        
        // コントロールの配置
        CreateControls();
    }
    
    private void CreateControls()
    {
        // ボタンの追加
        Button btnClick = new Button();
        btnClick.Text = "クリック";
        btnClick.Location = new System.Drawing.Point(100, 50);
        btnClick.Size = new System.Drawing.Size(100, 30);
        btnClick.Click += BtnClick_Click;
        this.Controls.Add(btnClick);
        
        // ラベルの追加
        Label lblMessage = new Label();
        lblMessage.Text = "メッセージが表示されます";
        lblMessage.Location = new System.Drawing.Point(100, 100);
        lblMessage.Size = new System.Drawing.Size(200, 30);
        lblMessage.Name = "lblMessage";
        this.Controls.Add(lblMessage);
    }
    
    private void BtnClick_Click(object sender, EventArgs e)
    {
        Label lbl = this.Controls["lblMessage"] as Label;
        lbl.Text = "ボタンがクリックされました！";
    }
}
```

### よく使用するコントロール

```csharp
// TextBox（テキストボックス）
TextBox txtName = new TextBox();
txtName.Location = new System.Drawing.Point(100, 150);
txtName.Size = new System.Drawing.Size(200, 25);
txtName.PlaceholderText = "名前を入力してください";

// ComboBox（ドロップダウンリスト）
ComboBox cmbOptions = new ComboBox();
cmbOptions.Items.AddRange(new string[] { "オプション1", "オプション2", "オプション3" });
cmbOptions.Location = new System.Drawing.Point(100, 200);
cmbOptions.SelectedIndex = 0; // 最初の項目を選択

// ListBox（リストボックス）
ListBox lstItems = new ListBox();
lstItems.Items.AddRange(new string[] { "項目1", "項目2", "項目3" });
lstItems.Location = new System.Drawing.Point(100, 250);
lstItems.Size = new System.Drawing.Size(200, 100);

// CheckBox（チェックボックス）
CheckBox chkAgree = new CheckBox();
chkAgree.Text = "利用規約に同意する";
chkAgree.Location = new System.Drawing.Point(100, 370);

// DataGridView（データグリッド）
DataGridView dgvData = new DataGridView();
dgvData.Location = new System.Drawing.Point(350, 50);
dgvData.Size = new System.Drawing.Size(400, 300);
dgvData.AutoGenerateColumns = true;
```

### メニューとツールバー

```csharp
private void CreateMenuBar()
{
    // メニューバーの作成
    MenuStrip menuStrip = new MenuStrip();
    
    // ファイルメニュー
    ToolStripMenuItem fileMenu = new ToolStripMenuItem("ファイル");
    fileMenu.DropDownItems.Add("新規作成", null, NewFile_Click);
    fileMenu.DropDownItems.Add("開く", null, OpenFile_Click);
    fileMenu.DropDownItems.Add(new ToolStripSeparator()); // 区切り線
    fileMenu.DropDownItems.Add("終了", null, Exit_Click);
    
    // 編集メニュー
    ToolStripMenuItem editMenu = new ToolStripMenuItem("編集");
    editMenu.DropDownItems.Add("コピー", null, Copy_Click);
    editMenu.DropDownItems.Add("貼り付け", null, Paste_Click);
    
    menuStrip.Items.Add(fileMenu);
    menuStrip.Items.Add(editMenu);
    this.MainMenuStrip = menuStrip;
    this.Controls.Add(menuStrip);
}

private void NewFile_Click(object sender, EventArgs e)
{
    MessageBox.Show("新規ファイルを作成します", "情報", MessageBoxButtons.OK, MessageBoxIcon.Information);
}
```

## Excel ファイルの操作

### EPPlus ライブラリのインストール

```xml
<!-- NuGet パッケージマネージャーコンソールで実行 -->
Install-Package EPPlus
```

### Excel ファイルの読み込み

```csharp
using OfficeOpenXml;
using System.IO;

public class ExcelReader
{
    public void ReadExcelFile(string filePath)
    {
        // EPPlusの商用利用設定（必要に応じて）
        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        
        FileInfo fileInfo = new FileInfo(filePath);
        
        using (ExcelPackage package = new ExcelPackage(fileInfo))
        {
            // 最初のワークシートを取得
            ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
            
            // セルの範囲を取得
            int rowCount = worksheet.Dimension.Rows;
            int colCount = worksheet.Dimension.Columns;
            
            // データの読み込み
            for (int row = 1; row <= rowCount; row++)
            {
                for (int col = 1; col <= colCount; col++)
                {
                    var cellValue = worksheet.Cells[row, col].Value;
                    if (cellValue != null)
                    {
                        Console.WriteLine($"行{row}, 列{col}: {cellValue}");
                    }
                }
            }
        }
    }
    
    // 特定セルのデータ取得
    public string GetCellValue(string filePath, string cellAddress)
    {
        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        
        using (ExcelPackage package = new ExcelPackage(new FileInfo(filePath)))
        {
            ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
            return worksheet.Cells[cellAddress].Value?.ToString() ?? "";
        }
    }
}
```

### Excel ファイルの作成と書き込み

```csharp
public class ExcelWriter
{
    public void CreateExcelFile(string filePath)
    {
        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        
        using (ExcelPackage package = new ExcelPackage())
        {
            // ワークシートの追加
            ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("データシート");
            
            // ヘッダーの作成
            worksheet.Cells[1, 1].Value = "ID";
            worksheet.Cells[1, 2].Value = "名前";
            worksheet.Cells[1, 3].Value = "年齢";
            worksheet.Cells[1, 4].Value = "部署";
            
            // サンプルデータの挿入
            var employees = new[]
            {
                new { Id = 1, Name = "田中太郎", Age = 30, Department = "営業部" },
                new { Id = 2, Name = "鈴木花子", Age = 28, Department = "開発部" },
                new { Id = 3, Name = "佐藤次郎", Age = 35, Department = "総務部" }
            };
            
            int row = 2;
            foreach (var emp in employees)
            {
                worksheet.Cells[row, 1].Value = emp.Id;
                worksheet.Cells[row, 2].Value = emp.Name;
                worksheet.Cells[row, 3].Value = emp.Age;
                worksheet.Cells[row, 4].Value = emp.Department;
                row++;
            }
            
            // 書式設定
            worksheet.Cells[1, 1, 1, 4].Style.Font.Bold = true; // ヘッダーを太字
            worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns(); // 列幅自動調整
            
            // ファイル保存
            FileInfo fileInfo = new FileInfo(filePath);
            package.SaveAs(fileInfo);
        }
    }
    
    // データの更新
    public void UpdateCellValue(string filePath, string cellAddress, object newValue)
    {
        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        
        using (ExcelPackage package = new ExcelPackage(new FileInfo(filePath)))
        {
            ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
            worksheet.Cells[cellAddress].Value = newValue;
            package.Save();
        }
    }
}
```

### フォームでExcel操作を統合

```csharp
public partial class ExcelForm : Form
{
    private DataGridView dgvData;
    private Button btnLoad;
    private Button btnSave;
    private OpenFileDialog openFileDialog;
    private SaveFileDialog saveFileDialog;
    
    public ExcelForm()
    {
        InitializeComponent();
        SetupControls();
    }
    
    private void SetupControls()
    {
        this.Text = "Excel ファイル操作";
        this.Size = new System.Drawing.Size(800, 600);
        
        // DataGridView
        dgvData = new DataGridView();
        dgvData.Location = new System.Drawing.Point(20, 60);
        dgvData.Size = new System.Drawing.Size(750, 400);
        dgvData.AutoGenerateColumns = true;
        this.Controls.Add(dgvData);
        
        // 読み込みボタン
        btnLoad = new Button();
        btnLoad.Text = "Excel 読み込み";
        btnLoad.Location = new System.Drawing.Point(20, 20);
        btnLoad.Click += BtnLoad_Click;
        this.Controls.Add(btnLoad);
        
        // 保存ボタン
        btnSave = new Button();
        btnSave.Text = "Excel 保存";
        btnSave.Location = new System.Drawing.Point(150, 20);
        btnSave.Click += BtnSave_Click;
        this.Controls.Add(btnSave);
        
        // ファイルダイアログ
        openFileDialog = new OpenFileDialog();
        openFileDialog.Filter = "Excel files (*.xlsx)|*.xlsx|All files (*.*)|*.*";
        
        saveFileDialog = new SaveFileDialog();
        saveFileDialog.Filter = "Excel files (*.xlsx)|*.xlsx|All files (*.*)|*.*";
    }
    
    private void BtnLoad_Click(object sender, EventArgs e)
    {
        if (openFileDialog.ShowDialog() == DialogResult.OK)
        {
            try
            {
                LoadExcelData(openFileDialog.FileName);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"ファイル読み込みエラー: {ex.Message}", "エラー", 
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
    
    private void LoadExcelData(string filePath)
    {
        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        
        using (ExcelPackage package = new ExcelPackage(new FileInfo(filePath)))
        {
            ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
            
            // DataTableに変換
            System.Data.DataTable dataTable = new System.Data.DataTable();
            
            // 列ヘッダーの追加
            for (int col = 1; col <= worksheet.Dimension.Columns; col++)
            {
                dataTable.Columns.Add(worksheet.Cells[1, col].Value?.ToString() ?? $"列{col}");
            }
            
            // データ行の追加
            for (int row = 2; row <= worksheet.Dimension.Rows; row++)
            {
                var dataRow = dataTable.NewRow();
                for (int col = 1; col <= worksheet.Dimension.Columns; col++)
                {
                    dataRow[col - 1] = worksheet.Cells[row, col].Value;
                }
                dataTable.Rows.Add(dataRow);
            }
            
            dgvData.DataSource = dataTable;
        }
    }
    
    private void BtnSave_Click(object sender, EventArgs e)
    {
        if (saveFileDialog.ShowDialog() == DialogResult.OK)
        {
            try
            {
                SaveExcelData(saveFileDialog.FileName);
                MessageBox.Show("保存が完了しました", "情報", 
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"ファイル保存エラー: {ex.Message}", "エラー", 
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
    
    private void SaveExcelData(string filePath)
    {
        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        
        using (ExcelPackage package = new ExcelPackage())
        {
            ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("データ");
            
            System.Data.DataTable dataTable = (System.Data.DataTable)dgvData.DataSource;
            
            // 列ヘッダーの書き込み
            for (int col = 0; col < dataTable.Columns.Count; col++)
            {
                worksheet.Cells[1, col + 1].Value = dataTable.Columns[col].ColumnName;
            }
            
            // データの書き込み
            for (int row = 0; row < dataTable.Rows.Count; row++)
            {
                for (int col = 0; col < dataTable.Columns.Count; col++)
                {
                    worksheet.Cells[row + 2, col + 1].Value = dataTable.Rows[row][col];
                }
            }
            
            // スタイリング
            worksheet.Cells[1, 1, 1, dataTable.Columns.Count].Style.Font.Bold = true;
            worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
            
            package.SaveAs(new FileInfo(filePath));
        }
    }
}
```

## 実践的なフォームアプリケーション開発

### アプリケーション設計のベストプラクティス

```csharp
// データアクセス層
public class DataService
{
    private readonly string connectionString;
    
    public DataService(string connectionString)
    {
        this.connectionString = connectionString;
    }
    
    public List<Employee> GetEmployees()
    {
        // データベースまたはExcelファイルから従業員データを取得
        return new List<Employee>();
    }
    
    public void SaveEmployee(Employee employee)
    {
        // 従業員データの保存処理
    }
}

// モデル
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Department { get; set; }
    public DateTime HireDate { get; set; }
    public decimal Salary { get; set; }
}
```

### エラーハンドリングとデバッグ

```csharp
// try-catch文でエラー処理
private void ProcessData()
{
    try
    {
        // 処理コード
        string filePath = GetFilePath();
        var data = LoadExcelData(filePath);
        ProcessExcelData(data);
    }
    catch (FileNotFoundException ex)
    {
        MessageBox.Show($"ファイルが見つかりません: {ex.FileName}", "エラー");
        // ログ出力
        LogError(ex);
    }
    catch (UnauthorizedAccessException ex)
    {
        MessageBox.Show("ファイルへのアクセス権限がありません", "エラー");
        LogError(ex);
    }
    catch (Exception ex)
    {
        MessageBox.Show($"予期しないエラーが発生しました: {ex.Message}", "エラー");
        LogError(ex);
    }
}

private void LogError(Exception ex)
{
    // ログファイルやイベントログにエラー情報を記録
    string logMessage = $"[{DateTime.Now}] {ex.GetType().Name}: {ex.Message}\n{ex.StackTrace}";
    File.AppendAllText("error.log", logMessage + Environment.NewLine);
}
```

### アプリケーションの配布

```csharp
// app.config ファイルの設定例
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <appSettings>
    <add key="ExcelTemplatePath" value="templates/" />
    <add key="OutputPath" value="output/" />
    <add key="LogLevel" value="Info" />
  </appSettings>
  
  <connectionStrings>
    <add name="DefaultConnection" 
         connectionString="Data Source=database.db" 
         providerName="System.Data.SQLite" />
  </connectionStrings>
</configuration>
```

## まとめ

C#を使ったフォームアプリケーション開発とExcel操作について基本から実践まで説明しました。これらの知識を組み合わせることで、業務で役立つ実用的なアプリケーションを開発できるようになります。

**学習のポイント:**
1. 基本文法をしっかり理解する
2. Windows Formsの基本操作を習得する
3. EPPlusライブラリでExcel操作をマスターする
4. エラーハンドリングを適切に実装する
5. 実際のアプリケーション開発で経験を積む

継続的な学習と実践により、より高度なC#アプリケーションを開発できるようになります。