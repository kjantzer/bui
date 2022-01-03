// Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export default function debounce(func, wait, {immediate=false, maxWait=false}={}) {
  let timeout
  let ts = new Date().getTime()

  return function executedFunction() {
    let context = this;
    let args = arguments;
    let _ts = new Date().getTime()
	    
    let later = function() {
      timeout = null;
      ts = _ts
      if (!immediate) func.apply(context, args);
    };

    let callNow = immediate && !timeout;

    if( timeout && maxWait && _ts - ts >= maxWait )
      return

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
};