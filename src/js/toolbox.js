import Control from "./abstract/control";
import Filter  from "./abstract/filter";
import Utils   from "./utils";


class ToolBox {

    _type = 'out';

    _left   = [];
    _center = [];
    _right  = [];


    /**
     * @param {string} type
     */
    constructor(type) {

        if (type) {
            this.type = type;
        }
    }


    /**
     *
     * @return {string}
     */
    getType() {
        return this._type;
    }


    /**
     * @param {Array} controls
     */
    left(controls) {

        if ( ! Array.isArray(controls)) {
            return;
        }

        let left = [];

        controls.map(function (control) {

            if (Utils.isClass(control)) {
                left.push(control.toObject())

            } else if (Utils.isObject(control)) {
                left.push(control)
            }
        });

        this._left = left;

        return this;
    }


    /**
     * @param {Array} controls
     */
    center(controls) {

        if ( ! Array.isArray(controls)) {
            return;
        }

        let center = [];

        controls.map(function (control) {

            if (Utils.isClass(control)) {
                center.push(control.toObject())

            } else if (Utils.isObject(control)) {
                center.push(control)
            }
        });

        this._center = center;

        return this;
    }


    /**
     * @param {Array} controls
     */
    right(controls) {

        if ( ! Array.isArray(controls)) {
            return;
        }

        let right = [];

        controls.map(function (control) {

            if (Utils.isClass(control)) {
                right.push(control.toObject())

            } else if (Utils.isObject(control)) {
                right.push(control)
            }
        });


        this._right = right;

        return this;
    }


    /**
     * @return {{type: string}}
     */
    toObject() {

        let result = {
            type: this._type
        };

        if (this._left.length > 0) {
            result.left = this._left;
        }

        if (this._center.length > 0) {
            result.center = this._center;
        }

        if (this._right.length > 0) {
            result.right = this._right;
        }

        return result;
    }
}

export default ToolBox;