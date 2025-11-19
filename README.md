# TodoApp
アプリへのリンク
https://yurei0903.github.io/react-todo-app/

React、TypeScript、Tailwind CSS を使用し、ローカルストレージでデータを永続化した「カードの買い物メモ」です。

 # 機能
 ## 表示されるもの
 - カードの名前
 - 金額/合計金額
 - 枚数(+-ボタンで調整可能,0ならチェックがつく)
 - チェックボタン
 - カード追加ボタン(押すとダイアログが表示)
 - チェックのついたカードを削除するボタン
 - カードがなかったら「現在、登録されているカードはありません。」と表示させる
 - 歯車マークの設定ボタン

 ### 普段表示される画面
 ![Image](https://github.com/user-attachments/assets/86d42b20-4223-424d-9f94-fbe47d2d490a)
 ### カードが登録されてない時に表示される画面
 ![Image](https://github.com/user-attachments/assets/dafd25a6-8e0a-48d0-a57f-000b433f714e)
 
 ## ダイアログ
 - カード名入力欄
 - 必要枚数を選択するボタン
 - 値段入力欄
 - URL入力欄
 - カードを追加するボタン/キャンセルするボタン
 ### ダイアログで表示される画面
 ![Image](https://github.com/user-attachments/assets/1e65edb2-4a0a-4d9c-9201-2702de3a4c44)
 
 # 開発経緯
  カードを買いに行くときに今までデッキメーカーというデッキを保存できるウェブに登録したカードを確認しながら買い物をしていたが，カードのおおよその値段の確認ができないうえ，なにを買ったのかわからなくなりがちだったので買い物メモが欲しいと思って作成した．

 # こだわってつけた機能
 - 入力できる文字数
 普段やっているカードゲームではカードの名前の最短が1文字,最大が113文字なのでそれらが入力できるように設定した．
 - カードの枚数選択
 普段やっているカードゲームが基本一つのデッキに入れられる枚数は4枚なので，自分がカードを買う際も最大4枚の場面が多くなる．そのため数字を入力するよりも選択式にした方がすぐに入力が終わりそうだと思ったので入力式ではなく選択式にした．

 - 値段表示
 カードを買う際にネットで値段を確認してから実店舗でそれよりも安いか確認する機会が多いが，家で確認しても実店舗に来るといくらだったか忘れて調べなおすことがあるのでそれを対策するために実装した．また，合計枚数ごとの表示も出すことでどれだけお金を使うことになることになるかを可視化して本当に必要かどうかを考え直せるようにした．

 
 - URLの入力
 カードが売り切れているときにデッキを保存できるウェブサイトやデッキを組む時に参考にしたサイトを確認して別のカードが使えないかを考えるときがあるのでその際にいちいち調べなおさなくてもいいように実装した．



## 開発履歴

- 2025年10月23日：プロジェクト開始
- 2025年11月19日:完成
制作時間16時間
## ライセンス

MIT License

Copyright (c) 2025 Yurei

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
