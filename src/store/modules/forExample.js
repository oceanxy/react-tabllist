// for example
// store模块定义

import apis from '@/apis'

export default {
  namespaced: true,
  state: {
    districtId: '',
    weather: {},
    demographics: [],
    populationSexDistribution: [],
    populationAgeDistribution: [],
    householdLabel: [],
    housingType: [],
    medical: {
      total: 0,
      name: '',
      list: []
    },
    education: [],
    householdVisit: {},
    cadreVisitSituation: {},
    visitCompletionRanking: {},
    map: []
  },
  mutations: {
    setDistrictId(state, districtId) {
      state.districtId = districtId
    },
    setWeather(state, weather) {
      state.weather = weather
    },
    setDemographics(state, demographics) {
      state.demographics = demographics
    },
    setPopulationSexDistribution(state, populationSexDistribution) {
      state.populationSexDistribution = populationSexDistribution
    },
    setPopulationAgeDistribution(state, populationAgeDistribution) {
      state.populationAgeDistribution = populationAgeDistribution
    },
    setHouseholdLabel(state, householdLabel) {
      state.householdLabel = householdLabel
    },
    setHousingType(state, housingType) {
      state.housingType = housingType
    },
    setMedical(state, medical) {
      state.medical.total = medical.count
      state.medical.name = medical.name
      state.medical.list = medical.dataList
    },
    setEducation(state, education) {
      state.education = education
    },
    setHouseholdVisit(state, householdVisit) {
      state.householdVisit = householdVisit
    },
    setCadreVisitSituation(state, cadreVisitSituation) {
      state.cadreVisitSituation = cadreVisitSituation
    },
    setVisitCompletionRanking(state, visitCompletionRanking) {
      state.visitCompletionRanking = visitCompletionRanking
    },
    setMap(state, map) {
      state.map = map
    }
  },
  actions: {
    async getWeather({ commit }) {
      const { status, data } = await apis.getWeather()

      if (status) {
        commit('setWeather', data)
      }
    },
    async getDemographics({ commit, state }) {
      const { status, data } = await apis.getDemographics({ districtId: state.districtId })

      if (status) {
        commit('setDemographics', data || [])
      }

      return Promise.resolve(status)
    },
    async getPopulationSexDistribution({ commit, state }) {
      const { status, data } = await apis.getPopulationSexDistribution({ districtId: state.districtId })

      if (status) {
        commit('setPopulationSexDistribution', data || [])
      }

      return Promise.resolve(status)
    },
    async getPopulationAgeDistribution({ commit, state }) {
      const { status, data } = await apis.getPopulationAgeDistribution({ districtId: state.districtId })

      if (status) {
        commit('setPopulationAgeDistribution', data || [])
      }

      return Promise.resolve(status)
    },
    async getHouseholdLabel({ commit, state }) {
      const { status, data } = await apis.getHouseholdLabel({ districtId: state.districtId })

      if (status) {
        commit('setHouseholdLabel', data || [])
      }

      return Promise.resolve(status)
    },
    async getHousingType({ commit, state }) {
      const { status, data } = await apis.getHousingType({ districtId: state.districtId })

      if (status) {
        commit('setHousingType', data || [])
      }

      return Promise.resolve(status)
    },
    async getMedical({ commit, state }) {
      const { status, data } = await apis.getMedical({ districtId: state.districtId })

      if (status) {
        commit('setMedical', data || {})
      }

      return Promise.resolve(status)
    },
    async getEducation({ commit, state }) {
      const { status, data } = await apis.getEducation({ districtId: state.districtId })

      if (status) {
        commit('setEducation', data || [])
      }

      return Promise.resolve(status)
    },
    async getHouseholdVisit({ commit, state }) {
      const { status, data } = await apis.getHouseholdVisit({ districtId: state.districtId })

      if (status) {
        commit('setHouseholdVisit', data || {})
      }

      return Promise.resolve(status)
    },
    async getCadreVisitSituation({ commit, state }) {
      const { status, data } = await apis.getCadreVisitSituation({ districtId: state.districtId })

      if (status) {
        commit('setCadreVisitSituation', data || {})
      }

      return Promise.resolve(status)
    },
    async getVisitCompletionRanking({ commit, state }) {
      const { status, data } = await apis.getVisitCompletionRanking({ districtId: state.districtId })

      if (status) {
        commit('setVisitCompletionRanking', data || {})
      }

      return Promise.resolve(status)
    },
    async getMap({ commit, state }) {
      const { status, data } = await apis.getMap({ districtId: state.districtId })

      if (status) {
        commit('setMap', data || [])
      }

      return Promise.resolve(status)
    }
  }
}
