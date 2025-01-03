import { useState, useEffect, useRef } from "react"
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export function TimePicker({ onChange, id, placeholder, value , ErrorCondition, ErrorCondition2, ErrorText, ErrorText2 }) {

  const parentRef = useRef(null);

  const [hour, setHour] = useState("00")
  const [minute, setMinute] = useState("00")
  const [isOpen, setIsOpen] = useState(false)
  const [userSelectedTime, setUserSelectedTime] = useState(false)

  const [isHourSelectorOpen, setIsHourSelectorOpen] = useState(true);
  const [isMinuteSelectorOpen, setIsMinuteSelectorOpen] = useState(true);

  useEffect(() => {
    const now = new Date()
    if(!value) {
      setHour(now.getHours().toString().padStart(2, "0"))
      setMinute(now.getMinutes().toString().padStart(2, "0"))
      onChange && onChange(`${hour}:${minute}`)
    } else if(value) {
      setHour(value.split(':')[0])
      setMinute(value.split(':')[1])
    }
  }, [])

  useEffect(() => {
    if(!isHourSelectorOpen && !isMinuteSelectorOpen) {
      setIsOpen(false)
    }
  },[isHourSelectorOpen, isMinuteSelectorOpen])


  useEffect(() => {
    !isHourSelectorOpen && !isMinuteSelectorOpen && setUserSelectedTime(true)
  },[isHourSelectorOpen, isMinuteSelectorOpen, setUserSelectedTime])

  const dayTimePeriods = 
  (hour >= 0 && hour < 4) ? "نیمه شب" :
  (hour >= 4 && hour < 12) ? "صبح" :
  (hour >= 12 && hour < 16) ? "ظهر" :
  (hour >= 16 && hour < 20) ? "بعد از ظهر" :
  (hour >= 20 && hour < 24) ? "شب" : "نیمه شب"


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
        className={`flex items-center justify-start w-full px-2 py-3 gap-x-2 text-left font-normal border  rounded-xl  focus:outline-none focus:ring-1 focus:ring-textDefault
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
        style={{boxShadow:'var(--shadow-all)'}}>
          <div className="flex items-center justify-between p-4 gap-x-4">
            <div className="w-full flex flex-col items-center gap-y-1">
              <p>ساعت</p>
              <HourSelect 
                value={hour}
                onChange={(value) => handleTimeChange(value, minute)}
                isHourSelectorOpen={isHourSelectorOpen}
                setIsHourSelectorOpen={setIsHourSelectorOpen}
              />
            </div>
            <div className="w-full flex flex-col items-center gap-y-1">
              <p>دقیقه</p>
              <MinuteSelect 
                value={minute}
                onChange={(value) => handleTimeChange(hour, value)}
                isMinuteSelectorOpen={isMinuteSelectorOpen}
                setIsMinuteSelectorOpen={setIsMinuteSelectorOpen}
              />
            </div>
          </div>
        </div>
      )}
      <label
        onClick={handleLabelClick}
        htmlFor="floatingInput"
        className={`
          absolute right-5 -top-2 px-2 text-textInputDefault
          transition-all duration-300 transform text-xs
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:text-sm
          peer-focus:-translate-y-5 peer-focus:text-xs bg-bgPageMain
        `}
      >
        {placeholder || 'زمان'}
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
        className="absolute z-10 w-full max-h-40 overflow-y-auto border rounded-xl bg-white shadow-lg bg-bgOutputSelectedOption"
        style={{ boxShadow: "var(--shadow-all)" }}
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
          className="absolute z-10 w-full max-h-40 overflow-y-auto border rounded-xl bg-white shadow-lg bg-bgOutputSelectedOption"
          style={{ boxShadow: "var(--shadow-all)" }}
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


