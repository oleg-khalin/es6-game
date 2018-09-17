function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function timeToFormed(inputTime) {
	let formedTime = '';

	if (Math.floor(inputTime / 60) > 9)
		formedTime = Math.floor(inputTime / 60);
	else
		formedTime = `0${Math.floor(inputTime / 60)}`;

	if (inputTime % 60 > 9)
		formedTime += `:${inputTime % 60}`;
	else
		formedTime += `:0${inputTime % 60}`;

	return formedTime;
}

class Game {
	constructor() {
		this.time = 30;
		this._sum = 0;
		this._answer = null;
		this.pause = false;
		this.answersInput = document.querySelectorAll('.game-answers-item');
	}
	set answer(value) {
		if (typeof value === 'number')
			this._answer = value;
	}
	get answer() {
		return this._answer;
	}
	set sum(value) {
		if (typeof value === 'number') {
			this._sum = value;
			document.querySelector('.game-controllers-item-value.sum').innerText = this._sum;
		}
	}
	get sum() {
		return this._sum;
	}
	startTimer(seconds) {
		if (this.pause)
			return false;
		else {
			document.querySelector('.game-controllers-item-value.time').innerText = timeToFormed(seconds);
			setTimeout(() => {
				if (seconds > 0) {
					seconds--;
			  	this.startTimer(seconds);
		  	}
		  	else {
		  		for (let ans of this.answersInput) {
						ans.disabled = true;
						if (parseInt(ans.innerText) === this.answer)
							ans.classList.add('success');
						else
							ans.classList.add('error');
					}
					this.sum >= 100 ? this.sum = this.sum - 100 : this.sum = 0;
					setTimeout(() => {
						this.createQuestion();
					}, 2000);
				}
			}, 1000)
		}
	}
	createQuestion() {
		for (let ans of this.answersInput) {
			ans.disabled = false;
			ans.classList.remove('error');
			ans.classList.remove('success');
		}
		this.pause = false;
		this.startTimer(this.time);
		const a = Math.floor(Math.random() * 10),
					b = Math.floor(Math.random() * 10);
		this.answer = a * b;

		const answers = [];
		answers[0] = a * b;
		for(let i = 1; i < this.answersInput.length; i++) {
			if(Math.random() > 0.5)
				answers[i] = a * b + Math.floor(Math.random() * 10)
			else
				answers[i] = a * b - Math.floor(Math.random() * 10);
		}
		shuffle(answers);

		document.querySelector('.game-question').innerText = `${a} * ${b}`;
		for (let index in answers)
			this.answersInput[index].innerText = answers[index];
	}
	isCorrectAnswer(event) {
		for (let ans of this.answersInput) {
			ans.disabled = true;
			if (parseInt(ans.innerText) === this.answer)
				ans.classList.add('success');
			else
				ans.classList.add('error');
		}
		if(parseInt(event.target.innerText) === this.answer) {
			this.sum = this.sum + 100;
		}
		else {
			this.sum >= 100 ? this.sum = this.sum - 100 : this.sum = 0;
		}
		this.pause = true;
		setTimeout(() => {
			this.createQuestion();
		}, 2000);
	}
}


let game = new Game();

// document.querySelector('.game-controllers-item-value.time').innerText = timeToFormed(game.time);
game.createQuestion();

const answs = document.querySelectorAll('.game-answers-item');
for (let answer of answs)
	answer.onclick = (event) => game.isCorrectAnswer(event);