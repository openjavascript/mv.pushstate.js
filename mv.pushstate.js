
var V = require( 'mv.js' )
    , BaseHandler = require( 'mv.basehandler.js' )
    , history = window.history
    , _inited 
    ;

var _r  = $.extend( true, {
    init: 'onInitHandler'
    , push: 'onPushStatePush'
    , pushstate: 'onPushStatePush'
    , pop: 'onPopState'
    , popstate: 'onPopState'
}, BaseHandler );


_r.on( _r.push, function( _evt, _params, _state, _url, _title ){
    _url = _url || location.href;
    _params = _params || {};
    _title = _title || '';
    _state = _state || {};

    _url = V.utils.addUrlParams( _url, _params );

    //console.log( 'pushstate form mv.pushstate.js', _params, _url, _title );
    history.pushState( _state, _title, _url );
});

_r.on( _r.init, function(){
    if( _inited ) return;

    V.WIN.on( 'popstate', function( _evt ){
        //console.log( 'popstate from mv.pushstate.js', V.utils.ts() );
        _r.trigger( _r.popstate );
    });

    _inited = true;
});

!_inited && _r.trigger( _r.init );

module.exports = _r;

