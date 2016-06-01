if ((!String.prototype.endsWith) || ((function() { try { return !("ab".endsWith("a",1)); } catch (e) { return true; } } )())) {
  String.prototype.endsWith = function(searchString, position) {
    let subjectString = this.toString();
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
      position = subjectString.length;
    }
    position -= searchString.length;
    let lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
}

if ((!String.prototype.startsWith) || ((function() { try { return !("ab".startsWith("b", 1)); } catch (e) { return true; } } )())) {
  String.prototype.startsWith = function(searchString, position){
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}
