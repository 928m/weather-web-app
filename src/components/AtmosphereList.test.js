import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AtmosphereList from './AtmosphereList';

configure({ adapter: new Adapter() });

const setUp = () => {
  const props = [
    {
      name: '미세먼지',
      value: 10
    }, {
      name: '초미세먼지',
      value: 10
    }, {
      name: '오존',
      value: 10
    }, {
      name: '이산화질소',
      value: 10
    }
  ];
  const AtmosphereListComponent = shallow(<AtmosphereList atmosphereInfos={props} />);

  return {
    props,
    AtmosphereListComponent
  };
};

describe('AtmosphereList Component Test', () => {
  it('리스트가 제대로 출력된다.', () => {
    const { AtmosphereListComponent } = setUp();

    expect(AtmosphereListComponent.find('li').length).toBe(4);
    expect(AtmosphereListComponent.find('li').first().find('h3').length).toBe(1);
    expect(AtmosphereListComponent.find('li').first().find('.atmosphere-value').length).toBe(1);
  });

  it('props로 받은 배열의 index와 동일한 value를 갖고있다.', () => {
    const { props, AtmosphereListComponent } = setUp();
    const AtmosphereListLength = AtmosphereListComponent.find('li').length;

    for (let i = 0; i < AtmosphereListLength; i++) {
      expect(AtmosphereListComponent.find('li').at(i).find('h3').text()).toBe(props[i].name);
      expect(Number(AtmosphereListComponent.find('li').at(i).find('.atmosphere-value').text())).toBe(props[i].value);
    }
  });
});
