import React, { PropTypes } from 'react';
import DeckGL, { GeoJsonLayer } from 'deck.gl';

const GeoJSONMap = (props) => {
  // const LIGHT_SETTINGS = {
  //   lightsPosition: [-125, 50.5, 5000, -122.8, 48.5, 8000],
  //   ambientRatio: 0.2,
  //   diffuseRatio: 0.5,
  //   specularRatio: 0.3,
  //   lightsStrength: [1.0, 0.0, 2.0, 0.0],
  //   numberOfLights: 2,
  // };

  const {
    viewport,
    data,
    opacity,
    getFillColor,
    fill,
    lineWidth,
    lineColor,
    lineScale,
    elevation,
    elevationScale,
    extrude,
    wireframe,
    radius,
    radiusScale,
    onLayerClick,
    autoHighlight,
  } = props;

  const layers = [
    new GeoJsonLayer({
      id: 'geo-layer',
      data: data,
      opacity: opacity,
      getFillColor: getFillColor,
      filled: fill,
      getLineColor: lineColor,
      getLineWidth: f => lineWidth,
      lineWidthScale: lineScale,
      lineWidthMinPixels: 0,
      lineWidthMaxPixels: 200,
      getRadius: radius,
      pointRadiusScale: radiusScale,
      pointRadiusMinPixels: 0,
      pointRadiusMaxPixels: 50,
      getElevation: elevation,
      extruded: extrude,
      wireframe: wireframe,
      elevationScale: elevationScale,
      onClick: onLayerClick,
      pickable: true,
      autoHighlight: autoHighlight,
      updateTriggers: {
        getFillColor: getFillColor,
        getLineColor: lineColor,
        getLineWidth: lineWidth,
        getRadius: radius,
      },
      parameters: {
        depthTest: true,
      },
    }),
  ];

  return (
    <div>
      <DeckGL
          {...viewport}
          layers={layers}
      />
    </div>
  );
};

GeoJSONMap.propTypes = {
  viewport: PropTypes.object,
  data: PropTypes.object.isRequired,
  opacity: PropTypes.number,
  getFillColor: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func
  ]),
  fill: PropTypes.bool,
  lineColor: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func
  ]),
  lineWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func
  ]),
  lineScale: PropTypes.number,
  radius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func
  ]),
  radiusScale: PropTypes.number,
  elevation: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func
  ]),
  extrude: PropTypes.bool,
  wireframe: PropTypes.bool,
  elevationScale: PropTypes.number,
  onLayerClick: PropTypes.func,
  autoHighlight: PropTypes.bool,
};

export default GeoJSONMap;