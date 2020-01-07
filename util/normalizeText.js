
export default (str='') => {
    return str.replace(/\b'\b/g, "\u2019")                      // apostrophes
            .replace(/'(?=[^>]*<)\b/g, "\u2018")     			// Opening singles
            .replace(/\b([\.\?\!,]*)(?=[^>]*<)'/g, "$1\u2019")  // Closing singles
            .replace(/"(?=[^>]*<)\b/g, "\u201c")     			// Opening doubles
            .replace(/\b([\.\?\!,]*)(?=[^>]*<)"/g, "$1\u201d")  // Closing doubles
            .replace(/\.\.\./g,  "\u2026")     			        // ellipsis
            .replace(/--/g,  "\u2014")     				        // em-dashes
            .replace(/(?<=<b>)<br\/?>(?=.*<\/b>)/g, '')         // Remove line breaks between <b> tags (niche case, see #2487)
}