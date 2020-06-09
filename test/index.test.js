import 'jsdom-global/register';
import _ from 'lodash';
import React from 'react';
import ReactTabllist from '../src';
import Enzyme from './enzyme.config';

jest.useFakeTimers();

const mockApp = (props) => {
  const wrapper = Enzyme.mount(<ReactTabllist {...props} />);

  return { props, wrapper };
};

const { wrapper } = mockApp({});

it('exports modules correctly', () => {
  expect(ReactTabllist).toMatchSnapshot();
});

describe('# test className', function() {
  it('use default className', function() {
    expect(wrapper.find('.list').getDOMNode().className).toBe('list list-no-spacing');
  });

  it('add className', function() {
    wrapper.setProps({ className: 'testClassName' });
    expect(wrapper.find('.list').getDOMNode().className).toBe('list list-no-spacing testClassName');
  });
});

describe('# test data', () => {
  it('data is null', () => {
    wrapper.setProps({ data: [] });
    expect(wrapper.find('.list-header .list-cell').length).toBe(0);
  });

  it('only title', () => {
    wrapper.setProps({ data: [['t1', 't2', 't3', 't4', 't5']] });
    expect(wrapper.find('.list-body .list-cont').at(0).children().length).toBe(0);
    expect(wrapper.find('.list-header .list-cell').length).toBe(5);
  });

  it('1 row and 2 column', () => {
    wrapper.setProps({ data: [['t1', 't2'], ['c1', 'c2']] });
    expect(wrapper.find('.list-header .list-cell')).toHaveLength(2);
    expect(wrapper.find('.list-body').childAt(0).find('.list-row')).toHaveLength(1);
  });
});

describe('# change property', () => {
  describe('## global border', function() {
    it('use default border', function() {
      expect(wrapper.find('.list').getDOMNode().style.border).toBe('1px solid #f4f4f4');
    });

    it('change border color', function() {
      wrapper.setProps({ property: { border: { borderColor: '#ededed' } } });
      expect(wrapper.find('.list').getDOMNode().style.border).toBe('1px solid #ededed');
    });

    it('change border style', function() {
      wrapper.setProps({ property: { border: { borderStyle: 'dotted' } } });
      expect(wrapper.find('.list').getDOMNode().style.border).toBe('1px dotted #f4f4f4');
      expect(
        wrapper.find('.list .list-body .list-cont').at(0)
          .find('.list-row').at(0)
          .find('.list-cell').at(0)
          .getDOMNode().style.border
      ).toBe('1px dotted #f4f4f4');
    });

    it('change border width', () => {
      wrapper.setProps({ property: { border: { borderWidth: 2 } } });
      expect(wrapper.find('.list').getDOMNode().style.borderWidth).toBe('2px');
    });
  });

  it('change style of container ', function() {
    expect(wrapper.find('.list').getDOMNode().style.height).toBe('300px');

    wrapper.setProps({
      property: {
        style: {
          width: 500,
          height: 500,
          margin: '100px'
        }
      }
    });

    const { width, height, margin } = wrapper.find('.list').getDOMNode().style;

    expect(height).toBe('500px');
    expect(width).toBe('500px');
    expect(margin).toBe('100px');
  });

  // behaviours dependent on rendered element sizes cannot be tested with jest/enzyme/jsdom.
  // https://github.com/airbnb/enzyme/issues/1435#issuecomment-357130838
  // 这里仅仅使用spy模拟出几个数据
  describe('## change scroll', () => {
    const data = _.range(20).map(i => {
      return [`t-${i}-1`, `t-${i}-2`, `t-${i}-3`];
    });

    jest
      .spyOn(wrapper.find('.list .list-body .list-cont').at(0).getDOMNode(), 'clientHeight', 'get')
      .mockImplementation(() => 500);

    it('close scroll', () => {
      wrapper.setProps({ data, property: { isScroll: false } });
      expect(wrapper.find('.list .list-body').getDOMNode().scrollTop).toBe(0);
    });

    it('open scroll and continuous scrolling', () => {
      jest
        .spyOn(wrapper.find('.list .list-body').getDOMNode(), 'scrollTop', 'get')
        .mockImplementation(() => 200);

      wrapper.setProps({
        property: {
          style: { height: 100 },
          header: { show: false },
          scroll: {
            enable: true,
            speed: 60,
            distance: 2
          }
        }
      });

      jest.advanceTimersByTime(1000);
      expect(wrapper.find('.list .list-body').getDOMNode().scrollTop).toBeGreaterThan(0);
    });

    it('Scroll one row at a time', () => {
      wrapper.setProps({
        property: {
          header: { show: false },
          scroll: {
            enable: true,
            speed: 2000,
            distance: -1
          }
        }
      });

      jest.advanceTimersByTime(10000);
      expect(wrapper.find('.list .list-body').getDOMNode().scrollTop).toBeGreaterThan(0);
    });
  });

  describe('## test header', () => {
    it('not display header', () => {
      wrapper.setProps({
        property: { header: { show: false } }
      });

      expect(wrapper.exists('.list-header')).toEqual(false);
    });

    describe('### display header', () => {
      it('is exists header', () => {
        wrapper.setProps({
          property: { header: { show: true } }
        });

        expect(wrapper.exists('.list-header')).toEqual(true);
      });

      it('use default style of header', () => {
        expect(wrapper.find('.list-header .list-row').getDOMNode().style.height).toBe('40px');
      });

      it('change style', function() {
        wrapper.setProps({
          property: { header: { style: { height: 60, backgroundColor: '#000000' } } }
        });

        const { height, backgroundColor } = wrapper.find('.list-header .list-row').getDOMNode().style;

        expect(height).toBe('60px');
        expect(backgroundColor).toBe('rgb(0, 0, 0)');
      });

      it('change style for cell of header', () => {
        wrapper.setProps({
          property: {
            header: {
              cellStyle: {
                height: 60,
                backgroundColor: '#f4f4f4',
                color: 'red'
              }
            }
          }
        });

        const { color, backgroundColor, height } = wrapper.find('.list-header .list-cell').at(0).getDOMNode().style;

        expect(color).toBe('red');
        expect(backgroundColor).toBe('rgb(244, 244, 244)');
        expect(height).toBe('60px');
      });
    });
  });
});

