figma.showUI(__html__, { visible: false })
figma.ui.postMessage({ type: 'networkRequest' })

interface Day {
  AT: {
    mn: number,
    mx: number,
  }
}
const REGULAR: FontName = { family: "Montserrat", style: "Regular" }
const BOLD: FontName = { family: "Montserrat", style: "Bold" }

figma.ui.onmessage = async (msg: string) => {
  await Promise.all([figma.loadFontAsync(REGULAR), figma.loadFontAsync(BOLD)])

  const blob = JSON.parse(msg)
  const solKeys: string[] = blob.sol_keys

  const nodes: SceneNode[] = []
  for (let i = 0; i < solKeys.length; i++) {
    const solDay = solKeys[i]
    const min = blob[solDay].AT.mn
    const max = blob[solDay].AT.mx

    const text = figma.createText()
    text.fontName = REGULAR
    text.characters = `Sol ${solDay}\n☃️\nHigh: ${max}° C\nLow: ${min}° C`
    text.setRangeFontSize(0, 7, 18)
    text.setRangeFontName(0, 7, BOLD)

    text.fills = [{
      type: 'SOLID',
      color: {r: 1, g: 1, b: 1}
    }]
    text.lineHeight = {value: 22, unit: "PIXELS"}
    text.textAlignHorizontal = "CENTER"
    text.textAlignVertical = "CENTER"

    const frame = figma.createFrame()
    text.resize(120, 120)
    frame.resize(120, 120)
    frame.x = figma.viewport.center.x + i * 130
    frame.y = figma.viewport.center.y
    frame.backgrounds = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}, opacity: .8}]
    figma.currentPage.appendChild(frame)

    frame.appendChild(text)
    nodes.push(frame)
  }

  figma.currentPage.selection = nodes
  figma.viewport.scrollAndZoomIntoView(nodes)

  figma.closePlugin()
}