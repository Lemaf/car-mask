(function() {

	var NumeroCar = function($element, $scope){

		$element[0]
			.onkeypress = this._eventKeypressHandler.bind(this, $element[0], $scope);

	};

	NumeroCar.prototype._execMask = function(value) {

		value = value.replace(/\W|_|\s/g, '').substr(0, 41).toUpperCase();

		return this._getSiglaEstado(value) + this._getCodigoMunicipio(value) + this._getProtocolo(value);
	};

	NumeroCar.prototype._getProtocolo = function(value) {

		var protocolo = value.replace(/^\w{9}/i, '').match(/\w{1,4}/ig);

		return protocolo && value.length > 9  ? '-' + protocolo.join('.') : '';

	};

	NumeroCar.prototype._getCodigoMunicipio = function(value) {

		var codigoMunicipio = value.replace(/^\w{2}/i, '').match(/\d{1,7}/i);

		return codigoMunicipio && value.length > 1 ? '-' + codigoMunicipio.join() : '';

	};

	NumeroCar.prototype._getSiglaEstado = function(value){

		var estado = value.match(/^[a-z]{1,2}/i);

		return estado ? estado.join() : '';
	};

	NumeroCar.prototype._eventKeyupHandler = function(input, $scope, e){

		var c = event.key;

		if (c.match(/\w/)) {

			var startCarretPosition = input.selectionStart,
				endCarretPosition = input.selectionEnd,
				initInputValue = input.value;

			input.value = this._execMask(input.value);

			if(e.ctrlKey && c.match(/v/i)){
				input.setSelectionRange(input.value.length, input.value.length);
			}else if(e.ctrlKey && c.match(/a/i) || endCarretPosition < initInputValue.length){
				input.setSelectionRange(startCarretPosition, endCarretPosition);
			}

			e.preventDefault();

		}

	};

	angular.module('carMask',[])
		.directive("carCodeMask", function () {
			return angular.extend({
				restrict: 'A'
			},{
				require: 'ngModel',
				scope:{model: '=ngModel'}
			}, {
				controller: NumeroCar,
				controllerAs: NumeroCar
			});

		});

})();