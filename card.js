export class Card {

  #open = false
  #success = false

  constructor(number, action) {
    this.card = document.createElement('div');

    this.card.classList.add('card');

    this.card.textContent = number;

    this.number = number;

    this.card.addEventListener('click', () => {
      if (this.#open == false && this.#success == false) {
        this.open = true;
        action(this);
      }
    });

    gameField.append(this.card);
  }

  set open(value) {
    this.#open = value;
    (value) ? this.card.classList.add('open') : this.card.classList.remove('open')
  }

  get open() {
    return this.#open;
  }

  set success(value) {
    this.#success = value;
    (value) ? this.card.classList.add('success') : this.card.classList.remove('success')
  }

  get success() {
    return this.#success;
  }
}
