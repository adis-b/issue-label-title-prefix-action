
function correctTitle(title, prefix, knownPrefixes) {
   if (!prefix) {
      return title;
   }

   if (knownPrefixes) {
     knownPrefixes.forEach(p => {
        if (p && title.startsWith(p)) {
           title = title.slice(p.length).trimStart();
        }
     });
   }
   return prefix + " " + title;
}

function parsePrefixMapping(input) {
   const retVal = {};
   input.split(/\r?\n/).forEach(item => {
       const trimmed = item.trim();

       if (!trimmed) {
         return;
       }

       const separatorIndex = trimmed.indexOf("=");
       if (separatorIndex === -1) {
         return;
       }

       const key = trimmed.slice(0, separatorIndex).trim();
       const value = trimmed.slice(separatorIndex + 1).trim();
       if (!key || !value) {
         return;
       }

       retVal[key] = value;
   });
   return retVal;
}

function extractKnownPrefixes(mappings) {
  return Object.keys(mappings).map(function(key){
      return mappings[key];
  }).filter(Boolean);
}

module.exports = { correctTitle, parsePrefixMapping, extractKnownPrefixes };
