import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// eslint-disable-next-line import/no-duplicates
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
// eslint-disable-next-line import/no-duplicates
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

// eslint-disable-next-line no-undef
library.add(
  faCaretUp,
  faCaretDown
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.use(router)
app.mount('#app')
