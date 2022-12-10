import { Notify } from 'notiflix';

function createPromise(position, delay) {
  const promise = new Promise((resolt, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolt({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
const formElement = document.querySelector('.form');
formElement.addEventListener('submit', onSubmit);
function onSubmit(event) {
  event.preventDefault();
  let delay = Number(event.currentTarget.delay.value);
  const amount = Number(event.currentTarget.amount.value);
  const step = Number(event.currentTarget.step.value);
  for (let i = 1; i < amount; i += 1) {
    createPromise(i, delay).then(onSucces).catch(onError);
    delay += step;
  }
}

function onSucces({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);  
}
function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);  
}
