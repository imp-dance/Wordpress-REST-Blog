import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
export const TimeLineElement = ({
  title,
  subTitle,
  children,
  date,
  isWork
}) => {
  return (
    <VerticalTimelineElement
      className={
        isWork
          ? "vertical-timeline-element--work"
          : "vertical-timeline-element--education"
      }
      contentStyle={{ background: "#10101f", color: "#fff" }}
      contentArrowStyle={{
        borderRight: isWork ? "7px solid  #10101f" : "7px solid #191931"
      }}
      date={date}
      iconStyle={{ background: "#10101f", color: "#fff" }}
      icon={<i className="material-icons">{isWork ? "work" : "web"}</i>}
    >
      <h3 className="vertical-timeline-element-title">{title}</h3>
      <h4 className="vertical-timeline-element-subtitle">
        {isWork ? (
          subTitle
        ) : (
          <a href={subTitle} target="_blank" rel="noopener noreferrer">
            {subTitle}
          </a>
        )}
      </h4>
      <p>{children}</p>
    </VerticalTimelineElement>
  );
};

export const ExperienceTimeline = () => {
  return (
    <>
      <h3>Experience timeline</h3>
      <VerticalTimeline layout="1-column">
        <TimeLineElement
          title="Ryfylke Kranservice AS"
          subTitle="https://ryfylkekranservice.no"
          date="2019"
          isWork={false}
        >
          Designed and developed their new website.
        </TimeLineElement>
        <TimeLineElement
          title="Ida by LIGL"
          subTitle="https://ida.ligl.no"
          date="2019"
          isWork={false}
        >
          Released first major version of Ida by LIGL.
        </TimeLineElement>
        <TimeLineElement
          title="LIGL AS"
          subTitle="Legal Tech Developer"
          date="2016 - Present"
          isWork={true}
        >
          Legal document automation using ContractExpress, web development &
          design with React.js
        </TimeLineElement>
        <TimeLineElement
          title="Eirik Underbakke Portfolio"
          subTitle="https://eirik.underbakke.net"
          date="2015"
          isWork={false}
        >
          Web Developer, IT, Cashier
        </TimeLineElement>
        <TimeLineElement
          title="Ryfylke Bok & IT"
          subTitle="https://bok-it.no"
          date="2014"
          isWork={false}
        >
          Developed their website, also did computer repairs & sales.
        </TimeLineElement>
      </VerticalTimeline>
    </>
  );
};
