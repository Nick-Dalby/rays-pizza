import { createClient } from 'contentful'

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const environmentId = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT_ID
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN

const useContentful = () => {
  const client = createClient({
    space: spaceId,
    accessToken: accessToken,
    host: 'cdn.contentful.com',
  })

  const getMenuItems = async () => {
    try {
      const entries = await client.getEntries({
        content_type: 'menuItem',
        select: 'fields',
        order: 'fields.positon'
      })

      const sanitizedEntries = entries.items.map((item, index) => {
        return {
          ...item.fields,
          index,
        }
      })

      return sanitizedEntries
    } catch (error) {
      console.log(`Error fetching items ${error}`)
    }
  }

  return { getMenuItems }
}

export default useContentful
