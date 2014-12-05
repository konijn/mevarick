/*********************************************************
 * All sources in Mevarick are Copyright (c) by Konijn    *
 * I Konijn, release all code and data under the terms of *
 * of the GNU General Public License (version 2), as well *
 * as under the traditional Angband license. Distribution *
 * is allowed both under the terms of the GPL (version 2) *
 * or under the terms of the traditional Angband license. *
 *                                                        *
 * Exception: Alea code got borrowed from rot.js & lodash *
 * Disclaimer: this code is without warranty of any kind. *
 *********************************************************/

function Matrix( config, f) {
  var o = this, x, y;
  o.width = config.width;
  o.height = config.height;
  f = f || _.noop();
  //Create rows
  for( x = 0 ; x < o.width ; x++ )
    o[x] = [];
  //Create cells
  for( x = 0 ; x < o.width ; x++ )
    for( y = 0 ; y < o.height ; y++ )
      f( this.initCell(x,y,config) , x , y , o );
}

Matrix.prototype.dump = function dump() {
  console.log( this.toString() );
};

Matrix.prototype.toString = function toString() {
  return this.reduce( function( s, cell ) {
    if( cell.dump )
      return s + cell.dump();
    if( cell.value )
      return s + cell.value + cell.eol && !cell.eoc ? "\n" : "";
  }, "" );
};

Matrix.prototype.reduce = function apply( f, initialValue ) {
  var x, y, value = initialValue;
  for( y = 0; y < this.height; y++ )
    for( x = 0; x < this.width; x++ )
      value = f( value, this[ x ][ y ], this );
  return value;
};

Matrix.prototype.apply = function apply( f ) {
  var x, y;
  for( y = 0; y < this.height; y++ )
    for( x = 0; x < this.width; x++ )
      value = f( this[ x ][ y ], this );
  return value;
};

Matrix.cardinalNeighbours = [ { x:  0, y: -1}, 
                              { x:  0, y:  1}, 
                              { x:  1, y:  0},
                              { x: -1, y:  0} ];
                              
Matrix.allNeighbours = Matrix.cardinalNeighbours.concat( [ { x:  1, y: -1},
                                                           { x:  1, y:  1}, 
                                                           { x: -1, y: -1}, 
                                                           { x: -1, y:  1} ] );
