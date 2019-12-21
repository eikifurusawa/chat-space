$(function(){
  function buildHTML(message){
    if(message.image){
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
    }else{
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
    }
    
    return html;
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault()
    // console.logを用いてイベント発火しているか確認
    var formData = new FormData(this);
    var url = $(this).attr('action');
    console.log(url);
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
});

