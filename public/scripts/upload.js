$(document).ready(function() {

  const $upload = $("#upload")

  $upload.submit(function() {
    event.preventDefault();
    const title = $("input[name='title']").val()
    const description = $("input[name='description']").val()
    const imageURL = $("input[name='imageURL']").val()
    const resourceURL = $("input[name='resourceURL']").val()
    const topic = $( "select#topic-select" ).val();

    if (title.length === 0 || description.length === 0 || imageURL === 0 || resourceURL.length === 0 || (!topic) ) {
      alert('Please make sure you fill in all the fields!')
    } else {
      $.post("/upload", $upload.serialize(), data => {
        window.location.href ="http://localhost:8080/myresource/" + data.user_id;
      })
    }
  })
});


