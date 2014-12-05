/********************************************************\
* All sources in Mevarick are Copyright (c) by Konijn    *
* I Konijn, release all code and data under the terms of *
* of the GNU General Public License (version 2), as well *
* as under the traditional Angband license. Distribution *
* is allowed both under the terms of the GPL (version 2) *
* or under the terms of the traditional Angband license. *
*                                                        *
* Exception: alea.js inspired by rot.js & lodash library *
* Disclaimer: This code is without warranty of any kind. *
\********************************************************/

alea = function Alea() {
  //2^-32
  var frac = 2.3283064365386963e-10,
    states = [],
    s0, s1, s2, c;
    
  /*jshint -W004 */
  function seed( seed ) {
    s0 = ( ( seed || new Date().getTime() ) >>> 0 ) * frac;
    s1 = ( seed = ( seed * 69069 + 1 ) >>> 0 ) * frac;
    s2 = ( seed = ( seed * 69069 + 1 ) >>> 0 ) * frac;
    c = 1;
    return this;
  }

  function random() {
    var t = 2091639 * s0 + c * frac;
    s0 = s1;
    s1 = s2;
    c = t | 0;
    s2 = t - c;
    return s2;
  }

  function normal( mean, stddev ) {
    var u, v, r;
    do {
      u = 2 * random() - 1;
      v = 2 * random() - 1;
      r = u * u + v * v;
    } while ( r > 1 || !r );
    var gauss = u * Math.sqrt( -2 * Math.log( r ) / r );
    return( mean || 0 ) + gauss * ( stddev || 1 );
  }

  function percentage() {
    return 1 + Math.floor( random() * 100 );
  }

  function pushState() {
    states.push( [ s0, s1, s2, c ] );
  }

  function popState() {
      if( states.length ) {
        var state = states.pop();
        s0 = state[ 0 ];
        s1 = state[ 1 ];
        s2 = state[ 2 ];
        c = state[ 3 ];
      }
    }
    //Take care of the initial seed
  seed( 3717022350 );
  //Return the module
  return {
    seed: seed,
    random: random,
    normal: normal,
    percentage: percentage,
    popState: popState,
    pushState: pushState,
  };
}();

random = alea.random;