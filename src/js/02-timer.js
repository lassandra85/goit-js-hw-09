import { Notify } from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    dataInput : document.querySelector("#datetime-picker"),
    dataStart: document.querySelector("button[data-start]"),
    value: document.querySelector(".value"),
    dataDay : document.querySelector("span[data-days]"),
    dataHours : document.querySelector("span[data-hours]"),
    dataMinutes : document.querySelector("span[data-minutes]"),
    dataSeconds : document.querySelector("span[data-seconds]"),
}

refs.dataStart.disabled = true;
let timerId = null;
/* let diff = null; */
const days = 0;
const hours = 0;
const minutes = 0;
const seconds = 0;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] - options.defaultDate < 0) {
        Notify.warning("Please choose a date in the future");
      } else {
            refs.dataStart.disabled = false; 
            refs.dataStart.addEventListener('click', onStart);

            function onStart() {
                timerId = setInterval(countTime, 1000);
            }

            function countTime() {
                let diff = selectedDates[0] - options.defaultDate;
                if (diff < 1000) {
                    clearInterval(timerId);
                }
                
                const convertDiff = () => convertMs(diff);
                
                refs.dataDay.textContent = convertMs.days;
                refs.dataHours.textContent = convertMs.hours;
                refs.dataMinutes.textContent = convertMs.minutes;
                refs.dataSeconds.textContent = convertMs.seconds;
            
                addLeadingZero(refs.value);
            }
        }
    },
};
          
flatpickr(refs.dataInput, options);

function convertMs() {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    days = Math.floor(diff / day);
     // Remaining hours
    hours = Math.floor((diff % day) / hour);
    // Remaining minutes
    minutes = Math.floor(((diff % day) % hour) / minute);
     // Remaining seconds
    seconds = Math.floor((((diff % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero() {
    if (refs.value.textContent.length < 2) {
    refs.value.textContent.toString().padStart(2, '0')
    } 
    /* if (Number(refs.value.textContent) < 10) {
    refs.value.textContent.toString().padStart(2, '0')
    } */
}