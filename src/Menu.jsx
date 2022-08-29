const Menu = ({ items }) => {
  return (
    <div className="section-center">
      {items.map((menuItem) => {
        const { title, image, description, price, index } = menuItem
        return (
          <article key={index} className="menu-item">
            <img src={image.fields.file.url} alt={title} className="photo" />
            <div className="item-info">
              <header>
                <h3>{title}</h3>
                <h3 className="price">€{price.toFixed(2)}</h3>
              </header>
              <p className="item-text">{description}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
export default Menu