describe('# test cells of body', () => {
  it('test style', () => {
    wrapper.setProps({
      property: {
        body: {
          cell: {
            style: {
              fontSize: 12,
              minWidth: 80,
              color: 'blue',
              textAlign: 'left',
              border: '1px solid blue',
              width: 'auto'
            },
            iconStyle: {
              width: 24,
              height: 'auto'
            }
          }
        }
      }
    });

    const {
      fontSize,
      minWidth,
      color,
      textAlign,
      borderColor,
      width
    } = wrapper.find('.list-body .list-cont').at(0).find('.list-row').at(0)
      .find('.list-cell').at(2)
      .getDOMNode().style;

    expect(fontSize).toBe('12px');
    expect(minWidth).toBe('80px');
    expect(color).toBe('blue');
    expect(textAlign).toBe('left');
    expect(borderColor).toBe('blue');
    expect(width).toBe('auto');
  });

  it('test width of cell when width value is \'avg\'', function() {
    wrapper.setProps({
      property: {
        body: {
          cell: {
            style: {
              width: 'avg'
            }
          }
        }
      }
    });

    const cells = wrapper.find('.list-body .list-cont').at(0).find('.list-row').at(1);
    const cell1 = cells.find('.list-cell').at(0).getDOMNode().style.width;
    const cell2 = cells.find('.list-cell').at(1).getDOMNode().style.width;

    expect(cell1).toBe(cell2);
  });

  it('test width of cell when width value is \'avg\' and show checkbox and show serial number', function() {
    const wrapperAvg = Enzyme.mount(<ReactTabllist />);
    wrapperAvg.setProps({
      data: [
        ['t1', 't2', 't3', 't4'],
        ['c1', 'c2', 'c3', 'c4'],
        ['c5', 'c6', 'c7', 'c8'],
        ['c9', 'c10', 'c11', 'c12']
      ],
      property: {
        body: {
          row: {
            serialNumber: { show: true },
            rowCheckbox: { show: true }
          },
          cell: {
            style: {
              width: 'avg'
            }
          }
        }
      }
    });

    const cells = wrapperAvg.find('.list-header .list-row');
    const cell1 = cells.find('.list-cell').at(0).getDOMNode().style.width;
    const cell2 = cells.find('.list-cell').at(1).getDOMNode().style.width;

    expect(cell1).toBe(cell2);
  });

  it('test width of cell when type of width value is array', () => {
    wrapper.setProps({
      property: {
        body: {
          cell: {
            style: {
              width: [100, 'x', '300px']
            }
          }
        }
      }
    });

    const cells = wrapper
      .find('.list-body .list-cont').at(0)
      .find('.list-row').at(1)
      .find('.list-cell');

    expect(cells.at(0).getDOMNode().style.width).toBe('100px');
    expect(cells.at(1).getDOMNode().style.width).toBe('auto');
    expect(cells.at(2).getDOMNode().style.width).toBe('300px');
  });

  it('test width of cell when type of width is string', () => {
    wrapper.setProps({
      property: {
        body: {
          cell: {
            style: {
              width: '70,,90,5%'
            }
          }
        }
      }
    });

    const cells = wrapper
      .find('.list-body .list-cont').at(0)
      .find('.list-row').at(0)
      .find('.list-cell');

    expect(cells.at(0).getDOMNode().style.width).toBe('70px');
    expect(cells.at(1).getDOMNode().style.width).toBe('auto');
    expect(cells.at(2).getDOMNode().style.width).toBe('90px');
  });

  it('test width of cell when type of width is number or invalid value', () => {
    wrapper.setProps({
      property: {
        body: {
          cell: {
            style: {
              width: 1
            }
          }
        }
      }
    });

    const cells = wrapper
      .find('.list-body .list-cont').at(1)
      .find('.list-row').at(0)
      .find('.list-cell');

    expect(cells.at(0).getDOMNode().style.width).toBe('auto');
    expect(cells.at(1).getDOMNode().style.width).toBe('auto');
    expect(cells.at(2).getDOMNode().style.width).toBe('auto');

    wrapper.setProps({
      property: {
        body: {
          cell: {
            style: {
              width: 'xxxx'
            }
          }
        }
      }
    });

    expect(cells.at(0).getDOMNode().style.width).toBe('auto');
    expect(cells.at(1).getDOMNode().style.width).toBe('auto');
    expect(cells.at(2).getDOMNode().style.width).toBe('auto');
  });
});

