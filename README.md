# チーム濃い茶の開発ブランチ
# rock-paper-scissors-pair-programming

## 動作環境
node.js,npmがインストールされていること

```
$ node -v
v5.0.0

$ npm -v
3.8.5
```
## install

```
$ make install
```

## 簡易WebAPサーバーの起動
SERVER_PATHにserver.jsを呼び出すディレクトリを指定する。起動後localhost:8888でアクセス可能

```
$ make server SERVER_PATH=./xxxx
```

## Mission
http://localhost:8888 に表示された追加仕様1、追加仕様2を実装してみましょう

## ディレクトリ構成
```
├── Makefile
├── README.md
├── bower.json
├── original
│   ├── public
│   │   ├── bower_components
│   │   │   ├── bootstrap
│   │   │   │   └── dist
│   │   │   │       ├── css
│   │   │   │       │   ├── bootstrap-theme.css
│   │   │   │       │   ├── bootstrap-theme.css.map
│   │   │   │       │   ├── bootstrap-theme.min.css
│   │   │   │       │   ├── bootstrap-theme.min.css.map
│   │   │   │       │   ├── bootstrap.css
│   │   │   │       │   ├── bootstrap.css.map
│   │   │   │       │   ├── bootstrap.min.css
│   │   │   │       │   └── bootstrap.min.css.map
│   │   │   │       ├── fonts
│   │   │   │       │   ├── glyphicons-halflings-regular.eot
│   │   │   │       │   ├── glyphicons-halflings-regular.svg
│   │   │   │       │   ├── glyphicons-halflings-regular.ttf
│   │   │   │       │   ├── glyphicons-halflings-regular.woff
│   │   │   │       │   └── glyphicons-halflings-regular.woff2
│   │   │   │       └── js
│   │   │   │           ├── bootstrap.js
│   │   │   │           ├── bootstrap.min.js
│   │   │   │           └── npm.js
│   │   │   ├── jquery
│   │   │   │   └── dist
│   │   │   │       ├── jquery.js
│   │   │   │       ├── jquery.min.js
│   │   │   │       ├── jquery.min.map
│   │   │   │       ├── jquery.slim.js
│   │   │   │       ├── jquery.slim.min.js
│   │   │   │       └── jquery.slim.min.map
│   │   │   └── vue
│   │   │       └── dist
│   │   │           ├── vue.common.js
│   │   │           ├── vue.js
│   │   │           └── vue.min.js
│   │   ├── css
│   │   │   └── base.css
│   │   ├── favicon.ico
│   │   ├── img
│   │   │   ├── paper.png
│   │   │   ├── rock.png
│   │   │   └── scissors.png
│   │   ├── index.html
│   │   └── js
│   │       └── rock-paper-scissors.js
│   └── server.js
└── package.json
```

