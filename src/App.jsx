import { useEffect, useState } from 'react'
import Categories from './Categories'
import Menu from './Menu'
import useContentful from './useContentful'

function App() {
  const { getMenuItems } = useContentful()

  const [menuItems, setMenuItems] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredMenuItems, setFilteredMenuItems] = useState([])

  useEffect(() => {
    getMenuItems().then((response) => {
      const allCategories = [
        '00-all',
        ...new Set(response.map((item) => item.category)),
      ]
      const sortedItems = response.sort((a, b) =>
        a.category.localeCompare(b.category)
      )

      setMenuItems(sortedItems)
      setFilteredMenuItems(sortedItems)
      setCategories(allCategories)
    })
  }, [])

  const sortedCategories = categories.sort()

  const filterItems = (category) => {
    if (category === '00-all') {
      setMenuItems(filteredMenuItems)
      return
    }
    const newItems = filteredMenuItems.filter(
      (item) => item.category === category
    )
    setMenuItems(newItems)
  }

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <p>Original, famous (no, not that Ray)...</p>
          <h1>🍕 Ray's Pizza 🍕</h1>
          <div className="underline"></div>
        </div>
        <Categories filterItems={filterItems} categories={sortedCategories} />
        <Menu items={menuItems} />
      </section>
    </main>
  )
}

export default App
