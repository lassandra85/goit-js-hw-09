import { Notify } from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
 dataInput: document.querySelector('#datetime-picker'),
 dataStart: document.querySelector('button[data-start]'),
 value: document.querySelector('.value'),
 dataDay: document.querySelector('span[data-days]'),
 dataHours: document.querySelector('span[data-hours]'),
 dataMinutes: document.querySelector('span[data-minutes]'),
 dataSeconds: document.querySelector('span[data-seconds]'),
};

refs.dataStart.disabled = true;
let timerId = null;
let selecteddDate = null;

refs.dataStart.addEventListener('click', onStart);

const options = {
 enableTime: true,
 time_24hr: true,
 defaultDate: Date.now(),
 minuteIncrement: 1,
 onClose(selectedDates) {
 if (selectedDates[0] - options.defaultDate < 0) {
 Notify.warning('Please choose a date in the future');
    } else {
 refs.dataStart.disabled = false;
 selecteddDate = selectedDates[0];
    }
  },
};

function onStart() {
 console.log(selecteddDate);
 if (!selecteddDate) {
 Notify.warning('Please choose a date');
 return;
  }
 refs.dataStart.disabled = true;
 refs.dataInput.disabled = true;
 timerId = setInterval(() => countTime(selecteddDate), 1000);
}

function countTime(date) {
 const diff = date - Date.now();

 const { days, hours, minutes, seconds } = convertMs(diff);
 refs.dataDay.textContent = days;
 refs.dataHours.textContent = hours;
 refs.dataMinutes.textContent = minutes;
 refs.dataSeconds.textContent = seconds;
 if (diff < 1000) {
 refs.dataStart.disabled = false;
 refs.dataInput.disabled = false;
 selecteddDate = null;
 clearInterval(timerId);
 return;
  }
}

flatpickr(refs.dataInput, options);

function convertMs(ms) {
 const second = 1000;
 const minute = second * 60;
 const hour = minute * 60;
 const day = hour * 24;

 const days = Math.floor(ms / day)
    .toString()
    .padStart(2, '0');
 const hours = Math.floor((ms % day) / hour)
    .toString()
    .padStart(2, '0');
 const minutes = Math.floor(((ms % day) % hour) / minute)
    .toString()
    .padStart(2, '0');
 const seconds = Math.floor((((ms % day) % hour) % minute) / second)
    .toString()
    .padStart(2, '0');

 return { days, hours, minutes, seconds };
}       

        
    

          






