// ダイアログオブジェクト
 var dialog = {};

 // デフォルト値を設定
 dialog.setDefault = function() {
   dialog.width = 270;
   dialog.height = 310;
   dialog.body = '<p id="qrdiscription" >（ダイアログの説明）</p>';
   dialog.bodyStyle =
     'border-radius: 6px 6px 6px 6px;'+
     'background-color: #FFF;'+
     'font-size: 11px;'+
     'box-shadow: 6px 6px 6px rgba(0,0,0,0.4);';
   dialog.backStyle =
     'background-color: #000;'+
     'opacity: 0.99;';
   dialog.closeButtonHtml =
     '<button onclick="dialog.close()" id="closedialogbutton" >閉じる</button>'
   dialog.backId = 'dialog_back';
   dialog.bodyId = 'dialog_body';
 };

 dialog.show = function() {

   // 画面の高さを取得
   var getBrowserHeight = function() {
     if ( window.innerHeight ) {
       return window.innerHeight;
     } else if ( document.documentElement &&
       document.documentElement.clientHeight != 0 ) {
       return document.documentElement.clientHeight;
     } else if ( document.body ) {
       return document.body.clientHeight;
     }
     return 0;
   }

   dialog.left = (window.innerWidth - dialog.width) / 2;

   // スクロール位置を取得してからtopを設定
   dialog.top =  window.pageYOffset + (window.innerHeight - dialog.height) / 2;

   var px = function(value) {
     return value.toString() + 'px';
   };

   var styleRect = function(left, top, width, height) {
     return 'left:' + px(left)
       + ';top:' + px(top)
       + ';width:' + px(width)
       + ';height:' + px(height) + ';'
   };

   var dialogBackStyle = function() {
     var result = '';
     result += 'height:' + px(getBrowserHeight()) + ';';
     result += 'position:absolute;';
     result += 'top:'+ window.pageYOffset +'px;';
     result += 'left:0px;';
     result += 'width:100%;';
     result += dialog.backStyle;
     return result;
   };

   var dialogBodyStyle = function() {
     console.log(dialog.top)
     var result = '';
     result += 'position:absolute;';
     result += dialog.bodyStyle;
     result += styleRect(dialog.left, dialog.top, dialog.width, dialog.height);
     return result;
   };

   var html = document.getElementById("content").innerHTML +
     '<div id="dialog">' +
       '<div id="' + dialog.backId + '" style="' + dialogBackStyle() + '"></div>' +
       '<div id="' + dialog.bodyId + '" style="' + dialogBodyStyle() + '">' +
         dialog.closeButtonHtml +
         '<div id="qrcode"></div>' +
         dialog.body +
       '</div>' +
     '</div>';

   document.getElementById("content").innerHTML = html;
 };

 // ダイアログを閉じる
 dialog.close = function() {
   var delNode = document.getElementById("dialog");
   delNode.parentNode.removeChild(delNode);
   return_scroll();
 };

 var dialogShow = function() {
   dialog.setDefault();
   dialog.show();
   $('#qrcode').qrcode({width: 200, height: 200, text: "https://www.google.co.jp/"});
   no_scroll();
 };

 //スクロール禁止用関数
 function no_scroll(){
   //PC用
   var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
   $(document).on(scroll_event,function(e){e.preventDefault();});
   //SP用
   $(document).on('touchmove.noScroll', function(e) {e.preventDefault();});
 };

 //スクロール復活用関数
function return_scroll(){
  //PC用
  var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  $(document).off(scroll_event);
  //SP用
  $(document).off('.noScroll');
};
