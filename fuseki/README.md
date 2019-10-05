jena-fuseki-heroku-sample
---

Apache Jena Fuseki を Heroku で動かすためのサンプルプロジェクトです。

Apache Jena Fuseki  
https://jena.apache.org/documentation/fuseki2/

Heroku  
https://jp.heroku.com/

このサンプルプロジェクトでは、以下のような運用を想定しています。

- データセットのデータ定義ファイルはGitHubで管理する
- Fusekiでホストするデータセットは読み込み専用とする
- HeokuのDeployでGitHub連携し、masterブランチにmerge/pushされたらデプロイする


## 使い方

本サンプルの利用手順です。

1. 本リポジトリをcloneする。

   ```
   git clone git@github.com:takemikami/jena-fuseki-heroku-sample.git
   ```

2. GitHubのGUIでデータセットを運用するリポジトリを作成する。

3. 作成したGitHubのリポジトリに、本リポジトリのコピーをpushする。

   ```
   cd jena-fuseki-heroku-sample
   git remote remove origin
   git remote add origin git@github.com:{your name}/{your project}.git
   git push origin master
   ```

4. HerokuのGUIで、新しいappを作成する。

5. 新しいappのDeployタブから、データセットを運用するリポジトリを指定して、GitHub連携を設定する。

6. デプロイ完了後、Open appでページクエリを実行出来ることを確認する。

7. データセットの名称を変更する。

   - run/config.ttl ... fuseki:nameでsampleとなっている箇所
   - webapp/index.html ... form actionのパスでsampleとなっている箇所

8. dataset配下のデータセットの定義を編集する。

以降は、datasetの変更をmasterブランチにpushする度に、自動的に反映されるようになります。


## ローカルPCでの実行確認

ローカルPCで実行確認したい場合は、以下の手順でコマンドを入力すると、Fusekiサーバが起動します。

```
gradle clean stage
java -jar jar/jena-fuseki-fulljar-3.12.0.jar
```

## ディレクトリ構成

本サンプルのディレクトリ構成です。

- .circleci ... circleciによるCIの設定
- dataset ... データセットの定義
- run/databases ... データベース、dataset配下をtdbに変換したもの（git管理外）
- run/config.ttl ... Fusekiの設定
- run/shiro.ttl ... Fusekiのセキュリティ設定
- webapp ... webサイトのコンテンツ
- builg.gradle ... ビルド定義、tdbへの変換処理を定義
- Procfile ... Herokuで起動するサーバの定義
