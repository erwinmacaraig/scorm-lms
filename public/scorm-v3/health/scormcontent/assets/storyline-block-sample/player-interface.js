(function() {
  function getParams(url) {
    var querystring = url.split('?')[1];
    if (!querystring) return {};

    return querystring.split('&').reduce(function(memo, param) {
      var tuple = param.split('=', 2);
      memo[tuple[0]] = decodeURIComponent(tuple[1].replace(/\+/g, ' '));
      return memo;
    }, {});
  }

  function buildFlashVars(params) {
    var flashParams = {
      vEnableOne: 'true',
      vInterfaceObject: 'vInterfaceObject',
      vRestoreStateData: params.state
    };

    return Object.keys(flashParams).reduce(function(memo, key) {
      if (flashParams[key]) memo.push(key.concat('=', flashParams[key]));
      return memo;
    }, []).join('&');
  }

  var params = getParams(window.location.href);

  var handlers = {
    'slide:capture': captureSlide,
    'player:pause': triggerPause,
    'player:play': triggerPlay,
    'player:focus': focusPlayer
  };

  if (params.hasOwnProperty('wmode')) {
    window.g_strWMode = params['wmode'];
  }

  window.autoSpider     = true;
  window.g_strFlashVars = buildFlashVars(params);
  window.vEnableOne     = true;
  window.addEventListener('message', handleMessage);

  window.vRestoreStateData = params.state;

  window.vInterfaceObject = {
    OnSlideStarted: function(id) {
      window.parent.postMessage({ type: 'slide:change', data: id }, '*');
    },
    OnSlideTransition: function(id, duration) {
      window.parent.postMessage({ type: 'slide:transition', data: { id: id, duration: duration } }, '*');
    },
    OnEnterFullscreen: function() {
      window.parent.postMessage({
        type: 'fullscreen:enter',
        windowName: window.name
      }, '*');
    },
    OnExitFullscreen: function() {
      window.parent.postMessage({
        type: 'fullscreen:exit',
        windowName: window.name
      }, '*');
    },
    OnPlayerClicked: function() {
      window.parent.postMessage({ type: 'player:click' }, '*');
    }
  };

  function captureSlide(data) {
    var player = window.GetPlayer();
    if (typeof player.CaptureSlideImage !== 'function') return;
    window.parent.postMessage({
      type: 'slide:capture',
      data: {
        commentId: data.commentId,
        snapshot:  player.CaptureSlideImage()
      }
    }, '*');
  }

  function triggerPause() {
    var player = window.GetPlayer();
    if (typeof player.TriggerPause !== 'function') return;
    player.TriggerPause();
  }

  function triggerPlay() {
    var player = window.GetPlayer();
    if (typeof player.TriggerPlay !== 'function') return;
    player.TriggerPlay();
  }

  function focusPlayer() {
    window.focus();
  }

  function handleMessage(e) {
    var event = e.data;
    if (typeof event !== 'object') return;
    var handler = handlers[event.type];
    if (!handler) return;
    handler(event.data);
  }
})();
