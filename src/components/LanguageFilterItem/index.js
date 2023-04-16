// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {clickTabItem, languageDetails, isActive} = props
  const {language, id} = languageDetails

  const onClickButton = () => {
    clickTabItem(id)
  }
  const activeTabStyling = isActive ? 'active-btn-tab' : ''

  return (
    <li>
      <button
        type="button"
        className={`button ${activeTabStyling}`}
        onClick={onClickButton}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
