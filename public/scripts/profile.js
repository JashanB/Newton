const updateUserEmail = function() {
  console.log('function running')
  const $updateEmail = $('#update-email');
  $updateEmail.submit(function() {
    event.preventDefault();
    console.log($updateEmail);
    $.post('/signup', $updateEmail.serialize());
  });
}


$(document).ready(function() {
  updateUserEmail();
});
