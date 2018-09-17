'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function shuffle(a) {
	for (var i = a.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var _ref = [a[j], a[i]];
		a[i] = _ref[0];
		a[j] = _ref[1];
	}
	return a;
}

function timeToFormed(inputTime) {
	var formedTime = '';

	if (Math.floor(inputTime / 60) > 9) formedTime = Math.floor(inputTime / 60);else formedTime = '0' + Math.floor(inputTime / 60);

	if (inputTime % 60 > 9) formedTime += ':' + inputTime % 60;else formedTime += ':0' + inputTime % 60;

	return formedTime;
}

var Game = function () {
	function Game() {
		_classCallCheck(this, Game);

		this.time = 30;
		this._sum = 0;
		this._answer = null;
		this.pause = false;
		this.answersInput = document.querySelectorAll('.game-answers-item');
	}

	_createClass(Game, [{
		key: 'startTimer',
		value: function startTimer(seconds) {
			var _this = this;

			if (this.pause) return false;else {
				document.querySelector('.game-controllers-item-value.time').innerText = timeToFormed(seconds);
				setTimeout(function () {
					if (seconds > 0) {
						seconds--;
						_this.startTimer(seconds);
					} else {
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;

						try {
							for (var _iterator = _this.answersInput[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var ans = _step.value;

								ans.disabled = true;
								if (parseInt(ans.innerText) === _this.answer) ans.classList.add('success');else ans.classList.add('error');
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator.return) {
									_iterator.return();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
						}

						_this.sum >= 100 ? _this.sum = _this.sum - 100 : _this.sum = 0;
						setTimeout(function () {
							_this.createQuestion();
						}, 2000);
					}
				}, 1000);
			}
		}
	}, {
		key: 'createQuestion',
		value: function createQuestion() {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.answersInput[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var ans = _step2.value;

					ans.disabled = false;
					ans.classList.remove('error');
					ans.classList.remove('success');
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			this.pause = false;
			this.startTimer(this.time);
			var a = Math.floor(Math.random() * 10),
			    b = Math.floor(Math.random() * 10);
			this.answer = a * b;

			var answers = [];
			answers[0] = a * b;
			for (var i = 1; i < this.answersInput.length; i++) {
				if (Math.random() > 0.5) answers[i] = a * b + Math.floor(Math.random() * 10);else answers[i] = a * b - Math.floor(Math.random() * 10);
			}
			shuffle(answers);

			document.querySelector('.game-question').innerText = a + ' * ' + b;
			for (var index in answers) {
				this.answersInput[index].innerText = answers[index];
			}
		}
	}, {
		key: 'isCorrectAnswer',
		value: function isCorrectAnswer(event) {
			var _this2 = this;

			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.answersInput[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var ans = _step3.value;

					ans.disabled = true;
					if (parseInt(ans.innerText) === this.answer) ans.classList.add('success');else ans.classList.add('error');
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			if (parseInt(event.target.innerText) === this.answer) {
				this.sum = this.sum + 100;
			} else {
				this.sum >= 100 ? this.sum = this.sum - 100 : this.sum = 0;
			}
			this.pause = true;
			setTimeout(function () {
				_this2.createQuestion();
			}, 2000);
		}
	}, {
		key: 'answer',
		set: function set(value) {
			if (typeof value === 'number') this._answer = value;
		},
		get: function get() {
			return this._answer;
		}
	}, {
		key: 'sum',
		set: function set(value) {
			if (typeof value === 'number') {
				this._sum = value;
				document.querySelector('.game-controllers-item-value.sum').innerText = this._sum;
			}
		},
		get: function get() {
			return this._sum;
		}
	}]);

	return Game;
}();

var game = new Game();

// document.querySelector('.game-controllers-item-value.time').innerText = timeToFormed(game.time);
game.createQuestion();

var answs = document.querySelectorAll('.game-answers-item');
var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
	for (var _iterator4 = answs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
		var answer = _step4.value;

		answer.onclick = function (event) {
			return game.isCorrectAnswer(event);
		};
	}
} catch (err) {
	_didIteratorError4 = true;
	_iteratorError4 = err;
} finally {
	try {
		if (!_iteratorNormalCompletion4 && _iterator4.return) {
			_iterator4.return();
		}
	} finally {
		if (_didIteratorError4) {
			throw _iteratorError4;
		}
	}
}