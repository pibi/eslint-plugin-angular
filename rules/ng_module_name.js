module.exports = function(context) {

    'use strict';

    function report(node, name, prefix){

        context.report(node, 'The {{module}} module should be prefixed by {{prefix}}', {
            module: name,
            prefix: prefix
        });
    }

    function isArray(node){
        return node !== undefined && node.type === 'ArrayExpression';
    }
    return {

        'CallExpression': function(node) {

            var prefix = context.options[0];
            var callee = node.callee;
            if (callee.type === 'MemberExpression' && callee.property.name === 'module') {
               var name = node.arguments[0].value;

               if(isArray(node.arguments[1]) && name !== undefined && !(name.indexOf(prefix) === 0)){

                    report(node, name, prefix);

                }
            }
        }
    };
};