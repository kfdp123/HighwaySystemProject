if (!viewer.scene.pickPositionSupported) {
    window.alert('This browser does not support pickPosition.');
}
var drawingMode;
var activeShapePoints = [];
var activeShape;
var floatingPoint;

function createPoint(worldPosition) {
    var point = viewer.entities.add({
        position : worldPosition,
        point : {
            color : Cesium.Color.WHITE,
            pixelSize : 5,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        }
    });
    return point;
}


function drawShape(positionData) {
    var shape;
    if (drawingMode === 'line') {
        shape = viewer.entities.add({
            polyline : {
                positions : positionData,
                clampToGround : true,
                width : 3
            }
        });
    }
    else if (drawingMode === 'polygon') {
        shape = viewer.entities.add({
            polygon: {
                hierarchy: positionData,
                material: new Cesium.ColorMaterialProperty(Cesium.Color.YELLOW.withAlpha(0.7))
            }
        });
    }
    return shape;
}

function drawll(){
	var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
	handler.setInputAction(function(event) {
   
    
    var earthPosition = viewer.scene.pickPosition(event.position);
    
    if (Cesium.defined(earthPosition)) {
        if (activeShapePoints.length === 0) {
            floatingPoint = createPoint(earthPosition);
            activeShapePoints.push(earthPosition);
            var dynamicPositions = new Cesium.CallbackProperty(function () {
                if (drawingMode === 'polygon') {
                    return new Cesium.PolygonHierarchy(activeShapePoints);
                }
                return activeShapePoints;
            }, false);
            activeShape = drawShape(dynamicPositions);
        }
        activeShapePoints.push(earthPosition);
        createPoint(earthPosition);
    }
	}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
	handler.setInputAction(function(event) {
    if (Cesium.defined(floatingPoint)) {
        var newPosition = viewer.scene.pickPosition(event.endPosition);
        if (Cesium.defined(newPosition)) {
            floatingPoint.position.setValue(newPosition);
            activeShapePoints.pop();
            activeShapePoints.push(newPosition);
        }
    }
	}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	handler.setInputAction(function(event) {
    terminateShape();
	}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}
function terminateShape() {
    activeShapePoints.pop();
    drawShape(activeShapePoints);
    viewer.entities.remove(floatingPoint);
    viewer.entities.remove(activeShape);
    floatingPoint = undefined;
    activeShape = undefined;
    activeShapePoints = [];
}