it('test style of body', function() {
  wrapper.setProps({
    property: {
      body: {
        style: {
          backgroundColor: 'blue'
        }
      }
    }
  });

  expect(wrapper.find('.list-body').getDOMNode().style.backgroundColor).toEqual('blue');
});

it('test style of cellOfColumn', function() {
  wrapper.setProps({
    property: {
      body: {
        cellOfColumn: {
          style: [
            { backgroundColor: 'red' },
            { backgroundColor: 'black' },
            { backgroundColor: 'green' }
          ]
        }
      }
    }
  });

  const cells = wrapper.find('.list-body .list-row').at(1).find('.list-cell');
  const cell1 = cells.at(0).getDOMNode().style.backgroundColor;
  const cell2 = cells.at(1).getDOMNode().style.backgroundColor;
  const cell3 = cells.at(2).getDOMNode().style.backgroundColor;

  expect(cell1).toBe('red');
  expect(cell2).toBe('black');
  expect(cell3).toBe('green');
});

describe('# test row of body', () => {
  it('test transition', function() {
    expect(wrapper.find('.list .list-body .list-row').at(0).getDOMNode().className).toBe('list-row list-row-end');

    wrapper.setProps({
      property: {
        body: {
          row: {
            transition: false
          }
        }
      }
    });

    expect(wrapper.find('.list .list-body .list-row').at(0).getDOMNode().className).toBe('list-row');
  });

  it('test spacing', function() {
    const { borderSpacing, borderCollapse } = wrapper.find('.list .list-body .list-cont').at(0).getDOMNode().style;

    expect(borderSpacing).toBe('0px');
    expect(borderCollapse).toBe('collapse');

    // 不带单位
    wrapper.setProps({
      property: {
        body: {
          row: {
            spacing: 10
          }
        }
      }
    });

    const { borderSpacing: borderSpacing1, borderCollapse: borderCollapse1 } = wrapper.find('.list .list-body .list-cont')
      .at(0)
      .getDOMNode().style;

    expect(borderSpacing1).toBe('0 10px');
    expect(borderCollapse1).toBe('separate');

    // 带单位
    wrapper.setProps({
      property: {
        body: {
          row: {
            spacing: '7px'
          }
        }
      }
    });

    const { borderSpacing: borderSpacing2, borderCollapse: borderCollapse2 } = wrapper.find('.list .list-body .list-cont')
      .at(0)
      .getDOMNode().style;

    expect(borderSpacing2).toBe('0 7px');
    expect(borderCollapse2).toBe('separate');
  });

  it('test style of row', () => {
    wrapper.setProps({
      property: {
        body: {
          row: {
            style: {
              height: 60
            }
          }
        }
      }
    });

    expect(
      wrapper
        .find('.list-body .list-row').at(1).getDOMNode().style.height
    ).toBe('60px');
  });

  it('test row serialNumber', () => {
    expect(
      wrapper
        .find('.list-body .list-row').at(1)
        .find('.list-cell').at(0).getDOMNode().style.width
    ).toBe('auto');

    wrapper.setProps({
      property: {
        body: {
          row: {
            serialNumber: {
              show: true,
              columnName: 'test SN',
              formatter: 'test{index}',
              column: 2,
              style: { backgroundColor: 'red' },
              specialStyle: [{}, { backgroundColor: 'blue' }]
            }
          },
          cell: {
            style: {
              width: [, 111]
            }
          }
        }
      }
    });

    // 测试开启行号后的列数是否正确
    expect(wrapper.find('.list-body .list-row').at(0).children()).toHaveLength(4);

    // 测试自定义行号列的名称
    expect(wrapper.find('.list-header .list-cell').at(1).text()).toEqual('test SN');

    // 测试序号是否正确
    expect(
      wrapper
        .find('.list-body .list-row').at(0)
        .find('.list-cell').at(1).text()
    ).toEqual('test1');

    // 测试行号所在单元格的style
    expect(wrapper
      .find('.list-body .list-row').at(0)
      .find('.list-cell').at(1).getDOMNode().style.width
    ).toEqual('111px');

    // 测试行号标签的style
    expect(wrapper
      .find('.list-body .list-row').at(0)
      .find('.list-cell').at(1).childAt(0).getDOMNode().style.backgroundColor
    ).toEqual('red');

    // 测试指定行的行号标签的style
    expect(wrapper
      .find('.list-body .list-row').at(1)
      .find('.list-cell').at(1).childAt(0).getDOMNode().style.backgroundColor
    ).toEqual('blue');
  });

  it('test rowCheckbox', () => {
    wrapper.setProps({
      property: {
        body: {
          row: {
            serialNumber: { show: false },
            rowCheckBox: {
              show: true,
              column: 2,
              style: { backgroundColor: 'blue' },
              specialStyle: [{ backgroundColor: 'red' }]
            }
          },
          cell: {
            style: {
              width: [, 111, 112]
            }
          }
        }
      }
    });

    // 测试开启行选择框后的列数是否正确
    expect(wrapper.find('.list-body .list-row').at(0).children()).toHaveLength(4);

    // 测试开启行选择框后，所在列的索引（关闭row serialNumber）
    expect(wrapper
      .find('.list-header .list-row .list-cell').at(1)
      .find('input[name="rowCheckbox"]')
      .exists()
    ).toEqual(true);

    // 测试选择框所在标签的样式
    expect(wrapper
      .find('.list-body .list-row').at(1)
      .find('.list-cell').at(1)
      .childAt(0)
      .getDOMNode().style.backgroundColor
    ).toBe('blue');

    // 测试指定行选择框所在标签的样式
    expect(wrapper
      .find('.list-body .list-row').at(0)
      .find('.list-cell').at(1)
      .childAt(0)
      .getDOMNode().style.backgroundColor
    ).toBe('red');

    // 测试body内rowCheckbox的事件
    const chk = wrapper
      .find('.list-body .list-row').at(0)
      .find('.list-cell').at(1)
      .find('input');

    const chkNode = chk.getDOMNode();
    chkNode.checked = true;

    chk.simulate('change', { target: chkNode });

    // expect(
    // 	wrapper
    // 		.find('.list-body .list-row').at(0)
    // 		.find('.list-cell').at(1)
    // 		.find('input').getDOMNode().checked
    // ).toEqual(true)

    // 测试header内rowCheckbox的事件
    wrapper
      .find('.list-header .list-row').at(0)
      .find('.list-cell').at(1)
      .find('input').simulate('change');

    // 测试列的优先级（当行号和行选择框的column配置为相同的值时）
    wrapper.setProps({
      property: {
        body: {
          row: {
            serialNumber: { show: true, column: 2 },
            rowCheckbox: { show: true, column: 2 }
          }
        }
      }
    });

    // 测试开启行选择框后的列数是否正确
    expect(wrapper.find('.list-body .list-row').at(0).children()).toHaveLength(5);

    // 测试开启行选择框后，所在列的索引（开启row serialNumber）
    expect(wrapper
      .find('.list-header .list-row .list-cell').at(2)
      .find('input[name="rowCheckbox"]')
      .exists()
    ).toEqual(true);
  });

  it('test specialStyle of row', () => {
    wrapper.setProps({
      property: {
        body: {
          row: {
            style: {
              backgroundColor: 'white'
            },
            specialStyle: [
              { backgroundColor: 'red' },
              {},
              { backgroundColor: 'blue' }
            ]
          }
        }
      }
    });

    const rows = wrapper.find('.list-body .list-row');
    expect(rows.at(0).getDOMNode().style.backgroundColor).toBe('red');
    expect(rows.at(1).getDOMNode().style.backgroundColor).toBe('white');
    expect(rows.at(2).getDOMNode().style.backgroundColor).toBe('blue');
  });

  it('test visual of row', () => {
    wrapper.setProps({
      property: {
        body: {
          row: {
            style: { backgroundColor: 'black' },
            visual: {
              show: true,
              interval: 2,
              style: { backgroundColor: 'green' }
            }
          }
        }
      }
    });

    const rows = wrapper.find('.list-body .list-row');
    expect(rows.at(0).getDOMNode().style.backgroundColor).toBe('black');
    expect(rows.at(1).getDOMNode().style.backgroundColor).toBe('black');
    expect(rows.at(2).getDOMNode().style.backgroundColor).toBe('green');
    expect(rows.at(3).getDOMNode().style.backgroundColor).toBe('green');
  });

  it('test silent of row', () => {
    wrapper.setProps({
      property: {
        body: {
          row: {
            style: {
              backgroundColor: 'purple',
              opacity: 1
            },
            silent: {
              show: false, // false是启用的意思
              style: {
                backgroundColor: 'yellow',
                opacity: 0.5
              }
            }
          }
        }
      }
    });

    const rows = wrapper.find('.list-body .list-row').at(0);

    // 测试触发事件之前的style
    expect(rows.getDOMNode().style.backgroundColor).toBe('purple');
    expect(rows.getDOMNode().style.opacity).toBe('1');

    // 测试行的hover效果，模拟mouseenter事件
    rows.simulate('mouseenter');

    expect(rows.getDOMNode().style.backgroundColor).toBe('yellow');
    expect(rows.getDOMNode().style.opacity).toBe('0.5');

    // 测试行的hover效果，模拟mouseleave事件
    rows.simulate('mouseleave');

    expect(rows.getDOMNode().style.backgroundColor).toBe('purple');
    expect(rows.getDOMNode().style.opacity).toBe('1');
  });
});

