/*
	Backbone Model Attributes Types

	A non-obtrusive plugin to force `get()`ing of attributes to return values in
	a specific type (integer, date, etc). It's designed to be used in code and refrains
	from overwriting the real value in `attributes`.

	@author Kevin Jantzer, Blackstone Audio
	@since 2017-09-19

	@TODO:
	- should null/undefined value parsing be more robust?
*/

import Backbone from 'backbone'

const BackboneModelGet = Backbone.Model.prototype.get // save reference

const ModelAttrTypes = {
	'string': function(val){ return String(val) },
	'json': function(val){ return typeof val == 'string' ? JSON.parse(val) : val },
	'bool': function(val){ return !!val },
	'boolish': function(val){ return !!val && val !== '0' && val !== 0},
	'int': function(val){ return val ? parseInt(val) : 0 },
	'float': function(val){ return val ? parseFloat(val) : 0 },
	'num': function(val){ return val ? parseFloat(val) : 0 },
	'date': function(val){ return new Date(val) }
}

Backbone.registerModelAttrType = (key, fn)=>{
    ModelAttrTypes[key] = fn
}

Backbone.Model.prototype.get = function(attr){

	var [attr, type] = attr.split('|') // check to see if user is casting: `attrName|castType`
	var val = BackboneModelGet.call(this, attr) // raw value
	var type = type || (this.attrTypes && this.attrTypes[attr]) || (this.collection && this.collection.attrTypes && this.collection.attrTypes[attr]) // the type the value should be

	// no types given, or no type for this attribute (or no value for attr), so return the value as is
	if( !type || type == 'raw' || this.attributes[attr] === undefined )
		return val

	return convertToType.call(this, attr, type, val)
}

function convertToType(attr, type, val){

	// set storage properties
	this.__attributesRaw = this.__attributesRaw || {}
	this.__attributes = this.__attributes || {}

	var key = attr+type

	// current value is different then the last time we got it (or we've never got it before), so convert the value to type now
	if( val != this.__attributesRaw[key] || this.__attributes[key] === undefined ){

        // remember the raw value we converted from so we know whether to change it again
		this.__attributesRaw[key] = val

		// custom functions are supported
		if( typeof type === 'function' )
			val = type(val)
		else if( ModelAttrTypes[type] )
			val = ModelAttrTypes[type].call(this, val)
		else
			console.warn('`'+type+'` is not a supported attribute type')

		// cache the converted value
		this.__attributes[key] = val
	}

	return this.__attributes[key]
}
