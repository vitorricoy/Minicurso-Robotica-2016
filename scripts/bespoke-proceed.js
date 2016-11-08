module.exports = function() {
  function getChildNumber(node) {
    return Array.prototype.indexOf.call(node.parentElement.children, node);
  }

  function resolveOperand(operand) {
    var elements = [],
      result = operand;
    switch (typeof operand) {
      case 'string':
        elements = document.querySelectorAll(operand);
        if (elements && elements.length == 1) {
          if (typeof elements[0].value !== 'undefined') {
            result = elements[0].value;
          } else {
            result = elements[0].innerHTML;
          }
        } else {
          result = operand;
        }
        break;
      case 'bool':
      case 'number':
        result = operand;
        break;
      default:
        result = null;
    }
    return result;
  }

  function checkCondition(configEl) {
    var config = JSON.parse(configEl.value);
    var satisfies = false;

    satisfies = config.every(function(current, index) {
      var result;
      switch (current.operation) {
        case 'equal':
          result = current.operands.reduce(function(prev, current) {
            var resolvedOperand = resolveOperand(current);
            return prev == resolveOperand(current) ? resolvedOperand : false;
          }, resolveOperand(current.operands[0]));
        case 'leq':
        case 'geq':
        case 'lt':
        case 'gt':
        case 'nequal':
        break;
      }
      return result;
    });

    return satisfies;
  }

  return function(deck) {

    // gets all conditions
    var conditions = Array.from(document.querySelectorAll('.bespoke-proceed-condition'));

    if (conditions) {
      // turns conditions array into object like:
      // {
      //   25: {
      //     configEl: htmlEl(.bespoke-proceed-condition),
      //     satisfied: false
      //   }
      // }
      conditions = conditions.reduce(function(prev, current, i) {
        var slideEl = current.closest('.bespoke-slide'),
          slideIndex = getChildNumber(slideEl);

        prev[slideIndex] = {
          configEl: current,
          satisfied: false
        };

        return prev;
      }, {});

      // on deck.next event, check if we are in a slide with a condition,
      // check the condition and conditionally prevent proceeding
      deck.on('next', function(e) {
        var conditionForCurrentSlide = conditions[e.index];
        if (conditionForCurrentSlide && !conditionForCurrentSlide.satisfied) {
          conditionForCurrentSlide.satisfied = checkCondition(conditionForCurrentSlide.configEl);

          return conditionForCurrentSlide.satisfied;
        }
      });
    }
  }
}
