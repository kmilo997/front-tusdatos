import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'

Vue.use(Vuex)

const state = {
  nameLogin: '',
  passwordLogin: '',
  fullname: '',
  modalEvent: false,
  isEditingEvent: false,
  currentEvent: {
    title: '',
    description: '',
    location: '',
    state: 1,
    user: null,
    resources: [],
    date_start: null,
    date_end: null,
  },
  searcherEvent: '',
  listEvents: [],
  listStates: [],
  listResourcesAvailables: [],
  optionsMenu: [
    {
      text: 'Eventos',
      icon: 'mdi-calendar-search',
      value: 'events',
      roles: ['admin', 'user'],
    },
    {
      text: 'Recursos',
      icon: 'mdi-toolbox',
      value: 'resources',
      roles: ['admin'],
    },
  ],
  selectedMenu: 0,
  listResources: [],
  currentResource: {
    id: 0,
    name: '',
    event: 0,
    url: '',
  },
  modalResource: false,
  isEditingResource: false,
  listEventsToResource: [],
  currentRole: null,
  isLoggedIn: false,
  listUsers: [],
}

const actions = {
  updateNameLogin({ commit }, data) {
    commit('setNameLogin', data)
  },
  updatePasswordLogin({ commit }, data) {
    commit('setPasswordLogin', data)
  },
  updateFullname({ commit }, data) {
    commit('setFullname', data)
  },
  updateValueEvent({ commit }, data) {
    commit('setValueEvent', data)
  },
  updateValueResource({ commit }, data) {
    commit('setValueResource', data)
  },
  cancelEvent({ commit }, data) {
    commit('setCancelEvent', data)
  },
  cancelResource({ commit }, data) {
    commit('setCancelResource', data)
  },
  openModalNewEvent({ commit, dispatch }, data) {
    commit('clearFormEvent')
    commit('setKeyStore', { key: 'modalEvent', value: true })
    commit('setKeyStore', { key: 'isEditingEvent', value: false })
    dispatch('getResources', {
      type_request: 'resources_availables',
    })
  },
  newEvent({ commit, state, dispatch }) {
    const params = state.currentEvent
    params.state = 1
    params.resources = params.resources.map((state) => state.id)
    api
      .post('/events', params)
      .then((response) => {
        commit('setKeyStore', { key: 'modalEvent', value: false })
        commit('clearFormEvent')
        dispatch('getEvents')
      })
      .catch((error) => {
        console.error('Error newEvent:', error)
      })
  },
  newResource({ commit, state, dispatch }) {
    const params = {
      type_request: 'create_resource',
      resource: state.currentResource,
    }
    api
      .post('/resources', params)
      .then((response) => {
        commit('setCancelResource')
        dispatch('getAllResources')
      })
      .catch((error) => {
        console.error('Error getResources:', error)
      })
  },
  updateEvent({ commit, state, dispatch }) {
    const params = state.currentEvent
    params.resources = params.resources.map((resource) => resource.id)
    api
      .put(`/events/${params.id}`, params)
      .then((response) => {
        commit('setKeyStore', { key: 'modalEvent', value: false })
        commit('clearFormEvent')
        dispatch('getEvents')
      })
      .catch((error) => {
        console.error('Error newEvent:', error)
      })
  },
  updateResource({ commit, state, dispatch }) {
    const params = state.currentResource
    api
      .put(`/resources/${params.id}`, params)
      .then((response) => {
        commit('setCancelResource')
        dispatch('getAllResources')
      })
      .catch((error) => {
        console.error('Error newEvent:', error)
      })
  },
  getStates({ commit, dispatch }) {
    api
      .get('/states')
      .then((response) => {
        commit('setKeyStore', { key: 'listStates', value: response.data })
      })
      .catch((error) => {
        console.error('Error newEvent:', error)
      })
  },
  getAllResources({ commit }) {
    api
      .get('/resources')
      .then((response) => {
        commit('setKeyStore', { key: 'listResources', value: response.data })
      })
      .catch((error) => {
        console.error('Error newEvent:', error)
      })
  },
  getEvents({ commit, state }) {
    api
      .get('/events', {
        params: { searcher: state.searcherEvent },
      })
      .then((response) => {
        commit('setKeyStore', { key: 'listEvents', value: response.data })
      })
      .catch((error) => {
        console.error('Error getEvents:', error)
      })
  },
  getEventsToResources({ commit, state }) {
    api
      .get('/events')
      .then((response) => {
        commit('setKeyStore', {
          key: 'listEventsToResource',
          value: response.data,
        })
      })
      .catch((error) => {
        console.error('Error getEvents:', error)
      })
  },
  getResources({ commit }, params = {}) {
    api
      .post('/resources', params)
      .then((response) => {
        commit('setKeyStore', {
          key: 'listResourcesAvailables',
          value: response.data,
        })
      })
      .catch((error) => {
        console.error('Error getResources:', error)
      })
  },
  deleteEvent({ dispatch }, id) {
    api
      .delete(`/events/${id}`)
      .then((response) => {
        dispatch('getEvents')
      })
      .catch((error) => {
        console.error('Error deleteEvent:', error)
      })
  },
  deleteResource({ dispatch }, item) {
    api
      .delete(`/resources/${item.id}`)
      .then((response) => {
        dispatch('getAllResources')
      })
      .catch((error) => {
        console.error('Error deleteResource:', error)
      })
  },
  updateKeyStore({ commit }, data) {
    commit('setKeyStore', data)
  },
  editEvent({ commit, dispatch }, event) {
    api
      .get(`/events/${event.id}`)
      .then((response) => {
        commit('setKeyStore', {
          key: 'currentEvent',
          value: response.data.event,
        })
        const resources = response.data.resources
        commit('setValueEvent', { key: 'resources', value: resources })
      })
      .catch((error) => {
        console.error('Error getEvents:', error)
      })

    dispatch('getResources', {
      type_request: 'resources_availables_to',
      event_id: event.id,
    })

    commit('setKeyStore', { key: 'isEditingEvent', value: true })
    commit('setKeyStore', { key: 'modalEvent', value: true })
  },
  login({ state }) {
    const params = {
      username: state.nameLogin,
      password: state.passwordLogin,
    }
    console.log('params', params)

    api
      .post('/login', params)
      .then((response) => {
        localStorage.setItem('token', response.data.access_token)
      })
      .catch((error) => {
        console.error('Error login:', error)
      })
  },
  logout({ commit }) {
    commit('logout')
  },
  getUsers({ commit }) {
    api
      .get('/users')
      .then((response) => {
        commit('setKeyStore', { key: 'listUsers', value: response.data })
      })
      .catch((error) => {
        console.error('Error getUsers:', error)
      })
  },
}

