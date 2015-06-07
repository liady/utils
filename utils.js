var Stores = {
        initStore : function(key){
            key = key || "storage";
            var generalStorage = "general",
                val = localStorage.getItem(key) || "{}",
                model = val.charAt(0)==="{" ? JSON.parse(val) : {};

            function persist(){
                localStorage.setItem(key, JSON.stringify(model));
            }

            function getStorage(namespace){
                namespace = namespace || generalStorage;
                model[namespace] = model[namespace] || {};
                var api = {
                    set : function(key, value){
                        model[namespace][key] = value;
                        persist();
                    },
                    get : function(key){
                        return model[namespace][key];
                    },
                    getNum : function(key){
                        return 1 * (api.get(key) || 0);
                    },
                    increase : function (key){
                         var newNum  = 1 + api.getNum(key);
                         api.set(key, newNum);
                    },
                    clear : function(){
                        if(namespace!==generalStorage){
                            model[namespace] = {};
                            persist();
                        }
                    }
                };
                return api;
            }

            return {
                getStorage : getStorage
            };
        }
};

var storage = Stores.initStore().getStorage();