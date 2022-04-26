import './assets/styles/index.scss'
import Container from '@/components/Container'
import Property from '@/components/Property'
import Map from '@/views/CommonComponentsDirectory/components/Map'
import AreaChart from '@/views/CommonComponentsDirectory/components/AreaChart'
import ProgressBar from '@/views/CommonComponentsDirectory/components/ProgressBar'
import PieChart from '@/views/CommonComponentsDirectory/components/PieChart'
import HistogramChart from '@/views/CommonComponentsDirectory/components/HistogramChart'
import KeyValuePair from '@/views/CommonComponentsDirectory/components/KeyValuePair'
import KeyValuePair2 from '@/views/CommonComponentsDirectory/components/KeyValuePair2'

export default {
  name: 'CommonComponentsDirectory',
  render() {
    return (
      <section class="tg-comp">
        <Container
          text="地图"
          height={800}
        >
          <Map />
        </Container>
        <Container text="无数据">
          <div class="tg-empty">暂无数据</div>
        </Container>
        <Container
          text={'动态数字'}
          height={162}
          icon="household-visit"
        >
          <Property
            icon={'grid-man'}
            text={'属性名'}
            value={194776}
            color={'#ffcd3e'}
          />
        </Container>
        <Container
          text="区域图"
          height={290}
          icon="visiting-situation"
        >
          <AreaChart />
        </Container>
        <Container
          text={'进度条'}
          height={474}
          icon="visit-ranking"
        >
          <ProgressBar />
        </Container>
        <Container
          text="人口性别分布(男女)"
          icon="gender"
        >
          <PieChart />
        </Container>
        <Container
          text="键值对"
          icon="household-label"
          height={254}
        >
          <KeyValuePair2 />
        </Container>
        <Container
          text="键值对"
          height={254}
          icon="education"
        >
          <KeyValuePair />
        </Container>
        <Container
          text="柱状图"
          icon="medical"
          height={254}
        >
          <HistogramChart />
        </Container>
      </section>
    )
  }
}
