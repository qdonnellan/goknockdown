function ViewModel() {
    var self = this;
    self.sandboxInput = ko.observable('');
    self.sandboxOutput = ko.computed(function() {
        var input_str = self.sandboxInput();
        var inlineEquations = input_str.match(/\$.*\$/g);
        var e, html, katexHtml, equationPlaceholder, equation;
        if (inlineEquations) {
            for (e in inlineEquations) {
                equationPlaceholder = "::EQUATION-" + e + "::";
                equation = inlineEquations[e];
                input_str = input_str.replace(equation, equationPlaceholder);
            }
        }
        html = markdown.toHTML(input_str);

        if (inlineEquations) {
            for (e in inlineEquations) {
                equationPlaceholder = "::EQUATION-" + e + "::";
                equation = inlineEquations[e];
                console.log(equation);
                equation = self.stripDollarSignsEquation(equation);
                console.log(equation);
                katexHtml = katex.renderToString(equation);
                html = html.replace(equationPlaceholder, katexHtml);
            }
        }

        return html;
    });

    self.stripDollarSignsEquation = function(eqn) {
        return eqn.replace(/\$/g, "");
    };
};


vm = new ViewModel();
ko.applyBindings(vm);


