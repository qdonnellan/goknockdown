function ViewModel() {
    var self = this;
    self.sandboxInput = ko.observable('')
    self.sandboxOutput = ko.computed(function() {
        var input_str = self.sandboxInput();
        var links = input_str.match(/\bhttps?[:][\/][\/]\S*\b/g);
        if (links) {
            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                input_str = input_str.replace(link, self.formatLink(link));
            }
        }
        //remove the link placeholder
        input_str = input_str.replace(new RegExp('::LINK::PLACEHOLDER::', 'g'), 'http');
        return markdown.toHTML(input_str);
    });

    self.formatLink = function(link) {
        //add a link placeholder so that we don't replace the same link more than once
        link = link.replace('http', '::LINK::PLACEHOLDER::');
        if (link.match(/\S*[.]png|jpg|bmp|jpeg|tiff|tif|gif|jp2\b/)) {
            return "![" + link + "](" + link + ")";
        }
        else {
            return "[" + link + "](" + link + ")";
        }  
    };
};

// make sure mathjax is called after each new character input
// in the text area; displays math real time
$("#sandbox-textarea").keyup(function () {
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
});

vm = new ViewModel();
ko.applyBindings(vm);


