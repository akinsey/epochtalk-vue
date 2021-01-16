import { provide, inject, reactive, readonly } from 'vue'
import { without, intersection, isEmpty } from 'lodash'
import { useRoute, useRouter } from 'vue-router'

const BREADCRUMBS_KEY = 'breadcrumbs'

export const BreadcrumbStore = Symbol(BREADCRUMBS_KEY)

export default {
  setup() {
    /* Internal Data */
    const $route = useRoute()
    const $router = useRouter()
    const $api = inject('$api')

    // TODO(akinsey): update hapi breadcrumb api routes to not use angular states, then remove this
    const stateToRoute = {
      '^.home': 'Boards',
      '^.boards': 'Boards',
      'threads.data': 'Threads'
    }

    const pathLookup = {
      home: {
        state: '^.home',
        label: 'Home'
      },
      profiles: {
        label: 'Profiles'
      },
      reset: {
        label: 'Reset Password',
        ignoreFollowing: true
      },
      confirm: {
        label: 'Account Confirmation',
        ignoreFollowing: true
      }
    }

    /* Internal Methods */
    const update = async () => {
      breadcrumbs.splice(0, breadcrumbs.length)
      breadcrumbs.push(pathLookup.home)
      let path = $route.path
      let routeParams = $route.params
      // Handle 403 breadcrumb
      if ($route.name === '403' || $route.name ===  '503') return
      // Strip query str params since stateParams includes query and route params together
      delete routeParams.limit
      delete routeParams.page
      delete routeParams.start
      delete routeParams.purged
      delete routeParams.field
      delete routeParams.desc
      delete routeParams.saveScrollPos
      delete routeParams.boardId
      // Maps routeParams key to breadcrumb type
      let keyToType = {
        boardSlug:  'board',
        slug: 'thread',
      }
      // remove anchor hash from params
      let routeParamKeys = without(Object.keys(routeParams), '#')
      let keys = Object.keys(keyToType)
      let matches = intersection(routeParamKeys, keys)
      // matches, route is dynamic
      if (!isEmpty(matches)) {
        let idKey = routeParamKeys.reverse()[0]
        breadcrumbs.push(...await $api(`/api/breadcrumbs?id=${routeParams[idKey]}&type=${keyToType[idKey]}`))
      }
      // routeParams is empty, route is static
      else if (path !== '/') {
        let pathArr = path.split('/')
        // Shifting array by one to eliminate empty index
        pathArr.shift()
        for (let i = 0, len = pathArr.length; i < len; i++)  {
          let id = pathArr[i]
          let crumb = pathLookup[id] || { label: id }
          breadcrumbs.push(crumb)
          // ignore following crumbs if ignoreFollowing is true
          if (crumb.ignoreFollowing) { break }
        }
        // Special case for extended profile pages. Allows link back to user
        // profile from breadcrumbs
        if (breadcrumbs[1].label === pathLookup.profiles.label && breadcrumbs.length > 3) {
          breadcrumbs[2].state = '^.profile.posts'
          breadcrumbs[2].opts = { username: breadcrumbs[2].label }
        }
      }
      if (breadcrumbs) {
        for (let i = 0; i < breadcrumbs.length; i++) {
          breadcrumbs[i].routeName = stateToRoute[breadcrumbs[i].state]
          breadcrumbs[i].label = decodeURIComponent(breadcrumbs[i].label.replace(/%/g, '%25'))
          if (breadcrumbs[i].opts && breadcrumbs[i].opts['#']) {
            breadcrumbs[i].hash = '#' + breadcrumbs[i].opts['#']
            delete breadcrumbs[i].opts['#']
          }
        }
      }
    }

    /* Provided Data */
    const breadcrumbs = reactive([])

    /* Provided Methods */
    const updateLabelInPlace = newLabel => breadcrumbs[breadcrumbs.length - 1].label = newLabel

    /* Route Change - Update breadcrumbs */
    $router.afterEach(() => update())

    /* Provide Store Data */
    return provide(BreadcrumbStore, readonly({ breadcrumbs, updateLabelInPlace }))
  },
  render() { return this.$slots.default() } // renderless component
}