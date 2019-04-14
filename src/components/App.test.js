import React from 'react';
import App from './App';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const day = ['일', '월', '화', '수', '목', '금', '토'];
const setUp = () => {
  const props = {
    weather: {
      id: 0,
      temperature: 0
    },
    city: '',
    date: new Date(),
    atmosphere: [],
    isLoading: false,
    loading: jest.fn(),
    getLocation: jest.fn()
  };
  const AppComponent = shallow(<App {...props} />);

  return {
    props,
    AppComponent
  };
};

describe('test', () => {
  it('초기 loading이 아닐때 wrapper만 있어야 하고 대기정보 리스트는 없어야한다.', () => {
    const { AppComponent } = setUp();

    expect(AppComponent.find('.loading').length).toBe(0);
    expect(AppComponent.find('.wrapper').length).toBe(1);
    expect(AppComponent.find('.dust-area li').length).toBe(0);
  });

  it('loading상태 일때 loading화면이 있어야 한다.', () => {
    const { AppComponent } = setUp();
    AppComponent.setProps({
      weather: {
        id: 0,
        temperature: 0
      },
      city: '',
      date: new Date(),
      atmosphere: [],
      isLoading: true,
      loading: jest.fn(),
      getLocation: jest.fn()
    });

    expect(AppComponent.find('.loading').length).toBe(1);
    expect(AppComponent.find('.wrapper').length).toBe(0);
  });

  it('날씨 및 대기정보 가져왔을때 각각에 맞는 정보를 갖고있어야한다.', () => {
    const props = {
      weather: {
        id: 200,
        temperature: 0
      },
      city: '서울',
      date: new Date(),
      atmosphere: [
        {
          index: 1,
          name: '미세먼지',
          value: 1
        }, {
          index: 2,
          name: '초미세먼지',
          value: 2
        }, {
          index: 3,
          name: '오존',
          value: 3
        }, {
          index: 4,
          name: '이산화질소',
          value: 4
        }
      ],
      isLoading: false,
      loading: jest.fn(),
      getLocation: jest.fn()
    };
    const AppComponent = mount(<App {...props} />);

    expect(AppComponent.find('h1').text()).toBe(props.city);
    expect(AppComponent.find('.date').text()).toBe(`오늘 ${props.date.getMonth() + 1}월 ${props.date.getDate()}일 ${day[props.date.getDay()]}요일`);
    expect(AppComponent.find('.weather-type').text()).toBe('뇌우');
    expect(AppComponent.find('.dust-area li').length).toBe(4);
  });
});
