import { useState, useEffect, useRef } from "react"
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Cookies from 'js-cookie';
import { useTranslation } from "../../Utilities/context/TranslationContext";

export function TimePicker({ onChange, id, placeholder, value , ErrorCondition, ErrorCondition2, ErrorText, ErrorText2 }) {

  // language and direction
  const culture = Cookies.get('culture');
  const dir = Cookies.get('dir') || 'ltr';
  const { t } = useTranslation();

  const parentRef = useRef(null);

  const [hour, setHour] = useState("00")
  const [minute, setMinute] = useState("00")
  const [isOpen, setIsOpen] = useState(false)
  const [userSelectedTime, setUserSelectedTime] = useState(() => {
    // Initialize from sessionStorage if available, otherwise false
    return sessionStorage.getItem("userSelectedTime") === "true";
  });

  const [isHourSelectorOpen, setIsHourSelectorOpen] = useState(true);
  const [isMinuteSelectorOpen, setIsMinuteSelectorOpen] = useState(true);

  useEffect(() => {
    const now = new Date()
    if(!value) {
      const currentHour = now.getHours().toString().padStart(2, "0");
      const currentMinute = now.getMinutes().toString().padStart(2, "0");
      setHour(currentHour)
      setMinute(currentMinute)
      onChange(`${currentHour}:${currentMinute}`)
    } else if(value) {
      const [newHour, newMinute] = value.split(":");
      setHour(newHour);
      setMinute(newMinute);
      onChange(value);
    }
  }, [value, onChange])

  useEffect(() => {
    if(!isHourSelectorOpen && !isMinuteSelectorOpen) {
      setIsOpen(false)
    }
  },[isHourSelectorOpen, isMinuteSelectorOpen])


  useEffect(() => {
    // Update sessionStorage whenever the userSelectedTime changes
    sessionStorage.setItem("userSelectedTime", userSelectedTime.toString());
  }, [userSelectedTime]);

  useEffect(() => {
    // Change userSelectedTime when both selectors are closed
    if (!isHourSelectorOpen && !isMinuteSelectorOpen) {
      setUserSelectedTime(true);
    }
  }, [isHourSelectorOpen, isMinuteSelectorOpen]);

  const dayTimePeriods = 
  culture === 'fa' ?
    (hour >= 0 && hour < 5) ? "بامداد" :
    (hour >= 5 && hour < 11) ? "صبح" :
    (hour >= 11 && hour < 15) ? "ظهر" :
    (hour >= 15 && hour < 19) ? "بعد از ظهر" :
    (hour >= 19 && hour < 24) && "شب"
  :
    (hour >= 0 && hour < 12) ? "AM" 
    :
    "PM"


  const handleTimeChange = (newHour, newMinute) => {
    setHour(newHour) // Updates the state
    setMinute(newMinute) // Updates the state
    if (onChange) {
      onChange(`${newHour}:${newMinute}`) // Calls the callback
    }
  }

  const handleOpen = (e) => {

    e.preventDefault()

    setIsMinuteSelectorOpen(true)
    setIsHourSelectorOpen(true)
    setIsOpen(!isOpen)
  }

  const handleLabelClick = () => {
    // Focus the input field when the label is clicked
    document.getElementById(id).focus();
  };


  // using clickOutside ref
  const handleClickOutside = (event) => {
    if (parentRef.current && !parentRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);


  return (
    <div 
    className="relative w-full"
    ref={parentRef}
    >
      <button
        className={`flex items-center justify-start w-full px-2 py-3 gap-x-2  font-normal border  rounded-2xl  focus:outline-none focus:ring-1 focus:ring-textDefault
        ${dir === 'ltr' ? 'text-right' : 'text-left'}
        ${(value && userSelectedTime) ? 'border-textAccent' : 'border-borderInputDefault' }`}
        onClick={e => handleOpen(e)}
      >
        <div className="w-full flex gap-x-2 items-center">
          <AccessTimeIcon className="mr-0 h-5 w-5" />
          {value}
        </div>
        <p className="w-20 px-1">{dayTimePeriods}</p>
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-full md:w-[30%] bg-bgOutputSelectedOption rounded-2xl shadow-lg z-[90]"
        style={{boxShadow:'var(--shadow-button-dark)'}}>
          <div className={`flex ${dir === 'ltr' && 'flex-row-reverse'} items-center justify-between p-4 gap-x-4`}>
            <div className="w-full flex flex-col items-center gap-y-1">
              <p>{t("inputs.timeInput.minutes")}</p>
              <MinuteSelect 
                value={minute}
                onChange={(value) => handleTimeChange(hour, value)}
                isMinuteSelectorOpen={isMinuteSelectorOpen}
                setIsMinuteSelectorOpen={setIsMinuteSelectorOpen}
              />
            </div>
            <div className="w-full flex flex-col items-center gap-y-1">
              <p>{t("inputs.timeInput.hour")}</p>
              <HourSelect 
                value={hour}
                onChange={(value) => handleTimeChange(value, minute)}
                isHourSelectorOpen={isHourSelectorOpen}
                setIsHourSelectorOpen={setIsHourSelectorOpen}
              />
            </div>
          </div>
        </div>
      )}
      <label
        onClick={handleLabelClick}
        htmlFor="floatingInput"
        className={`
          ${dir === 'ltr' ? 'left-5' : 'right-5'}
          absolute -top-2 px-2 text-textInputDefault
          transition-all duration-300 transform text-xs
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:text-sm
          peer-focus:-translate-y-5 peer-focus:text-xs bg-bgPageMain
        `}
      >
        {placeholder || t("inputs.timeInput.time")}
      </label>
    </div>
  )
}

