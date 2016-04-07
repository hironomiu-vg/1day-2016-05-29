# rock-paper-scissors-pair-programming

## 動作環境
node.js,npmがインストールされていること

```
$ node -v
v5.10.1

$ npm -v
3.8.5
```
## install

```
$ make install
```

## ビルトインサーバーの起動
SERVER_PATHにドキュメントルートを指定する。起動後localhost:8080でアクセス可能

```
$ make server SERVER_PATH=./xxxx
```

## Mission
http://localhost:8080 に表示された追加仕様1、追加仕様2を実装してみましょう

## ディレクトリ構成
```
.
├── README.md
├── original
│   ├── bower_components
│   │   ├── bootstrap
│   │   │   └── dist
│   │   ├── jquery
│   │   │   └── dist 
│   │   └── vue
│   │       └── dist
│   ├── css
│   │   ├── base.css
│   ├── img
│   │   ├── paper.png
│   │   ├── rock.png
│   │   └── scissors.png
│   ├── index.html
│   └── js
│       └── rock-paper-scissors.js
├── package.json
└── src
    └── styles
        └── base.less
```

