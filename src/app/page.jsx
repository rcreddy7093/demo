"use client";

import { useEffect, useState } from "react";
import styles from "./Slider.module.css";

export default function WelcomePage() {
  const [data, setData] = useState({});
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/home");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.adds && data.adds.length > 0) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % data.adds.length);
      }, data.addsRotatingTime);

      return () => clearInterval(interval);
    }
  }, [data.adds]);

  const handleDotClick = (index) => {
    setCurrentAdIndex(index);
  };

  return (
    <div>
      <p className={styles.bold}>{data.description}</p>
      {/* adds */}
      {data.adds && data.adds.length > 0 && (
        <div>
          <div key={currentAdIndex} className={styles.adContainer}>
            <div className="bold">{data.adds[currentAdIndex].name}</div>
            <img
              src={data.adds[currentAdIndex].img}
              alt={data.adds[currentAdIndex].name}
              className={styles.adImage}
            />
            <div>{data.adds[currentAdIndex].description}</div>
          </div>

          {/* Dots for navigation */}
          <div className={styles.dotsContainer}>
            {data.adds.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${index === currentAdIndex ? styles.activeDot : ""
                  }`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </div>
      )}
      {/* Events */}
      {data.events && data.events.length > 0 && (
        <div>
          {data.events.map((event) => (
            <div key={event.id} className={styles.adContainer}>
              <div className="bold">{event.name}</div>
              <img
                src={event.img}
                alt={event.name}
                className={styles.adImage}
              />
              <div>{event.description}</div>
              {event.subEvents && event.subEvents.length > 0 && (
                <div className={styles.subEventsContainer}>
                  {event.subEvents.map((subEvent) => (
                    <div key={subEvent.id} className={styles.subEvent}>
                      <div>{subEvent.name}</div>
                      {subEvent.img && (
                        <img
                          src={subEvent.img}
                          alt={subEvent.name}
                          className={styles.subEventImage}
                        />
                      )}
                      <div>{subEvent.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}



    </div>
  );
}
