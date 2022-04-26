import './index.scss'
import * as echarts from 'echarts'
import svgMapContainer from './map-container.svg'
import svgMap from './map.svg'
import { createNamespacedHelpers } from 'vuex'
import { Spin } from 'ant-design-vue'
import axios from 'axios'

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('forExample')

export default {
  data() {
    return {
      $_mapInstance: '',
      isPaused: false,
      option: {
        tooltip: {
          show: true,
          class: 'tg-map-tooltip',
          formatter: params => {
            return '<div class="tooltip-container">' +
              '<div class="name">' + params.name + '</div>' +
              '<div class="value"><p>暂无数据</p></div>' +
              '</div>'
          }
        },
        geo: [
          {
            map: 'fj',
            z: 3,
            aspectScale: 1,
            zoom: 1.25,
            roam: false,
            label: {
              show: true,
              color: '#ffffff',
              fontSize: 13,
              rotate: -5,
              distance: 10,
              textShadowColor: '#2b50f2',
              textShadowBlur: 5,
              textShadowOffsetX: 5,
              textShadowOffsetY: 3,
              shadowColor: '#2b50f2',
              shadowBlur: 5,
              shadowOffsetX: 5,
              shadowOffsetY: 3,
              textBorderColor: '#2b50f2',
              textBorderWidth: 1
            },
            itemStyle: {
              areaColor: 'none',
              borderColor: '#7ccdfe',
              borderWidth: 1
            },
            emphasis: {
              label: {
                show: true,
                color: '#ffffff'
              },
              itemStyle: {
                areaColor: '#e2e9a0',
                borderColor: '#acffff',
                borderWidth: 1
              }
            },
            select: {
              label: {
                show: true,
                color: '#ffffff'
              },
              itemStyle: {
                areaColor: '#e2e9a0',
                borderColor: '#acffff',
                borderWidth: 3
              }
            },
            regions: [
              { name: '汾河镇', label: { offset: [0, 18] } },
              { name: '红土乡', label: { offset: [10, 20] } },
              { name: '公平镇', label: { offset: [-10, -10] } },
              { name: '大树镇', label: { offset: [10, 10] } },
              { name: '康乐镇', label: { offset: [0, 20] } },
              { name: '白帝镇', label: { offset: [0, -8] } },
              { name: '康坪乡', label: { offset: [0, 10] } },
              { name: '石岗乡', label: { offset: [15, 10] } },
              { name: '新民镇', label: { offset: [0, -15] } },
              { name: '安坪镇', label: { offset: [-10, 0] } },
              { name: '冯坪乡', label: { offset: [20, 0] } },
              { name: '青龙镇', label: { offset: [10, 0] } },
              { name: '夔州街道', label: { offset: [-5, 0], fontSize: 10 } },
              { name: '夔门街道', label: { offset: [-5, -5], fontSize: 10 } },
              { name: '鱼复街道', label: { offset: [5, -8], fontSize: 10 } },
              { name: '永安街道', label: { offset: [0, 10], fontSize: 10 } },
              { name: '长安土家族乡', label: { offset: [10, 0] } },
              { name: '龙桥土家族乡', label: { offset: [0, -20] } }
            ]
          },
          {
            map: 'fjContainer',
            silent: true,
            tooltip: {
              show: false
            },
            z: 1,
            aspectScale: 1,
            zoom: 1.25,
            roam: false,
            label: {
              show: false
            },
            itemStyle: {
              areaColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0, color: '#166af2'
                  }, {
                    offset: 1, color: '#63b4fc'
                  }
                ],
                global: false // 缺省为 false
              },
              borderColor: 'none',
              borderWidth: 0,
              shadowColor: '#2961fd',
              shadowBlur: 5,
              shadowOffsetX: 10,
              shadowOffsetY: 2
            },
            emphasis: {
              label: {
                show: false
              },
              itemStyle: {
                areaColor: 'none',
                borderColor: 'none',
                borderWidth: 0
              }
            }
          }
        ],
        series: [
          {
            type: 'map',
            z: 2,
            geoIndex: 0
          }
        ]
      },
      loading: false
    }
  },
  computed: {
    ...mapState({ map: 'map', adcode: 'districtId' })
  },
  watch: {
    map(value) {
      if (value.length) {
        this.option.series[0].data = value.map(item => ({
          name: item.name,
          value: item.dataList,
          selected: item.id === this.adcode,
          adcode: item.id,
          tooltip: {
            formatter: params => {
              return '<div class="tooltip-container"><div class="name">' + params.name + '</div>' + (params.data.value.reduce((domStr, item) => {
                const count = item.count.toLocaleString()
                return domStr += '<div class="value"><span>' + item.name + '</span><span>' + count + '</span></div>'
              }, '') || '<div class="value"><p>暂无数据</p></div>') + '</div>'
            }
          }
        }))

        this.$_mapInstance.setOption(this.option)
        this.$_mapInstance.on('click', this.onMapClick)
        this.$_mapInstance.on('mouseover', this.onMapMouseOver)
        this.$_mapInstance.on('mouseout', this.onMapMouseOut)
      }
    }
  },
  async created() {
    await this.getData()
  },
  async mounted() {
    await this.initMap()
  },
  beforeDestroy() {
    this.$_mapInstance.off('click', this.onMapClick)
    this.$_mapInstance.off('mouseover', this.onMapMouseOver)
    this.$_mapInstance.off('mouseout', this.onMapMouseOut)
  },
  methods: {
    ...mapMutations({ setDistrictId: 'setDistrictId' }),
    ...mapActions({ getMap: 'getMap' }),
    async getData() {
      this.loading = true

      await this.getMap()

      this.loading = false
    },
    async onMapClick(params) {
      // 排除点击到用于增加视觉效果的辅助地图层，如option.geo
      if (params.componentType === 'series') {
        // 判断选中/取消选中地图
        if (this.adcode && this.adcode === params.data.adcode) {
          this.setDistrictId('')
        } else {
          this.setDistrictId(params.data.adcode)
        }
      }
    },
    onMapMouseOver() {
      this.isPaused = true
    },
    onMapMouseOut() {
      this.isPaused = false
    },
    async initMap() {
      this.$_mapInstance = echarts.init(this.$refs.map)

      const svg = await axios(svgMap)
      echarts.registerMap('fj', { svg: svg.data })
      const svgContainer = await axios(svgMapContainer)
      echarts.registerMap('fjContainer', { svg: svgContainer.data })

      this.$_mapInstance.setOption(this.option)
    }
  },
  render() {
    return (
      <Spin
        spinning={this.loading}
        size="large"
      >
        <div class="tg-map">
          <div
            ref="map"
            class={`map-container${this.isPaused ? ' paused' : ''}`}
          />
        </div>
      </Spin>
    )
  }
}
