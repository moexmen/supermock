//= require ./page

var Elements = Elements || {};

Elements.ModalPage = function() {
    Elements.Page.call(this, Util.uuid(), 'Modal', [], null, []);
}

Elements.ModalPage.prototype = Object.create(Elements.Page.prototype);
Elements.ModalPage.prototype.constructor = Elements.ModalPage;
