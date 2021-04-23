/*
    A temp handler for migrating to Lit 2.0
*/
import {UnsafeHTMLDirective} from 'lit/directives/unsafe-html'

const UnsafeHTMLDirective_Render = UnsafeHTMLDirective.prototype.render
UnsafeHTMLDirective.prototype.render = function(value){
    try{
        return UnsafeHTMLDirective_Render.call(this, value)
    }catch(err){
        if( value != null )
            console.warn('UnsafeHTML wrong value:', value);
        return ''
    }
}