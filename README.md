# ☆ ピコピコプラネット ☆

_ピピコ！ピコピ！ピココ！ピコピ！_


## ☆ これはなに？ ☆

『[☆ピコピコプラネット☆](https://mltd.pikopikopla.net/)』は、『アイドルマスター ミリオンライブ！』の情報を Linked Open Data（LOD）によって提供する非公式のオープンデータプラットフォームです。

## ☆ Linked Open Data ☆

『☆ピコピコプラネット☆』では、[RDF](https://ja.wikipedia.org/wiki/Resource_Description_Framework) というメタデータを記述する枠組みに従って情報を提供しています。RDF は Turtle で記述されています。RDF クエリ言語 の [SPARQL](https://ja.wikipedia.org/wiki/SPARQL) を用いて検索することができます。

このようなメタデータを共有するための技術の総称を [Linked Open Data](https://ja.wikipedia.org/wiki/Linked_Open_Data)（LOD）といいます。

ブログ記事も参考にしてください。
- [『☆ピコピコプラネット☆』が誕生しました](https://foooomio.hatenablog.com/entry/2019/12/02/000237)

### SPARQL

[SPARQL](https://ja.wikipedia.org/wiki/SPARQL) の詳細については、以下の W3C 勧告を参考にしてください。

- [SPARQL 1.1 Query Language](https://www.w3.org/TR/sparql11-query/)（W3C 勧告）
- [SPARQL 1.1 クエリ言語](http://www.asahi-net.or.jp/~ax2s-kmtn/internet/rdf/REC-sparql11-query-20130321.html)（日本語訳）

エンドポイントの URL は `https://mltd.pikopikopla.net/sparql` です。（注：この URL は現在レスポンスに時間がかかる問題があります。`https://pikopikoplanet.herokuapp.com/sparql` もあわせてご利用ください。ただしこの URL は将来変更になる可能性があります。）

query オペレーションのみに対応しています。リクエストの送信については、以下の W3C 勧告を参考にしてください。

- [SPARQL 1.1 Protocol](https://www.w3.org/TR/2013/REC-sparql11-protocol-20130321/)（W3C 勧告）
- [SPARQL 1.1 プロトコル](http://www.asahi-net.or.jp/~ax2s-kmtn/internet/rdf/REC-sparql11-protocol-20130321.html) （日本語訳）

SPARQL クエリの例を以下に記載しておきます。

- [ピコピコプラネットのクエリ例](https://gist.github.com/foooomio/8314036fee8bc74c8d7da835ab1b7fa3)


## ☆ ライセンス ☆

[![CC0 1.0](https://i.creativecommons.org/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

CC0 1.0 のもとで、ご自由にお使いいただけます。ただし `fuseki/` 以下を除きます。

本コンテンツは、『アイドルマスタ ミリオンライブ！』の非公式プロジェクトです。株式会社バンダイナムコエンターテインメント様および関係各社様とは一切関係ありません。

節度をもって楽しみましょう。

## ☆ コントリビューション ☆

みなさまの協力を大歓迎します。

ご提供いただいた情報やソースコードについて、上記のライセンスで公開することに同意するものとします。


## ☆ Special Thanks ☆

#### みかみん ([takemikami](https://github.com/takemikami)) さん
- [rdflint](https://imas.github.io/rdflint/)
- [Apache Jena FusekiをHerokuで運用する手順（ただしReadOnlyのデータセットのみ） | takemikami's note](https://takemikami.com/2019/08/01/Apache-Jena-FusekiHerokuReadOnly.html)

#### croMisa ([crssnky](https://github.com/crssnky)) さん
- [im@sparql](https://sparql.crssnky.xyz/imas/)

and コントリビューターのみなさま☆
