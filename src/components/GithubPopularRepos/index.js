import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    popularReposList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.renderAllPopularGitRepos()
  }

  renderAllPopularGitRepos = async () => {
    this.setState({isLoading: true})

    const {activeTabId} = this.state

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeTabId}`,
    )

    const data = await response.json()
    const fetchedData = data.popular_repos.map(eachRepo => ({
      name: eachRepo.name,
      id: eachRepo.id,
      issuesCount: eachRepo.issues_count,
      forksCount: eachRepo.forks_count,
      starsCount: eachRepo.stars_count,
      avatarUrl: eachRepo.avatar_url,
    }))
    this.setState({popularReposList: fetchedData, isLoading: false})
  }

  clickTabItem = id => {
    this.setState({activeTabId: id}, this.renderAllPopularGitRepos)
  }

  renderSelectedGitRepos = () => {
    const {popularReposList} = this.state
    return (
      <ul className="popular-repos-list">
        {popularReposList.map(repo => (
          <RepositoryItem key={repo.id} repoDetails={repo} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {activeTabId, isLoading} = this.state
    console.log(isLoading)
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="popular-heading">Popular</h1>
          <ul className="languages-list">
            {languageFiltersData.map(eachLanguage => (
              <LanguageFilterItem
                key={eachLanguage.id}
                languageDetails={eachLanguage}
                clickTabItem={this.clickTabItem}
                isActive={activeTabId === eachLanguage.id}
              />
            ))}
          </ul>
          {isLoading ? this.renderLoadingView() : this.renderSelectedGitRepos()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
