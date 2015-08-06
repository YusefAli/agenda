'use strict';
    // server/rpc/app.js
    exports.actions = function(req, res, ss){
     
      // tell SocketStream to load session data
      req.use('session');
     
      return {
        authenticate: function(username){
          // lookup user in DB, LDAP, etc
          
            req.session.setUserId(username);
            res(true);
        },
        logout: function(){
          req.session.setUserId(null);
        }
      }
    }