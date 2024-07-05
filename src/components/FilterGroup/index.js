import './index.css'

const FilterGroup = props => {
  const {salaryData, employeeData, onCheckBoxClick, onRadioBtnClick} = props
  return (
    <>
      <div className="filter_container">
        <h1 className="heading">Type of Employment</h1>
        <ul className="filter_container">
          {employeeData.map(each => {
            const changeEmployementType = event => {
              onCheckBoxClick(event.target.value)
            }
            return (
              <li
                className="filter_option_container"
                onChange={changeEmployementType}
                key={each.employmentTypeId}
              >
                <input
                  type="checkbox"
                  value={each.employmentTypeId}
                  id={each.employmentTypeId}
                  className="input_check_box"
                />
                <br />
                <label htmlFor={each.employmentTypeId} className="content">
                  {each.label}
                </label>
              </li>
            )
          })}
        </ul>

        <h1 className="heading">Salary Range</h1>
        <ul className="filter_container">
          {salaryData.map(each => {
            const radioBtnClk = event => {
              onRadioBtnClick(event.target.value)
            }
            return (
              <li
                className="filter_option_container"
                key={each.salaryRangeId}
                onClick={radioBtnClk}
              >
                <input
                  type="radio"
                  id={each.salaryRangeId}
                  className="input_check_box"
                  value={each.salaryRangeId}
                />
                <br />
                <label htmlFor={each.salaryRangeId} className="content">
                  {each.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
export default FilterGroup
