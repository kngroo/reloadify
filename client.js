function subscribe(url, callback) {
  var source = new window.EventSource(url);
  source.onmessage = function(message) {
    console.log(message);
    callback(message.data);
  };
  source.onerror = function(err) {
    console.log(err);
    if(source.readyState == window.EventSource.CLOSED) return;
    console.log('sse error', err);
  };
  return source.close.bind(source);
}

subscribe('/eventstream', function(data) {
  console.log(/reload/.test(data));
  if(data && /reload/.test(data)) {
    window.location.reload();
  }
});

