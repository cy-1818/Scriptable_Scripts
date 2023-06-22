[こちら](https://github.com/a-ori-a/Widgets)にあるtsfmの改良版として開発を開始した物です。しかしながらほとんど…いや、全く原型を留めてはいません。

tsfm-exはterminal systemed file manager - extra edition の略です。なお、このextraは「余分な」の意味が強いです。

# インストール方法
## 方法1
tsfm-ex.jsをダウンロードし、Scriptableフォルダに移動、実行。

## 方法2
本家tsfmをダウンロードし、tsfmにて「script tsfm-ex」と打ち込んで実行。

# 使い方
気が向いたら書きます。

とりあえず「script help」と打ち込んで実行しておけば大体どうにかなると思います。

# 開発者向け
## commandの作り方

中でawaitを使わない場合は最初の1行と最後の1行は不要です。
```javascript
return (async function(){
　　... // コード
　 return [...]; // 出力
})()
```
このような内容でjsファイルを作ってください。
### commandから使える関数・変数
| 種類 | 名前 | 説明 |
| ---- | ---- | ---- |
| 変数 | parameter | コマンドが実行された時に渡された引数です。 |
| 変数 | fmi | ScriptableのFileManager.iCloud()です。 |
| 変数 | doci | icloudのdocumentディレクトリのパスです。 |
| 変数　| f | 現在いる場所のFileManagerです。つまりFileManager.iCloud()またはFileManager.local()になります。 |
| 変数　| doc | 現在いる場所のドキュメントディレクトリです。 |
| 変数 | pass | 現在いる場所の絶対passです。スペルミスはご愛嬌。 |
| 変数　| space | 現在いる場所がiCloudかlocalか、です。 |
| 変数 | commands | コマンドのjsファイルのiCloudのdocumentディレクトリに対する相対パスです。command[コマンド名]というように使用してください。 |
| 関数 | formatPath | あらゆるパスを絶対パスに変換します。場合によってはf, spaceが書き換えられます。 |
| 関数 | Print | **awaitが必要です。** 後述します。 |
| 関数 | Edit | **awaitが必要です。** 後述します。 |
| 関数 | DelNode | **awaitが必要です。** 後述します。 |
| 関数 | Run | **awaitが必要です。** 表示しているhtmlに対してevaluateJavascriptを実行します。基本使わないでしょう。 |
| 関数 | Check | **awaitが必要です。** 使う理由がないと思うので詳しく書きません。 |
| 関数 | Give | **awaitが必要です。原則使わないでください。** |
| 関数 | Get | **awaitが必要です。原則使わないでください。** |
| 関数 | Load | **awaitが必要です。原則使わないでください。** |

### Printの引数、及びreturnで返す返り値について
```javascript
[{
  "style":"", // 表示する際のスタイルです。色付けなどに使います。CLI感がなくなるような設定はタブー。
  "str":"", // 表示する文字列です。
  "tag":"", // 表示するのに使うタグです。省略するとspanになります。
  "notPara":false, // パイプを使ってコマンドを繋げる際に出力を渡すか否かを決めます。省略するとfalseになります。
  "edit":true // 表示した後に要素内を編集したい場合にtrueにしてください。省略するとfalseになります。
}]
```