const mutations = {
  setNameLogin(state, payload) {
    state.nameLogin = payload
  },
  setPasswordLogin(state, payload) {
    state.passwordLogin = payload
  },
  setFullname(state, payload) {
    state.fullname = payload
  },
  setValueEvent(state, payload) {
    state.currentEvent[payload.key] = payload.value
  },
  setValueResource(state, payload) {
    state.currentResource[payload.key] = payload.value
  },
  clearFormEvent(state) {
    state.currentEvent.id = 0
    state.currentEvent.title = ''
    state.currentEvent.description = ''
    state.currentEvent.location = ''
    state.currentEvent.state = 1
    state.currentEvent.user = null
    state.currentEvent.resources = []
    state.currentEvent.date_start = null
    state.currentEvent.date_end = null
  },
  setCancelEvent(state, payload) {
    state.currentEvent.id = 0
    state.currentEvent.title = ''
    state.currentEvent.description = ''
    state.currentEvent.location = ''
    state.modalEvent = false
  },
  setCancelResource(state, payload) {
    state.currentResource.id = 0
    state.currentResource.name = ''
    state.currentResource.event = 0
    state.currentResource.url = ''
    state.modalResource = false
  },
  setKeyStore(state, payload) {
    state[payload.key] = payload.value
  },
  logout(state) {
    localStorage.removeItem('token')
    state.currentRole = null
    state.isLoggedIn = false
  },
}

const getters = {
  currentNameLogin: (state) => {
    return state.nameLogin
  },
  currentPasswordLogin: (state) => {
    return state.passwordLogin
  },
  currentFullname: (state) => {
    return state.fullname
  },
  modalEvent: (state) => {
    return state.modalEvent
  },
  isEditingEvent: (state) => {
    return state.isEditingEvent
  },
  currentEvent: (state) => {
    return state.currentEvent
  },
  searcherEvent: (state) => {
    return state.searcherEvent
  },
  listEvents: (state) => {
    return state.listEvents
  },
  listStates: (state) => {
    return state.listStates
  },
  listResourcesAvailables: (state) => {
    return state.listResourcesAvailables
  },
  optionsMenu: (state) => {
    return state.optionsMenu
  },
  selectedMenu: (state) => {
    return state.selectedMenu
  },
  listResources: (state) => {
    return state.listResources
  },
  modalResource: (state) => {
    return state.modalResource
  },
  isEditingResource: (state) => {
    return state.isEditingResource
  },
  currentResource: (state) => {
    return state.currentResource
  },
  listEventsToResource: (state) => {
    return state.listEventsToResource
  },
  currentRole: (state) => {
    return state.currentRole
  },
  isLoggedIn: (state) => {
    return state.isLoggedIn
  },
  listUsers: (state) => {
    return state.listUsers
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {},
})
