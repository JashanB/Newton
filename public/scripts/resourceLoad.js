const createResourceElement = function(resource) {
  const $resource = $('<article>').addClass('resource');
  const htmlCode = `
  <div class="resource-box">
    <header>
     <span class="resource-title">${resource.title}</span>
     <span class="resource-image">${resource.image_url}</span>
      <form method="POST" action='/like'><button class="submit">Like</button></form>
    </header>
  </div>
  `;
  //<img src=${tweet.user.avatars}/> add img to resource
  //insert like icon
  //insert # of likes?

  $resource.append(htmlCode);
  return $resource;
};

const renderResource = function(resource) {
  resource.forEach(resource => {
    $('#resource-container').prepend(createResourceElement(resource));
  });
};

$(document).ready(function() {
  //submit tweet to /tweets
  //load tweets posted to /tweets
  const loadResources = function() {
    $.ajax('/', { method: 'GET' })
      .then(function(resources) {
        renderTweets(resources);
      });
  };
  //loads current tweets in history
  loadResources();
});

