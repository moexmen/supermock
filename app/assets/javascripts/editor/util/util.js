var Util = {};

Util.uuid = function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

Util.clone_template = function(id) {
    return $(id).clone().attr('id', null).removeClass('hidden');
}

Util.create_random_word = function(length) {
    // credit to http://james.padolsey.com/javascript/random-word-generator/ 
    var consonants = 'bcdfghjklmnpqrstvwxyz'.split('');
    var vowels = 'aeiou'.split('');
    var word = '';

    for (var i=0; i<length/2; i++) {
        var random_consonant = consonants[Math.floor(Math.random() * consonants.length)];
        var random_vowel = vowels[Math.floor(Math.random() * vowels.length)];

        word += random_consonant;
        word += i*2<length-1 ? random_vowel : '';
    }
    word = word.charAt(0).toUpperCase() + word.substring(1);
    return word;
}