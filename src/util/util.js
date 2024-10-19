
export function isValidUser(userData) {
    const user = {...userData}
    return user.firstName?.length >= 2 && user.lastName?.length >= 2 && user.email?.length > 0
        && user.password?.length >= 10
}

export function generateId(len) {
    return Math.random()
        .toString(32).substring(2, len+2)
}


const exclusions = ['constructor', 'render', 'componentWillMount', 'componentDidMount', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount', 'getDerivedStateFromProps', 'shouldComponentUpdate', 'getSnapshotBeforeUpdate', 'setState', 'forceUpdate', 'getDerivedStateFromError', 'componentDidCatch']

export function bindAllNonReactPrototypeMethods(component) {
    const componentPrototype = Object.getPrototypeOf(component)
    const prototypeProperties = Object.getOwnPropertyNames(componentPrototype)
    prototypeProperties.filter(property => !exclusions.includes(property)).forEach(property => {
        const prototypePropertyValue = componentPrototype[property]
        if(prototypePropertyValue instanceof Object && typeof prototypePropertyValue === 'function' ) {
            component[property] = prototypePropertyValue.bind(component)
        }
    })
}

const FILTER_MAP = {
    'Teams': 'teamAbbrevs',
    'Shoots': 'shootsCatches',
    'Position': 'positionCodes'
}
export function playerMeetsFilterConditions(player, filterCategories, title) {
    const category = filterCategories.find(fltrCat => fltrCat.title === title)
    if(!category) {
        return true
    }

    const filters = category.filters
    const filterValues = filters.map(fltr => fltr.value)

    return player[FILTER_MAP[title]].some(pfield => filterValues.includes(pfield))
}

export const NAVIGATION_PATHS = {
    GAME_CENTER: "/nhl-game-center",
    ABOUT: "/about",
    PROFILE: "/profile"
}

export const POSTION_CODES = {
    "R": "Right Wing",
    "L": "Left Wing",
    "C": "Center",
    "D": "Defense"
}

export const SHOOTS_CATCHES_CODES = {
    "L": "Left",
    "R": "Right"
}