function HourSelect({ value, onChange, isHourSelectorOpen, setIsHourSelectorOpen }) {

  const selectedRef = useRef(null);
  

  const toggleDropdown = (e) =>{
    e.preventDefault()
    setIsHourSelectorOpen(!isHourSelectorOpen)
  };

  const handleOptionClick = (hour) => {
    onChange(hour);
    setIsHourSelectorOpen(false);
  };


  useEffect(() => {
    if (isHourSelectorOpen && selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, [isHourSelectorOpen]);

  return (
    <div className="relative w-full">
      <button
        className="w-full p-2 border border-textAccent text-textAccent rounded-xl bg-bgOutputSelectedOption focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={toggleDropdown}
      >
        {value}
      </button>
      {isHourSelectorOpen && (
        <ul
        className="absolute z-10 w-full max-h-40 overflow-y-auto rounded-xl bg-white shadow-lg bg-bgOutputSelectedOption"
        style={{ boxShadow: "var(--shadow-button-dark)" }}
        >
          {
          Array.from({ length: 24 }, (_, i) => {
            const hourString = i.toString().padStart(2, "0");
            return (
              <li
                key={hourString}
                className={`p-2 hover:bg-gray-200 cursor-pointer ${
                value === hourString ? "mx-6 border border-textAccent rounded-3xl text-textAccent " : ""
                }`}
                ref={value === hourString ? selectedRef : null}
                onClick={() => handleOptionClick(hourString)}
              >
                {hourString}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function MinuteSelect({ value, onChange, isMinuteSelectorOpen, setIsMinuteSelectorOpen }) {
  const selectedRef = useRef(null);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsMinuteSelectorOpen(!isMinuteSelectorOpen);
  };

  const handleOptionClick = (minute) => {
    onChange(minute);
    setIsMinuteSelectorOpen(false);
  };

  useEffect(() => {
    if (isMinuteSelectorOpen && selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "auto",
        block: "center", // Scroll the selected element to the center of the container
      });
    }
  }, [isMinuteSelectorOpen]);

  return (
    <div className="relative w-full">
      <button
        className="w-full p-2 border border-textAccent text-textAccent rounded-xl bg-bgOutputSelectedOption focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={toggleDropdown}
      >
        {value}
      </button>
      {isMinuteSelectorOpen && (
        <ul
          className="absolute z-10 w-full max-h-40 overflow-y-auto rounded-xl bg-white shadow-lg bg-bgOutputSelectedOption"
          style={{ boxShadow: "var(--shadow-button-dark)" }}
        >
          {Array.from({ length: 60 }, (_, i) => {
            const minuteString = i.toString().padStart(2, "0");
            return (
              <li
                key={minuteString}
                className={`p-2 hover:bg-gray-200 cursor-pointer ${
                  value === minuteString
                    ? "mx-6 border border-textAccent rounded-3xl text-textAccent"
                    : ""
                }`}
                ref={value === minuteString ? selectedRef : null}
                onClick={() => handleOptionClick(minuteString)}
              >
                {minuteString}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}


