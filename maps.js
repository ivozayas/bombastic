const emojis = {
  '-': ' ',
  'O': '🚪',
  'X': '💣',
  'I': '🎁',
  'PLAYER': '💀',
  'BOMB_COLLISION': '🔥',
  'GAME_OVER': '👎',
  'WIN': '🏆',
  'HEART': '❤'
}
  
const maps = []
  
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`)
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
`)
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`)
maps.push(`
  O--XX-XXXX
  XX-X--XXXX
  XX-X----XX
  X----XX--X
  X-XXX--X-X
  X--XXX---X
  XX--XX-XXX
  XXXXX--XXX
  XXX----XXX
  XXI-XXXXXX
`)
maps.push(`
  I-----XX-X
  XX-XX--XXX
  X-XX-X-X--
  X-X--X--XX
  X---XX--XX
  XXX--XX-XX
  XXX-XX---X
  ---XXXXX-X
  -XXXXX---X
  --O----XXX
`)
maps.push(`
  OXXXI-----
  -XX-XXXXX-
  -XXX--XXX-
  -XXXX-----
  -XXXXXXX-X
  -XX------X
  -XX-XXXXXX
  -XX-------
  -XXXXXXXX-
  ----------
`)

const winMap = `
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX
XXXXXXXXXX
`