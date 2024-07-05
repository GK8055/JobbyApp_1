import './index.css'

const SkillCard = props => {
  const {data} = props
  const {imageUrl, name} = data

  return (
    <li className="skill_item_container">
      <img src={imageUrl} alt={name} className="skill_image_size" />
      <p className="skill_desc">{name}</p>
    </li>
  )
}

export default SkillCard
