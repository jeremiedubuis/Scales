class Dispatcher {

    constructor() {
        this.actions = [];
    }
    /**
     * Registers a callback with an action
     * scope defines the scope on wich callback
     * will be called
     * @param {string} action
     * @param {function} callback
     * @param {context} scope
     */
    on(action, callback, scope) {

        if (!this.actions[action]) this.actions[action] = [{
            scope: scope,
            callback: callback
        }];
        else this.actions[action].push({
            scope: scope,
            callback: callback
        });
        return this;

    }

    /**
     * Removes a registered callback from an action
     * @param {string} action
     * @param {function} callback
     */
    off(action, callback) {
        if (!this.actions[action]) console.warn('Dispatcher->'+action+' is undefined');
        if (!callback) this.actions[action] = [];

        let _index = this.actions[action].indexOf(callback);
        if (_index > -1) this.actions[action].splice(_index,1);
        return this;
    }

    /**
     * Triggers an action and all associated callbacks
     * @param {string} action
     * @param {any} params - any number of optionnal params passed to the callbacks
     */
    trigger(action, ...params) {

        if (this.actions[action]) {
            this.actions[action].forEach(function(_action) {
                if (typeof _action.callback === 'function') {
                    if (_action.scope) _action.callback.call(_action.scope, ...params);
                    else _action.callback(...params);
                }
            });
        }

        return this;

    }

}

export default Dispatcher;