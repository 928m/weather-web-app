import React from 'react';

const AtmosphereList = (props) => {
  const { atmosphereInfos } = props;

  return atmosphereInfos.map((item) => (
    <li key={item.name}>
      <h3>{item.name}</h3>
      <span className="atmosphere-value">{item.value}</span>
    </li>
  ));
};

export default AtmosphereList;
