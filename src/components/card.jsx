import React from "react";


const Card = (props) => {
  const { name, nachalo, kones,days,length,branch,vakt,students} = props;
  return (
    <div >
      <h1>{name}</h1>
      <p>{students}/{students}</p>
      <p>{nachalo}-{kones}</p>
      <p>{days} </p>
      <p>{length} {vakt}</p>
      <h3>{branch}</h3>

    </div>
  );
};

export default Card;
