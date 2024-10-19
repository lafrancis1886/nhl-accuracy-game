import React from 'react'
import './css/GameCenter.scss'
import SiteHeader from './SiteHeader'
import Search from './Search'
import PlayerGrid from './PlayerGrid'
import Filter from './Filter'
import FilterCategory from './FilterCategory'
import PlayerCard from './PlayerCard'
import Spinner from './Spinner'
import About from './About'
import Profile from './Profile'
import SiteFooter from './SiteFooter'
import PlayerPage from './PlayerPage'
import { bindAllNonReactPrototypeMethods, playerMeetsFilterConditions, NAVIGATION_PATHS } from './util/util'
import { queryForPlayersOrderedByGoals, queryForFilterData, queryForPlayerWithName, updateUser } from './util/firebase'


export default class GameCenter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: "",
            filterCategories: [],
            players: [],
            showSpinner: false,
            showFiltersBtn: false,
            showFilters: true,
            scrollMode: true,
            navigationPath: "/nhl-game-center",
            user: {id: this.props.user.id, ...this.props.user.data},
            readOnlyMode: true,
            selectedPlayer: undefined
        }
        
        bindAllNonReactPrototypeMethods(this)
    }

    async componentDidMount() {
        const fetchedFilters = await queryForFilterData()
        const amendedFilters = fetchedFilters?.data().filterCategories.map(filterCat => {
            
            filterCat.filters = filterCat.filters.map(filter => {
                return {...filter, isChecked: false, id: filter.label.toLowerCase().replaceAll(/\s+/gi, '-')}
            })

            return filterCat
        })

        this.setState(prevState=> {
            return {
                filterCategories: amendedFilters,
            }
        })

        this.nextToLastPlayerIntersectionCallback = async (entries, observer) => {

            for(let i = 0; i < entries.length; i++) {
                const entry = entries[0]
                const element = entry.target
                if(element.closest('.player-container') && entry.isIntersecting && entry.intersectionRatio > 0.0) {
                    this.setState(prevState => {
                        return {
                            showSpinner: true
                        }
                    })

                    const players = await queryForPlayersOrderedByGoals(this.playerLimit)
                    if(players) {
                        this.playerLimit += 10
                        observer.unobserve(element)
                        const newPlayers = players.map(player => player.data())
                        this.setState(prevState => {
                            return {
                                players: newPlayers,
                                showSpinner: false
                            }
                        })
                    }
                }
            }
        }

        this.nextToLastPlayerIntersectionObserver = new IntersectionObserver(this.nextToLastPlayerIntersectionCallback, {
            "root": null,
            "threshold": 0.0
        })

        this.playerLimit = 10
        const players = await queryForPlayersOrderedByGoals(this.playerLimit)

        if(players) {
            const newPlayers = players.map(player => player.data())
            this.playerLimit = 20
            this.setState(prevState => {
                return {
                    players: newPlayers
                }
            })
        }

        this.handleWindowBreakpoints = (event) => {
            if(event.target.outerWidth > 600 && this.state.showFiltersBtn) {
                this.setState(prevState => {
                    return {
                        showFiltersBtn: false,
                        showFilters: true
                    }
                })
            } else if(event.target.outerWidth <= 600 && !this.state.showFiltersBtn) {
                this.setState(prevState => {
                    return {
                        showFiltersBtn: true,
                        showFilters: false
                    }
                })
            }
        }

        window.addEventListener('resize', this.handleWindowBreakpoints)
    }

    componentWillUnmount() {
        this.nextToLastPlayerIntersectionObserver?.disconnect()
        window.removeEventListener('resize', this.handleWindowBreakpoints)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(history.state.pathname !== this.state.navigationPath) {
            this.setState(prevState => {
                return {
                    navigationPath: history.state.pathname
                }
            })
        }
    }

    handleShowFilters(event) {
        this.setState(prevState => {
            return {
                showFilters: !prevState.showFilters
            }
        })
    }

    async handleSearchSubmit(event) {
        if(event.target.playerSearch) {
            const value = event.target.playerSearch.value?.trim()
            if(value) {
                const foundPlayers = await queryForPlayerWithName(value)
                if(foundPlayers) {
                    this.setState(prevState => {
                        return {
                            players: foundPlayers,
                            scrollMode: false
                        }
                    })
                }
            } else {
                this.playerLimit = 10
                const players = await queryForPlayersOrderedByGoals(this.playerLimit)
                if(players) {
                    const newPlayers = players.map(player => player.data())
                    this.playerLimit = 20
                    this.setState(prevState => {
                        return {
                            players: newPlayers,
                            scrollMode: true
                        }
                    })
                }
            }
        }
    }

    handleOnSearchChange(event) {
        const value = event.target.value
        this.setState(prevState => {
            return {
                searchValue: value
            }
        })
    }

    handleFilterChange(event) {
        const category = event.target.dataset.category
        const name = event.target.dataset.id
        
        const cats = [...this.state.filterCategories].map(cat => {
            if(cat.title === category) {
                cat.filters = [...cat.filters].map(filter => {
                    if(filter.id === name) {
                        return {
                            ...filter,
                            isChecked: !filter.isChecked
                        }
                    } else {
                        return filter
                    }
                })
                return cat
            } else {
                return cat;
            }
        })

        this.setState(prevState => {
            return {
                filterCategories: cats
            }
        })
    }

    async handleResetFilterClick(event) {
        this.setState(prevState => {
            return {
                showSpinner: true
            }
        })
        const resetFilters = [...this.state.filterCategories].map(filterCat => {
            filterCat.filters = filterCat.filters.map(filter => {
                return {...filter, isChecked: false}
            })
            return filterCat
        })

        this.playerLimit = 10
        const players = await queryForPlayersOrderedByGoals(this.playerLimit)

        if(players) {
            const newPlayers = players.map(player => player.data())
            this.playerLimit = 20
            this.setState(prevState => {
                return {
                    players: newPlayers,
                    searchValue: "",
                    filterCaegories: resetFilters,
                    scrollMode: true,
                    showSpinner: false
                }
            })
        }
    }

    handleNavigation(event) {
        if(!event.target.closest('a')) {
            return
        }

        if(location.origin !== event.target.origin) {
            return
        }

        event.preventDefault()
        const link = event.target
        const href = new String(link.href)
        let pathname = href.replace(/^http\:\/\/(\w+):?\d{0,4}/i,'')
        const pathNameExists = Object.values(NAVIGATION_PATHS).includes(pathname)
        pathname = pathNameExists ? pathname : NAVIGATION_PATHS.GAME_CENTER

        this.setState(prevState => {
            if(history.state.pathname !== pathname) {
                history.pushState(Object.assign(prevState, {pathname: pathname}), '', link)
            }
            return {
                navigationPath: pathname
            }
        })
    }

    async handleProfileUpdate(event) {
        if(!event.target.closest('form')) {
            return
        }

        event.preventDefault()
        const newData = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            password: event.target.password.value
        }
        const updatedProfile = await updateUser(this.state.user, newData)

        if(updatedProfile) {
            this.setState(prevState => {
                return {
                    user: {id: updatedProfile.id, data: updatedProfile.data()},
                    readOnlyMode: true
                }
            })
        }

    }

    isPlayerPage() {
        return /^\/players\/\d{1,15}/i.test(this.state.navigationPath)
    }

    handlePlayerSelect(event) {
        if(!event.target.closest('a')) {
            return
        }
        const link = event.target.closest('a')

        if(location.origin !== link.origin) {
            return
        }

        event.preventDefault()
        
        const href = new String(link.href)
        let pathname = href.replace(/^http\:\/\/(\w+):?\d{0,4}/i,'')
        const playerId = parseInt(pathname.substring(9, pathname.length))
        const player = [...this.state.players].find(player => player.playerId === playerId)

        this.setState(prevState => {
            if(history.state.pathname !== pathname) {
                history.pushState(Object.assign(prevState, {pathname: pathname, selectedPlayer: player}), '', link)
            }

            return {
                selectedPlayer: player,
                navigationPath: pathname
            }
        })
    }

    render() {

        const filterCategories = this.state.filterCategories.map(cat => {
            return <FilterCategory key={cat.title.toLowerCase()} title={cat.title} filters={cat.filters} onFilterChange={this.handleFilterChange} />
        })

        //careful not to mutate state   
        const selectedFilterCats = []
        this.state.filterCategories.forEach(filterCat => {
            if(filterCat.filters.some(fltr => fltr.isChecked)) {
                const copiedFilterCat = {title: filterCat.title, filters: []}
                filterCat.filters.forEach(f => {
                    if(f.isChecked) {
                        copiedFilterCat.filters.push({...f})
                        selectedFilterCats.push(copiedFilterCat)
                    }
                })
            }
        })
        const players = this.state.players
        .filter(player => {
            const teamFilter = playerMeetsFilterConditions(player, selectedFilterCats, 'Teams')
            const shootsFilter = playerMeetsFilterConditions(player, selectedFilterCats, 'Shoots')
            const positionFilter = playerMeetsFilterConditions(player, selectedFilterCats, 'Position')
            return teamFilter && shootsFilter && positionFilter
        })
        .map((player, index, players) => {
            //How to handle scroll for filters and search; turn off
            if(this.state.scrollMode && players.length > 0 && index === players.length - 1 && this.playerLimit !== 50) {
                return <PlayerCard observe={true} observer={this.nextToLastPlayerIntersectionObserver} key={player.playerId} player={player} onPlayerSelect={this.handlePlayerSelect}/>
            }
            return <PlayerCard observe={false} key={player.playerId} player={player} onPlayerSelect={this.handlePlayerSelect} />
        })

        //filter above here
        const playerCount = players.length

        return <div className="nhl-accuracy-game-container">
                    <SiteHeader onNavigation={this.handleNavigation} currentPage={this.state.navigationPath} onLogOut={this.props.onLogOut} />
                        { this.state.navigationPath === NAVIGATION_PATHS.GAME_CENTER && <Search showFiltersBtn={this.state.showFiltersBtn} isFilterOpen={this.state.showFilters} onSubmit={this.handleSearchSubmit} searchValue={this.state.searchValue} 
                                onSearchChange={this.handleOnSearchChange} onShowFilters={this.handleShowFilters} /> }
                        { this.state.navigationPath === NAVIGATION_PATHS.GAME_CENTER && 
                            <div className="filter-and-grid-container">
                                <div className="filter-and-grid">
                                    { this.state.showFilters && <Filter >
                                        {filterCategories}
                                    </Filter> }
                                    <PlayerGrid count={playerCount} onFilterResetClick={this.handleResetFilterClick}>
                                        {players}
                                    </PlayerGrid> 
                                    {this.state.showSpinner && <Spinner left="48vw" />}
                                </div>
                            </div>
                        }
                    
                        {this.state.navigationPath === NAVIGATION_PATHS.ABOUT && 
                            <About />}
                        {this.state.navigationPath === NAVIGATION_PATHS.PROFILE &&
                            <Profile user={this.state.user} submitUpdate={this.handleProfileUpdate} readOnlyMode={this.state.readOnlyMode} onGoPlay={this.handleNavigation}/>}
                        {this.isPlayerPage() && this.state.selectedPlayer && <PlayerPage player={this.state.selectedPlayer} />}
                        
                        <SiteFooter />
                </div>
    }
}