import { createStore } from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import getters from './getter'

// Create a new store instance.
export default createStore({
  getters,
  modules: {
    app,
    permission
  }
})
