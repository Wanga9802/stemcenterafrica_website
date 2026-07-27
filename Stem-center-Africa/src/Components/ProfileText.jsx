import '../Styles/ProfileText.css'

function parseProfileText(text) {
  if (!text) return []
  const lines = String(text).split('\n')
  const blocks = []
  let currentList = null
  let paragraphBuffer = []

  function flushParagraph() {
    if (paragraphBuffer.length) {
      blocks.push({ type: 'p', text: paragraphBuffer.join(' ') })
      paragraphBuffer = []
    }
  }

  lines.forEach((line) => {
    const trimmed = line.trim()

    if (trimmed.startsWith('### ')) {
      flushParagraph()
      if (currentList) { blocks.push(currentList); currentList = null }
      blocks.push({ type: 'h3', text: trimmed.slice(4).trim() })
    } else if (trimmed.startsWith('- ')) {
      flushParagraph()
      if (!currentList) currentList = { type: 'ul', items: [] }
      currentList.items.push(trimmed.slice(2).trim())
    } else if (trimmed === '') {
      // Blank line = paragraph break (matches the \n\n convention
      // used when bios are migrated from teamData.js into Supabase)
      flushParagraph()
      if (currentList) { blocks.push(currentList); currentList = null }
    } else {
      if (currentList) { blocks.push(currentList); currentList = null }
      paragraphBuffer.push(trimmed)
    }
  })

  flushParagraph()
  if (currentList) blocks.push(currentList)
  return blocks
}

export default function ProfileText({ text }) {
  const blocks = parseProfileText(text)

  if (!blocks.length) return null

  return (
    <div className="profile-text">
      {blocks.map((block, index) => {
        if (block.type === 'h3') {
          return <h3 key={index} className="profile-text__heading">{block.text}</h3>
        }
        if (block.type === 'ul') {
          return (
            <ul key={index} className="profile-text__list">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          )
        }
        return <p key={index} className="profile-text__paragraph">{block.text}</p>
      })}
    </div>
  )
}
