(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#add-photo').click(addPhoto);
  }

  function addPhoto(){
    var input = `<input type='file', name='photo'>`;
    // var input = '<input type="file", name="photo">';
    $('#add-photo').after(input);
  }


})();
