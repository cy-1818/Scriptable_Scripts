これは、[ウィキペディア](https://ja.wikipedia.org)等の[MediaWiki](https://mediawiki.org)を使用したwikiサイトの最近の更新(Special:RecentChanges)を監視できるウィジェットです。

# インストール方法
1. [tsfm-ex](https://github.com/cy-1818/Scriptable_Scripts/tree/main/tsfm-ex)をインストールします。
2. tsfm-exを実行し、`script -i WikiRC`というコマンドを実行してください。

※手動でのインストールも可能ですが、依存関係の解決などができません。tsfm-ex経由でのインストールを推奨します。

# パラメータ
JSON形式での記述が可能です。
| 値名(key) | 値 | 規定値 |
|----|----|----|
| site | wikiサイトのurlです。api.php?で終わる、開くとapi helpのページが開くurlにしてください。 | "https://en.wikipedia.org/w/api.php?" |
| link | 同じくwikiサイトのurlですが、/で終わる記事名を加えると記事のページに飛べるurlにしてください。 | "https://en.wikipedia.org/wiki/" |
| scheme | URLSchemeです。Chromeで開きたい時等に使用してください。なお、上記二つのurlをhttp://で始めると動作しません。httpsと記述してください。 | "https" |
| color | ウィジェットのボーダーの色です。 | "#000" |
| line | 表示する行数です。 | 10 |
| font | ウィジェット内の文字のフォントです。 | "Arial" |
| fontSize | 文字の大きさです。 | ウィジェットの縦の幅/行数+1です。 |

# 備考
[MultiWidget](https://github.com/cy-1818/Scriptable_Scripts/tree/main/MultiWidget)との併用が便利です。
