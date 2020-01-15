const updateUserEmail = function() {
  console.log('function running')
  const $updateEmail = $('#update-email');
  $updateEmail.submit(function() {
    event.preventDefault();
    alert("Submitted");
  });
}


$(document).ready(function() {
  console.log('running')
  updateUserEmail();

});
