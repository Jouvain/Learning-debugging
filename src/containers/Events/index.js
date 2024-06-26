import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const filteredEvents = (
    (!type
      ? data?.events
      : data?.events) || []
  ).filter((event) => {
    if (event.type === type || type === null) {
        return true;
    }
    return false;
  }).filter((event, index) => {
    if (
      ((currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index && event.type === type) || ((currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index && type === null)
    )  {
      return true;
    }
    return false;
  });
  const typeList = new Set(data?.events.map((event) => event.type));
  let pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  
  const changeType = (evtType) => {
    
    if (typeof evtType === 'number'){
        setCurrentPage(evtType+1)     
    }
    else {
        pageNumber = 1 ? setCurrentPage(1) : setCurrentPage(currentPage)
        setType(evtType);
    }
    

  };

  
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => changeType(n)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