describe('# test object unit', function() {
  function testClick(border) {
    wrapper.setProps({
      property: {
        border: border
      }
    });
  }

  it('test type: row', function() {
    wrapper.setProps({
      data: [
        ['t1', 't2', 't3'],
        {
          type: 'row',
          data: 'null',
          event: 'onClick',
          callback: () => {
            testClick({
              borderWidth: 6,
              borderStyle: 'double',
              borderColor: '#000000'
            });
          },
          className: '',
          key: ''
        },
        ['t-2-1', 't-2-2', 't-2-3']
      ]
    });

    const noCellsRow = wrapper.find('.list-body .list-row');

    expect(noCellsRow.at(0).simulate('click'));
    expect(wrapper.find('.list').getDOMNode().style.border).toBe('6px double #000000');

    wrapper.setProps({
      data: [
        ['t1', 't2', 't3'],
        {
          type: 'row',
          cells: ['t-1-1', 't-1-2', 't-1-3'],
          data: 'null',
          event: 'onClick',
          callback: () => {
            testClick({
              borderWidth: 4,
              borderStyle: 'double',
              borderColor: '#000000'
            });
          },
          className: '',
          key: ''
        },
        ['t-2-1', 't-2-2', 't-2-3']
      ]
    });

    const row = wrapper.find('.list-body .list-row');

    expect(row.at(0).simulate('click'));
    expect(wrapper.find('.list').getDOMNode().style.border).toBe('4px double #000000');
  });

  it('test type: button', () => {
    wrapper.setProps({
      data: [
        ['t1', 't2', 't3'],
        [
          {
            type: 'button',
            value: 'click me',
            className: 'test-btn',
            event: 'onClick',
            callback: () => {
              testClick({
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: '#000000'
              });
            }
          },
          'c2',
          'c3'
        ]
      ]
    });

    const button = wrapper.find('.list-body .list-row').at(0)
      .find('.list-cell').at(0);

    expect(button.find('[type="button"]').exists()).toEqual(true);
    button.find('input').simulate('click');
    expect(wrapper.find('.list').getDOMNode().style.border).toBe('2px solid #000000');
  });

  it('test type: img', function() {
    wrapper.setProps({
      data: [
        ['t1', 't2', 't3'],
        [
          {
            type: 'img',
            src: 'http://www.xieyangogo.cn/root/assets/img/web_github_128px.png',
            alt: '',
            text: 'IMG description',
            className: 'test-img',
            key: '',
            value: ''
          },
          'c2',
          'c3'
        ]
      ]
    });

    const link = wrapper.find('.list-body .list-row').at(0)
      .find('.list-cell').at(0);

    expect(link.find('.test-img').exists()).toEqual(true);
    expect(link.find('.test-img').getDOMNode().src)
      .toBe('http://www.xieyangogo.cn/root/assets/img/web_github_128px.png');
    expect(link.find('span').text()).toBe('IMG description');
  });

  it('test type: link', () => {
    wrapper.setProps({
      data: [
        ['t1', 't2', 't3'],
        [
          {
            type: 'link',
            text: 'I am a link, I use the href attribute',
            href: 'https://github.com/oceanxy/react-tabllist',
            className: 'test-link1',
            key: ''
          },
          'c2',
          'c3'
        ]
      ]
    });

    const link = wrapper.find('.list-body .list-row').at(0)
      .find('.list-cell').at(0);

    expect(link.find('.test-link1').exists()).toEqual(true);
    expect(link.find('.test-link1').getDOMNode().href).toEqual('https://github.com/oceanxy/react-tabllist');
    expect(link.find('a').text()).toBe('I am a link, I use the href attribute');
  });

  it('test type: link2', function() {
    wrapper.setProps({
      data: [
        ['t1', 't2', 't3'],
        [
          'c1',
          {
            type: 'link',
            data: 3,
            text: 'I am a link, I use event and callback to implement custom functions',
            className: 'test-link2',
            key: '',
            event: 'onClick',
            callback: (instance, objectUnit) => {
              testClick({
                borderWidth: objectUnit.data
              });
            }
          },
          'c3'
        ]
      ]
    });

    const link = wrapper.find('.list-body .list-row').at(0)
      .find('.list-cell').at(1);

    expect(link.find('.test-link2').exists()).toEqual(true);
    expect(link.find('a').text()).toBe('I am a link, I use event and callback to implement custom functions');
    link.find('a').simulate('click');
    expect(wrapper.find('.list').getDOMNode().style.border).toBe('3px solid #f4f4f4');
  });

  describe('## test type: text', function() {
    it('with default event', function() {
      wrapper.setProps({
        data: [
          ['t1', 't2', 't3'],
          [
            'c1',
            {
              type: 'text',
              text: '我是一个普通文本',
              className: 'test-text',
              callback: () => {
                testClick({
                  borderColor: '#000000'
                });
              }
            },
            'c3'
          ]
        ]
      });

      const text = wrapper.find('.list-body .list-row').at(0)
        .find('.list-cell').at(1);

      expect(text.find('.test-text').exists()).toEqual(true);
      expect(text.find('span').text()).toBe('我是一个普通文本');
      text.find('span').simulate('click');
      expect(wrapper.find('.list').getDOMNode().style.border).toBe('1px solid #000000');
    });

    it('test type: text', function() {
      wrapper.setProps({
        data: [
          ['t1', 't2', 't3'],
          [
            'c1',
            {
              type: 'text',
              text: '我是一个普通文本',
              className: 'test-text',
              event: 'onClick',
              callback: () => {
                testClick({
                  borderColor: '#000000'
                });
              }
            },
            'c3'
          ]
        ]
      });

      const text = wrapper.find('.list-body .list-row').at(0)
        .find('.list-cell').at(1);

      expect(text.find('.test-text').exists()).toEqual(true);
      expect(text.find('span').text()).toBe('我是一个普通文本');
      text.find('span').simulate('click');
      expect(wrapper.find('.list').getDOMNode().style.border).toBe('1px solid #000000');
    });
  });

  describe('## test type: select', function() {
    const handler = jest.fn(() => {});

    const getProps = function() {
      return {
        data: [
          [
            't1',
            't2',
            {
              type: 'select',
              text: '滚动到：',
              data: 123,
              className: '',
              option: [
                {
                  id: '1',
                  label: 'Scroll to the 2nd row',
                  value: 1
                },
                {
                  id: '2',
                  label: 'Scroll to the 5rd row',
                  value: 2
                },
                {
                  id: '3',
                  label: 'Scroll to the 7rd row',
                  value: 3
                }
              ],
              event: 'onChange',
              callback: (instance, objectUnit, event) => {
                const { value } = event.target;
                const { scrollTo, renderData } = instance;
                for(let i = 0, k = renderData; i < k.length; i++) {
                  if(_.isPlainObject(renderData[i]) && parseInt(renderData[i].value) === parseInt(value)) {
                    scrollTo(i - 1);
                    handler();
                    break;
                  }
                }
              }
            }
          ],
          {
            type: 'row',
            data: 0,
            value: 0,
            event: 'onClick',
            callback: (instance, objectUnit, event) => {
              alert('test event of row');
              console.log(instance, objectUnit, event);
            },
            className: 'click-row',
            cells: [
              'row 1; column 1',
              {
                type: 'link',
                text: 'I am a first link',
                className: 'test-link',
                callback: () => console.log('I am a first link')
              },
              {
                type: 'link',
                text: 'I am a second link',
                href: 'https://github.com/oceanxy/react-tabllist',
                className: 'test-link'
              },
              {
                type: 'button',
                value: 'click me',
                className: 'test-btn',
                callback: () => alert('hello react-tabllist')
              }
            ]
          },
          {
            type: 'row',
            data: 1,
            value: 1,
            event: 'onClick',
            callback: (instance, objectUnit, event) => {
              alert('test event of row');
              console.log(instance, objectUnit, event);
            },
            className: 'click-row',
            cells: [
              'row 1; column 1',
              {
                type: 'link',
                text: 'I am a first link',
                className: 'test-link',
                callback: () => console.log('I am a first link')
              },
              {
                type: 'link',
                text: 'I am a second link',
                href: 'https://github.com/oceanxy/react-tabllist',
                className: 'test-link'
              },
              {
                type: 'button',
                value: 'click me',
                className: 'test-btn',
                callback: () => alert('hello react-tabllist')
              }
            ]
          },
          {
            type: 'row',
            data: 2,
            value: 2,
            event: 'onClick',
            callback: (instance, objectUnit, event) => {
              alert('test event of row');
              console.log(instance, objectUnit, event);
            },
            className: 'click-row',
            cells: [
              'row 1; column 1',
              {
                type: 'link',
                text: 'I am a first link',
                className: 'test-link',
                callback: () => console.log('I am a first link')
              },
              {
                type: 'link',
                text: 'I am a second link',
                href: 'https://github.com/oceanxy/react-tabllist',
                className: 'test-link'
              },
              {
                type: 'button',
                value: 'click me',
                className: 'test-btn',
                callback: () => alert('hello react-tabllist')
              }
            ]
          },
          {
            type: 'row',
            data: 3,
            value: 3,
            event: 'onClick',
            callback: (instance, objectUnit, event) => {
              alert('test event of row');
              console.log(instance, objectUnit, event);
            },
            className: 'click-row',
            cells: [
              'row 1; column 1',
              {
                type: 'link',
                text: 'I am a first link',
                className: 'test-link',
                callback: () => console.log('I am a first link')
              },
              {
                type: 'link',
                text: 'I am a second link',
                href: 'https://github.com/oceanxy/react-tabllist',
                className: 'test-link'
              },
              {
                type: 'button',
                value: 'click me',
                className: 'test-btn',
                callback: () => alert('hello react-tabllist')
              }
            ]
          },
          ['c1', 'c2', 'c3']
        ]
      };
    };

    it('Is the display normal', function() {
      wrapper.setProps(getProps());

      const text = wrapper.find('.list-header .list-cell').at(2);

      expect(text.find('span').text()).toBe('滚动到：');
      expect(text.find('select').exists()).toEqual(true);
    });

    describe('### test scroll target value', function() {
      // 模拟滚动主容器的offsetTop值
      jest.spyOn(wrapper.find('.list .list-body').getDOMNode(), 'offsetTop', 'get')
        .mockImplementation(() => 500);

      it('Scroll to the first row', function() {
        wrapper.setProps(getProps());

        wrapper.find('select').simulate('change', { target: { value: 0 } });
        expect(handler).toHaveBeenCalled();
      });

      it('When the scroll target value is less than 0', function() {
        wrapper.setProps(getProps());
        // 模拟body内第二行的offsetTop值
        jest
          .spyOn(wrapper.find('.list .list-body .list-row').at(1).getDOMNode(), 'offsetTop', 'get')
          .mockImplementation(() => 500);

        wrapper.find('select').simulate('change', { target: { value: 1 } });
        expect(handler).toHaveBeenCalled();
      });

      it('When the scroll target value is equal to 0', function() {
        wrapper.setProps(getProps());
        // 模拟body内第三行的offsetTop值
        jest
          .spyOn(wrapper.find('.list .list-body .list-row').at(2).getDOMNode(), 'offsetTop', 'get')
          .mockImplementation(() => 700);

        wrapper.find('select').simulate('change', { target: { value: 2 } });
        expect(handler).toHaveBeenCalled();
      });

      it('When the scroll target value is greater than 0', function() {
        wrapper.setProps(getProps());
        // 模拟body内第四行的offsetTop值
        jest
          .spyOn(wrapper.find('.list .list-body .list-row').at(3).getDOMNode(), 'offsetTop', 'get')
          .mockImplementation(() => 900);

        wrapper.find('select').simulate('change', { target: { value: 3 } });
        jest.runOnlyPendingTimers();
        expect(handler).toHaveBeenCalled();
      });
    });
  });

  describe('## test type: radio', function() {
    it('with default event', () => {
      wrapper.setProps({
        data: [
          ['t1', 't2'],
          [
            {
              type: 'radio',
              name: 'group1',
              text: 'radio group 1-1',
              value: 0,
              className: 'test-radio'
            },
            {
              type: 'radio',
              name: 'group1',
              text: 'radio group 1-2',
              value: 1,
              className: 'test-radio'
            }
          ],
          ['c1', 'c2'],
          [
            [
              {
                type: 'radio',
                name: 'group1',
                text: 'radio group 1-1',
                value: 0,
                className: 'test-radio'
              },
              {
                type: 'radio',
                name: 'group1',
                text: 'radio group 1-2',
                value: 1,
                className: 'test-radio'
              }
            ],
            'c4'
          ]
        ]
      });

      const radio = wrapper.find('.list-body .list-row').at(0)
        .find('.list-cell').at(0);

      expect(radio.find('input[name="group1-main"]').exists()).toEqual(true);
      expect(radio.find('span').text()).toBe('radio group 1-1');
      radio.find('input').simulate('change');
      // expect(radio.find('input').getDOMNode().checked).toEqual(true)
    });

    it('with custom event', () => {
      wrapper.setProps({
        data: [
          ['t1', 't2'],
          [
            {
              type: 'radio',
              name: 'group1',
              text: 'radio group 1-1',
              value: 0,
              event: 'onMouseEnter',
              className: 'test-radio'
            },
            {
              type: 'radio',
              name: 'group1',
              text: 'radio group 1-2',
              value: 1,
              event: 'onClick',
              className: 'test-radio'
            }
          ],
          ['c1', 'c2'],
          [
            [
              {
                type: 'radio',
                name: 'group1',
                text: 'radio group 1-1',
                value: 0,
                className: 'test-radio'
              },
              {
                type: 'radio',
                name: 'group1',
                text: 'radio group 1-2',
                value: 1,
                className: 'test-radio'
              }
            ],
            'c4'
          ]
        ]
      });

      const radio = wrapper.find('.list-body .list-row').at(0)
        .find('.list-cell').at(0);

      expect(radio.find('input[name="group1-main"]').exists()).toEqual(true);
      expect(radio.find('span').text()).toBe('radio group 1-1');

      radio.find('input').simulate('change');
      // expect(radio.find('input').getDOMNode().checked).toEqual(true)
    });
  });

  it('test type: checkbox', () => {
    wrapper.setProps({
      data: [
        ['t1', 't2'],
        [
          {
            type: 'checkbox',
            name: 'group1',
            text: 'checkbox group 1-1',
            className: 'test-checkbox'
          },
          'c2'
        ]
      ]
    });

    const checkbox = wrapper.find('.list-body .list-cont').at(0)
      .find('.list-row').at(0)
      .find('.list-cell').at(0);

    expect(checkbox.find('input[name="group1"]').exists()).toEqual(true);
    expect(checkbox.find('span').text()).toBe('checkbox group 1-1');

    checkbox.find('input').simulate('change');
  });

  it('test type: input', () => {
    wrapper.setProps({
      data: [
        [
          {
            type: 'input',
            text: 'username',
            placeholder: 'enter username'
          },
          'c2'
        ],
        ['t1', 't2']
      ]
    });

    const input = wrapper.find('.list-header.list-cont').at(0)
      .find('.list-row').at(0)
      .find('.list-cell').at(0);

    expect(input.find('label').exists()).toEqual(true);
    expect(input.find('label').find('span').text()).toBe('username ');
    expect(input.find('label').find('input').prop('placeholder')).toBe('enter username');
  });
});

it('test component hover', function() {
  wrapper.find('.list').simulate('mouseenter');
  wrapper.find('.list').simulate('mouseleave');
});

describe('test document event', function() {
  let hidden = true;
  Object.defineProperty(document, 'hidden', {
    configurable: true,
    get() { return hidden; },
    set(bool) { hidden = Boolean(bool); }
  });

  it('document.hidden is true', function() {
    document.hidden = true;
    document.dispatchEvent(new Event('visibilitychange'));
  });

  it('document.hidden is false', function() {
    document.hidden = false;
    document.dispatchEvent(new Event('visibilitychange'));
  });
});

describe('test lifecycles', function() {
  it('test componentWillUnmount', function() {
    const lifecycleWrapper = Enzyme.mount(<ReactTabllist />);

    lifecycleWrapper.unmount();
  });
});
