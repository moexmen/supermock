Array.prototype.remove = Array.prototype.remove || function(obj) {
    this.splice($.inArray(obj, this),1);
}