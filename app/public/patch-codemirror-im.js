/* eslint-disable */

// IME not working on mobile #3137
// https://github.com/codemirror/CodeMirror/issues/3137

// CodeMirrorでスマホからの日本語入力をなんとかする
// https://qiita.com/ttakuru88/items/e363267772cacf4c1fa2

// iOS端末のユーザーエージェントの判別コードは多分これが一番短いと思います(35文字)
// https://qiita.com/tonkotsuboy_com/items/5c703c601de6179e3ce1

function patchCodeMirrorIM(cm) {
  if(!/[ \(]iP/.test(navigator.userAgent)) return;

  const origOnKeyPress = cm.display.input.onKeyPress // 元のkeypressを取得
  cm.display.input.onKeyPress = function(e) {
    // iOSの絵文字キーボードのように、サロゲートペアの直接のkeypressは、CodeMirrorの処理を通すと文字化けるのでキャンセルする
    if(e.which >= 0x10000) {
      return
    }

    if(!cm.display.input.composing) { // 文字入力中かどうかはcomposingでわかる
      cm.keyPressTimer = setTimeout( () => {
        origOnKeyPress.call(this, e)
      }, 30) // 30ms以内（適当）にcompositionstartが呼ばれなければkeypressは実行して良い
    }
  }

  const inputArea = cm.display.input.div || cm.display.input.textarea // 一応、inputStyleがどちらの状態でも大丈夫な書き方にした
  inputArea.addEventListener('compositionstart', (_cm, e) => {
    if(cm.keyPressTimer) {
      clearTimeout(cm.keyPressTimer)
    }
  }, false)

  const inputField = cm.display.input.getField()
  // IME入力中のkeydownをCodeMirrorに渡さないようにする
  window.addEventListener('keydown', function(e){
    if(e.target == inputField && cm.display.input.composing) {
      e.stopPropagation()
    }
  }, true)

  // バーチャルキーボードの「完了」ボタンを押した時に、キーボードだけが消えないようにする
  inputField.addEventListener('blur', function(e){
    if(e.relatedTarget) { // 「完了」ボタンでのblurかどうか
      return
    }
    e.stopPropagation() // stopしないと文字が二重で入力される

    if (cm.display.input.composing) {
      // 再focusが確定したらblurさせる
      inputField.focus()
      setTimeout(function(){
        inputField.blur()
      }, 1)
    }
  }, false)
}
