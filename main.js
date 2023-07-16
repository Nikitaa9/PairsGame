import {Card} from './card.js'

(() => {
  // Переменные
  let count,
      newCard,
      openCards = [],
      numbersArray = [],
      firstCard = null,
      secondCard = null,
      interval,
      second = 60

  // Элементы DOM-дерева
  const gameField = document.getElementById('gameField');
  const timerSec = document.querySelector('.second');

  const input = document.createElement('input');
  input.classList.add('input');
  input.placeholder = 'Введите количество пар карт';

  const button = document.createElement('button');
  button.classList.add('button');
  button.textContent = 'Начать игру';

  gameField.append(input, button);

  // Кнопка запуска игры
  button.addEventListener('click', () => {
    count = input.value
    const evenNumber = count % 2 === 0;
    if (count >= 2 && count <= 10 && evenNumber) {
      startGame(count);
      timer();
    } else {
      input.value = 4;
    }
  })

  // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

  function createNumbersArray(count) {
    for (let i = 1; i <= count; i++) {
      numbersArray.push(i);
      numbersArray.push(i);
    }

    // перемешиваем цифры внутри массива.
    shuffle(numbersArray);
  }

  // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел
  // алгоритм Фишера — Йетса
  function shuffle(arr) {
    let remainingEl = arr.length, currentEl, nextEl;
    // Пока есть элементы для перемешивания
    while (remainingEl) {
      // Взять оставшийся элемент
      nextEl = Math.floor(Math.random() * remainingEl--);
      // И поменять его местами с текущим элементом
      currentEl = arr[remainingEl];
      arr[remainingEl] = arr[nextEl];
      arr[nextEl] = currentEl;
    }
    return arr;
  }

  // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

  // Функция создания карточек и присваивания каждой из них числа из массива произвольных чисел. array - массив чисел.
  function createCard (array) {
    for (let i = 0; i < array.length; i++) {
      newCard = new Card(array[i], openCard)
    }
  }

  // Функция правил открытия карточек
  function openCard(card) {
    if(firstCard != null && secondCard != null) {
      firstCard.open = false
      secondCard.open = false
      firstCard = null
      secondCard = null
    }

    if (firstCard == null) {
      firstCard = card
    } else {
      if (secondCard == null) {
        secondCard = card
      }
    }

    if (firstCard !== null && secondCard !== null) {

      if (firstCard.number == secondCard.number) {
        firstCard.success = true;
        secondCard.success = true;
        firstCard = null;
        secondCard = null;
        openCards.push(firstCard);
        openCards.push(secondCard)
      }
    }
    userWin(openCards, numbersArray)
  }

  // Функция правил выигрыша
  function userWin(openCards, numbersArray) {
    if (openCards.length == numbersArray.length && second > 0) {
      stopTimer();
      setTimeout(()=> {
        if(confirm('Вы победили! Играем ещё?')){
          location.reload()
        }
      }, 200)
    }
  }

  // Таймер игры
  function timer() {
    timerSec.innerHTML = second;

    interval = setInterval(() => {
      if (second > 0) {
        second--;
      } else {
        clearInterval(interval);
        alert('Время закончилось. Вы проиграли :(')
        location.reload()
      }
      timerSec.innerHTML = second;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(interval);
    timerSec.innerHTML = second;
  }

  // Функция запуска игры. count - количество пар.
  function startGame(count) {
    gameField.removeChild(button);
    gameField.removeChild(input);

    createNumbersArray(count)
    createCard(numbersArray)
  }

})();
