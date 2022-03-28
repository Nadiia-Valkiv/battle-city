import { map, mapLegend } from './constants.js';
function updateMap(column, row, mapLegendMark) {
    map[column][row] = mapLegendMark;
}

function checkIsNotUndefined(parameter) {
    return map[parameter] !== undefined;
}

function checkIsRoad(column, row) {
    return map[column][row] === mapLegend.road;
}

export { updateMap, checkIsNotUndefined, checkIsRoad };
