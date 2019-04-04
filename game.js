// Допишите функцию iter, которая является частью ядра игрового движка и описывает в себе
// логику одного хода

// Алгоритм
// Если здоровье игрока (которого атаковали на предыдущем шаге) меньше или равно 0,
// то добавляем в лог элемент с сообщением вида ${name1} был убит и возвращаем лог.
// Игра закончена.

// В ином случае, берём рандомную карту, вычисляем урон, записываем новое здоровье,
// формируем сообщение формата:

// const message = `Игрок '${name1}' применил '${cardName}'
// против '${name2}' и нанес урон '${damage}'`;
// Формируем элемент лога формата cons(cons(health1, health2), message) и добавляем его в лог.

// Повторяем.

// Подсказки
// Параметр order в функции iter нужен для определения того, какой игрок сейчас атакует.
// Используйте функцию random для выбора карты из колоды.
// Колода карт передаётся в игру через параметр cards.

import { cons, car, cdr, toString as pairToString } from 'hexlet-pairs'; // eslint-disable-line
import { cons as consList, l, random, head, reverse, toString as listToString } from 'hexlet-pairs-data'; // eslint-disable-line

const run = (player1, player2, cards) => {
  const iter = (health1, name1, health2, name2, order, log) => {
    // BEGIN (write your solution here)
    if (health1 <= 0) {
      return consList(cons(cons(health1, health2), `${name1} был убит`), log);
    }
    if (health2 <= 0) {
      return consList(cons(cons(health1, health2), `${name2} был убит`), log);
    } 

    const card = random(cards);
    const cardName = car(card);
    const damage = cdr(card)();

    if (order === 1) {
      log = consList(cons(cons(health1, health2 - damage), `Игрок '${name1}' применил '${cardName}' против '${name2}' и нанес урон '${damage}'`), log);
      return iter(health1, name1, health2 - damage, name2, 2, log);
    } else {
      log = consList(cons(cons(health1 - damage, health2), `Игрок '${name2}' применил '${cardName}' против '${name1}' и нанес урон '${damage}'`), log);
      return iter(health1 - damage, name1, health2, name2, 1, log);
    }
    // END
  };

  const startHealth = 10;
  const logItem = cons(cons(startHealth, startHealth), 'Начинаем бой!');
  return reverse(iter(startHealth, player1, startHealth, player2, 1, l(logItem)));
};

export default cards => (name1, name2) => run(name1, name2, cards);
