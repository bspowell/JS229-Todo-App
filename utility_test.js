(function() {
  let findObjs = function(element, props, multiple) {
    let match = multiple ? [] : undefined;

    element.some(function(obj) {
      let all_match = true;

      for (let prop in props) {
        if (!(prop in obj) || obj[prop] !== props[prop]) {
          all_match = false;
        }
      }
      if (all_match) {
        if (multiple) {
          match.push(obj);
        }
        else {
          match = obj;
          return true;
        }
      }
    });

    return match;
  };


  var _ = function (element) {
    u = {
      first: function() {
        return element[0]
      },
      last: function() {
        return element[element.length -1]
      },
      without: function() {
        var new_arr = [],
            args = Array.prototype.slice.call(arguments);
        element.forEach(function(el) {
          if (args.indexOf(el) === -1) {
            new_arr.push(el);
          }
        });
        return new_arr;        
      },
      lastIndexOf: function(search) {
        let idx = -1; 

        for (let index = element.length - 1; index >= 0; index--) {
          if (element[i] === search) {
            idx = index;
            break;
          }
        }
        return idx;
      },
      sample: function(qty) {
        let sampled = [],
            copy = element.slice(),
            get = function() {
              let index = Math.floor(Math.random() * copy.length),
                  ele = copy[index];
              copy.splice(index, 1);
              return ele;
            };
        if (!qty) { return get(); }
        while(qty) {
          sampled.push(get());
          qty--;
        }
        return sampled;
      },
      
      // objects

      findWhere: function(props) {
        return findObjs(element, props, false)
      },
      where: function(props) {
        return findObjs(element, props, true)
      },

      pluck: function(query) {
        let vals = [];
        element.forEach(function(obj) {
          if (obj[query]) {
            vals.push(obj[query])
          }
        });
        return vals;
      },
      keys: function() {
        let keys = [];

        for (let prop in element) {
          keys.push(prop);
        }
        return keys;
      },
      values: function() {
        let values = [];

        for (let prop in element) {
          values.push(element[prop]);
        }
        return values;
      },
      pick: function() {
        let args = [].slice.call(arguments);
            new_obj = {};
        
        args.forEach(function(prop) {
          if (prop in element) {
            new_obj[prop] = element;
          }
        })
        return new_obj;
      },
      omit: function() {
        let args = [].slice.call(arguments);
            new_obj = {};
        
        for(let prop in element) {
          if(args.indexOf(prop) === -1) {
            new_obj[prop] = element[prop];
          }
        }
        return new_obj;
      },
      has: function(prop) {
        return {}.hasOwnProperty.call(element, prop);
      }
    };

    (["isElement", "isArray", "isObject", "isFunction", "isBoolean", "isString", "isNumber"]).forEach(function(method) {
      u[method] = function() { _[method].call(u, element); };
    });

    return u;
  };
  _.range = function(start, stop) {
    var range = [];
    if (stop === undefined) {
      stop = start; 
      start = 0;
    }
    for (let index = start; index < stop; index++) {
      range.push(index);
    }

    return range;
  };

  _.extend = function() {
    let args = [].slice.call(arguments); //args = Array.prototype.slice.call(arguments)
        old_obj = args.pop();
        new_obj = args[args.length - 1];
    
    for (let prop in old_obj) {
      new_obj[prop] = old_obj[prop];
    }

    return args.length === 1 ? new_obj : _.extend.apply(_, args);
  };

  _.isElement = function(obj) {
    return obj && obj.nodeType === 1  // check if obj is defined, then check if nodtype is equal to 1
  };

  _.isArray = Array.isArray || function(obj) { // seeing if isArray exists (sometimes not on old browsers), if not, create it
    return toString.call(obj) === "[object Array]";
  }

  _.isObject = function(obj) {
    let type = typeof obj;

    return type === "function" || type === "object" && !!obj; // return true if type is function or type objec
  };

  _.isFunction = function(obj) {
    let type = typeof obj;

    return type === "function" 
  };

  (['Boolean', 'String', 'Number']).forEach(function(method) {
    _['is' + method] = function(obj) {
      return toString.call(obj) === "[object " + method + "]";
    };
  });

  // _.isBoolean = function(obj) {
  //   return toString.call(obj) === '[object Boolean]'
  // };

  // _.isString = function(obj) {
  //   return toString.call(obj) === '[object String]'
  // };

  // _.isString = function(obj) {
  //   return toString.call(obj) === '[object Number]'
  // };

  window._ = _;
})();