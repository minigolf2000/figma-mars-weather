var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { visible: false });
figma.ui.postMessage({ type: 'networkRequest' });
const REGULAR = { family: "Montserrat", style: "Regular" };
const BOLD = { family: "Montserrat", style: "Bold" };
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    yield Promise.all([figma.loadFontAsync(REGULAR), figma.loadFontAsync(BOLD)]);
    const blob = JSON.parse(msg);
    const solKeys = blob.sol_keys;
    const nodes = [];
    for (let i = 0; i < solKeys.length; i++) {
        const solDay = solKeys[i];
        const min = blob[solDay].AT.mn;
        const max = blob[solDay].AT.mx;
        const text = figma.createText();
        text.fontName = REGULAR;
        text.characters = `Sol ${solDay}\n☃️\nHigh: ${max}° C\nLow: ${min}° C`;
        text.setRangeFontSize(0, 7, 18);
        text.setRangeFontName(0, 7, BOLD);
        text.fills = [{
                type: 'SOLID',
                color: { r: 1, g: 1, b: 1 }
            }];
        text.lineHeight = { value: 22, unit: "PIXELS" };
        text.textAlignHorizontal = "CENTER";
        text.textAlignVertical = "CENTER";
        const frame = figma.createFrame();
        text.resize(120, 120);
        frame.resize(120, 120);
        frame.x = figma.viewport.center.x + i * 130;
        frame.y = figma.viewport.center.y;
        frame.backgrounds = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: .8 }];
        figma.currentPage.appendChild(frame);
        frame.appendChild(text);
        nodes.push(frame);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
    figma.closePlugin();
});
