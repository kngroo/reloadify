function subscribe(url, callback) {
  var source = new window.EventSource(url);
  source.onmessage = function(message) {
    callback(message.data);
  };
  source.onerror = function(err) {
    if(source.readyState == window.EventSource.CLOSED) return;
    console.log('sse error', err);
  };
  return source.close.bind(source);
}

subscribe('/eventstream', function(data) {
  if(data && /reload/.test(data)) {
    window.location.reload();
  }
});

