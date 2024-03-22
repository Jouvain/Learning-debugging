// import { useEffect, useState } from "react";
import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";


import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  /*
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length-1 ? index + 1 : 0),
      5000, console.log(`TEST-${index}`), 5000, console.log(byDateDesc.length-1), 5000
    );
  };
  */
  
  

  function handleRadio(synthEvent){
    const value = parseInt(synthEvent.currentTarget.value, 10)
    setIndex(value)
    console.log(`click -- ${value}`)
  }
  /*
  useEffect(() => {
    nextCard();
  });
  */
  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img key={`img--${event.id}`} src={event.cover} alt="forum" />
            <div key={`slideContainer--${event.id}`} className="SlideCard__descriptionContainer">
              <div key={`slideDesc--${event.id}`}className="SlideCard__description">
                <h3 key={`title--${event.id}`}>{event.title}</h3>
                <p key={`desc--${event.id}`}>{event.description}</p>
                <div key={`date--${event.id}`}>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          

        
      ))}
      <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
            {byDateDesc?.map((element, radioIdx) => (
                <input
                  key={`buttonRadio--${radioIdx}-${element.id}`}
                  type="radio"
                  name="radio-button"
                  value={radioIdx}
                  onChange={handleRadio}
                  checked={index===radioIdx}
                />))}
            </div>
      </div>
    </div>
  );
};

export default Slider;


/* 
          <div key={`pageContainer--${event.id}`}className="SlideCard__paginationContainer">
            <div key={`pagination--${event.id}`}className="SlideCard__pagination">
              {byDateDesc.map((element, radioIdx) => (
                <input
                  key={`buttonRadio--${radioIdx}-${event.id}`}
                  type="radio"
                  name="radio-button"
                  value={radioIdx}
                  onChange={handleRadio}
                />

                
              ))}
            </div>
          </div>
*/
