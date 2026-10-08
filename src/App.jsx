import React from "react";
import Card from "./components/card";
import Button from "./components/Button";
const App = () => {
  const data = [
    {
      name: ".Net August 2026",
      nachalo: "Aug 5,2026",
      kones: "Dec 5,2026",
      days: "Mn,Tu,Wd,Th,Fr,Sa",
      length:"4month",
      vakt:"16.00-18.00",
      students:"7",
      branch: "Profsoyuz",
    }, {
      name: "JS1",
      nachalo: "Aug 5,2026",
      kones: "Dec 5,2026",
      days: "Mn,Tu,Wd,Th,Fr,Sa",
      length:"4month",
      vakt:"16.00-18.00",
      students:"7",
      branch: "Profsoyuz",
    }, {
      name: "Html and Css",
      nachalo: "Aug 5,2026",
      kones: "Dec 5,2026",
      days: "Mn,Tu,Wd,Th,Fr,Sa",
      length:"4month",
      vakt:"16.00-18.00",
      students:"7",
      branch: "Profsoyuz",
    }, {
      name: "JS 2month",
      nachalo: "Aug 5,2026",
      kones: "Dec 5,2026",
      days: "Mn,Tu,Wd,Th,Fr,Sa",
      length:"4month",
      vakt:"16.00-18.00",
      students:"7",
      branch: "Profsoyuz",
    }, {
      name: "C++",
      nachalo: "Aug 5,2026",
      kones: "Dec 5,2026",
      days: "Mn,Tu,Wd,Th,Fr,Sa",
      length:"4month",
      vakt:"16.00-18.00",
      students:"7",
      branch: "Profsoyuz",
    }, {
      name: "Python",
      nachalo: "Aug 5,2026",
      kones: "Dec 5,2026",
      days: "Mn,Tu,Wd,Th,Fr,Sa",
      length:"4month",
      vakt:"16.00-18.00",
      students:"7",
      branch: "Profsoyuz",
    }, {
      name: "Fluter",
      nachalo: "Aug 5,2026",
      kones: "Dec 5,2026",
      days: "Mn,Tu,Wd,Th,Fr,Sa",
      length:"4month",
      vakt:"16.00-18.00",
      students:"7",
      branch: "Profsoyuz",
    },
  ];

  return (
    <>
      {data.map((e) => {
        return <Card {...e} />;
      })}
    </>
  );
};

export default App;
