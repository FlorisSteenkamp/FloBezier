
/**
 * Delete all SVG elements of a specific element type.
 * @param $svgs
 */
function deleteSvgs($svgs: SVGElement[][]) {
	if ($svgs === undefined) { return; }
	
    for (const $svg of $svgs) {
		for (const $svgElem of $svg) {
			$svgElem.remove();
		}
	}
	$svgs.length = 0;
}


export { deleteSvgs }
