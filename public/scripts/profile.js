const updateUserEmail = function() {
  const $updateEmail = $('#update-email');
  $updateEmail.submit(function() {
    //line here to check that email is not empty before you send the POST
    event.preventDefault();
    console.log($updateEmail);
    $.post('/profile', $updateEmail.serialize());
    $("#updated-email-message").slideDown();
  })
}


$(document).ready(function() {
  updateUserEmail();
});


