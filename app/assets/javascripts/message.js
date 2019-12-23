$(function(){

  function buildHTML(message){
    if (message.content && message.image) {
      //data-idが反映されるようにしている
        var html = `<div class="main__messages__message" data-message-id="${message.id}">
                    <div class="main__messages__message__upper">
                        <div class="main__messages__message__upper__name">
                          ${message.user_name}
                         </div>
                            <div class="main__messages__message__upper__date">
                              ${message.created_at}
                            </div>
                          </div>
                        <div class="main__messages__message__lower">
                      <p class="main__messages__message__lower__content">
                        ${message.content}
                      </p>
              <img src="${message.image}">
            </div>
          </div>`
    } else if (message.content) {
          //同様に、data-idが反映されるようにしている
        var html = `<div class="main__messages__message" data-message-id="${message.id}">
                       <div class="main__messages__message__upper">
                          <div class="main__messages__message__upper__name">
                          ${message.user_name}
                          </div>
                            <div class="main__messages__message__upper__date">
                              ${message.created_at}
                            </div>
                    </div>
                  <div class="main__messages__message__lower">
                <p class="main__messages__message__lower__content">
                  ${message.content}
                </p>
              </div>
            </div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="main__messages__message" data-message-id=` + message.id + `>` +
        `<div class="main__messages__message__upper">` +
          `<div class="main__messages__message__upper__name">` +
            message.user_name +
          `</div>` +
          `<div class="main__messages__message__upper__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="main__messages__message__lower__content">` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    
    return html;
  }

  $('#new_message').on('submit', function(e){
      e.preventDefault()
      // console.logを用いてイベント発火しているか確認
      var formData = new FormData(this);
      var url = $(this).attr('action');
      
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      
      .done(function(data){
        var html = buildHTML(data);
        $('.main__messages').append(html);
        $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
        $('#new_message')[0].reset();
        $(".new_message__send-btn").prop("disabled", false);
      })
      
      .fail(function(){
        alert("メッセージ送信に失敗しました");
      });
  })
    
      var reloadMessages = function() {
        
        //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        last_message_id = $('.main__messages__message:last').data("message-id");
      
        $.ajax({
            //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
            url: "api/messages",
            //ルーティングで設定した通りhttpメソッドをgetに指定
            type: 'get',
            dataType: 'json',
            //dataオプションでリクエストに値を含める
            data: {id: last_message_id}
          })
              
        .done(function(messages){
          if (messages.length !== 0) {
            //追加するHTMLの入れ物を作る
            var insertHTML = '';
            //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
            $.each(messages, function(i, message) {
              insertHTML += buildHTML(message)
            });
            //メッセージが入ったHTMLに、入れ物ごと追加
            $('.main__messages').append(insertHTML);
            $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
            $("#new_message")[0].reset();
            $(".form__submit").prop("disabled", false);
          }
        })
        .fail(function(){
            alert("メッセージ送信に失敗しました");
        });
      }
      //$(function(){});の閉じタグの直上(処理の最後)に以下のように追記
      if (document.location.href.match(/\/groups\/\d+\/messages/)) {
        setInterval(reloadMessages, 5000);
      // 正規表現は基本的には/と/で囲んだ部分になりますが、/自体も正規表現に含めたい場合、直前に\(バックスラッシュ)を付けます。
        // また、\+d\の部分は、「桁無制限の数値」という意味になります。具体的には、dが0 ~ 9までの数字のどれかを表し、+は+のついた文字が何文字でもマッチする、という特殊な意味を持ちます。
        // これで、URLにgroups/数字/messagesという部分があるページでない限り、reloadMessagesメソッドが動くことはありません。
        // 引数で渡している7000という数字は、7秒という意味になります。500にすると、0.5秒です。
      }
});