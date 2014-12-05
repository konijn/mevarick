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

var ret = require( '../alea.js' );
var should = require( 'should' );


describe( 'Initialization', function() {
  it( 'alea should initialize to an object', function() {
    alea.should.be.a.Object;
  } );
} );

describe( 'Does default seed work', function() {
  it( 'first getPercentage call should be 17', function() {
    ( alea.percentage() ).should.be.exactly( 17 );
  });
  it( 'first random call should be 0.9496641806326807', function() {
    ( alea.random() ).should.be.exactly( 0.9496641806326807 );
  });  
  it( 'first normal call should be 45.61514796705584', function() {
    ( alea.normal(50,50 ) ).should.be.exactly( 45.61514796705584 );
  });   

  it( 'second normal after messing with state should be 97.09528751523206', function() {
    alea.pushState();
    //alea.random();
    alea.popState();
    ( alea.normal(50,50 ) ).should.be.exactly( 97.09528751523206 );
  });


});


  


