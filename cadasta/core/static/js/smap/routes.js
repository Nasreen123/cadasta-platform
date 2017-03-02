var CreateRoutes = function(){
  var routes = {};
  var rm = RouterMixins;
  rm.init();

  function route(path, el, controller, eventHook=null) {
    routes[path] = {
      el: el,
      controller: controller,
      eventHook: eventHook
    }
  }

  route('/map', 'project-detail',
    function() {
      rm.hideDetailPannel();
      rm.hideModal();
  });

  route('/overview', 'project-detail',
    function() {
      rm.displayDetailPannel();
      rm.resetLocationStyle();
      map.fitBounds(options.projectExtent);
  });

  route('/', 'project-detail',
    function() {
      rm.displayDetailPannel();
      rm.resetLocationStyle();
      map.fitBounds(options.projectExtent);
  });


  // *** SPATIAL RECORDS ***
  route('/records/location', 'project-detail',
    function() {
      rm.displayDetailPannel();
      rm.centerOnCurrentLocation()
      rm.updateCurrentLocationUrl()
    },
    function(){
      rm.formSubmission('#detail-form', rm.getCurrentLocationUrl());
  });

  route('/records/location/new', 'project-detail',
    function() {
      rm.displayEditDetailPannel();
  });

  route('/records/location/edit', 'project-detail', 
    function() {
      rm.displayEditDetailPannel();
      rm.centerOnCurrentLocation()
    },
    function(){
      rm.formSubmission('#location-wizard', rm.getCurrentLocationUrl());
  });

  route('/records/location/delete', 'additional-modals',
    function() {
      rm.displayModal();
    },
    function(){
      rm.formSubmission('#modal-form', '#/overview');
  });

  route('/records/location/resources/add', 'additional-modals',
    function() {
      rm.displayModal();
    }, 
    function() {
      rm.formSubmission('#modal-form', rm.getCurrentLocationUrl());
  });

  route('/records/location/resources/new', 'additional-modals', 
    function() {
      rm.displayModal();
    }, 
    function() {
      rm.uploadResourceHooks()
      rm.formSubmission('#modal-form', rm.getCurrentLocationUrl());
  });

  route('/records/location/relationships/new', 'additional-modals',
    function() {
      rm.displayModal();

    }, function() {
      rm.relationshipHooks();
      rm.formSubmission('#modal-form', rm.getCurrentLocationUrl());
    });


  // *** RELATIONSHIPS ***
  route('/records/relationship', 'project-detail',
    function() {
      rm.displayDetailPannel();
    },
    function() {
      rm.updateCurrentLocationUrl($("#current-location").attr('href'));
      rm.updateCurrentRelationshipUrl()
  });

  route('/records/relationship/edit', 'project-detail',
    function() {
      rm.displayEditDetailPannel();
    }, function(){
      rm.formSubmission('#detail-form', rm.getCurrentRelationshipUrl());
  });

  route('/records/relationship/delete', 'additional-modals',
    function() {
      rm.displayModal();
    },
    function(){
      rm.formSubmission('#modal-form', rm.getCurrentLocationUrl());
  });

  route('/records/relationship/resources/add', 'additional-modals',
    function() {
      rm.displayModal();
    }, function() {
      'use strict';
      rm.formSubmission('#modal-form', rm.getCurrentRelationshipUrl());
  });

  route('/records/relationship/resources/new', 'additional-modals',
    function() {
      rm.displayModal();
    }, function() {
      rm.uploadResourceHooks()
      rm.formSubmission('#modal-form', rm.getCurrentRelationshipUrl());
  });

  return routes;
}