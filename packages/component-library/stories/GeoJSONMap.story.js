import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, number, selectV2, boolean, color } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import { BaseMap } from '../src';
import { GeoJSONMap } from '../src';

import neighborhood from '../src/GeoJSONMap/neighborhood';

const displayName = GeoJSONMap.displayName || 'GeoJSONMap';

const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';

const demoMap = () => {
  const mapStylesOptions = {
    'Lè Shine': 'mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq',
    'Label Maker': 'mapbox://styles/themendozaline/cjg627xuw08mk2spjsb8jmho7',
    'Moonlight': 'mapbox://styles/themendozaline/cjgq6r2lg00072rmqj1wocgdq',
    'Navigation Guidance Night': 'mapbox://styles/themendozaline/cj6y6f5m006ar2sobpimm7ay7',
    'North Star': 'mapbox://styles/themendozaline/cj5oyewyy0fg22spetiv0hap0',
    'Odyssey': 'mapbox://styles/themendozaline/cjgq6rklb000d2so1b8myaait',
    'Scenic': 'mapbox://styles/themendozaline/cj8rrlv4tbtgs2rqnyhckuqva',
  };
  const mapboxStyle = selectV2('Mapbox Style', mapStylesOptions, mapStylesOptions['Lè Shine']);

  const opacityOptions = {
     range: true,
     min: 0,
     max: 1,
     step: 0.1,
  };
  const opacity = number('Opacity:', 0.9, opacityOptions);

  const polySchemeOptions = {
    'Blue Green': '[[237,248,251],[178,226,226],[102,194,164],[35,139,69]]',
    'Blue Purple': '[[237,248,251],[179,205,227],[140,150,198],[136,65,157]]',
    'Green Blue': '[[240,249,232],[186,228,188],[123,204,196],[43,140,190]]',
    'Orange Red': '[[254,240,217],[253,204,138],[252,141,89],[215,48,31]]',
    'Red Purple': '[[254,235,226],[251,180,185],[247,104,161],[174,1,126]]',
  };
  const polyColorScheme = selectV2('Polygon Color Scheme:', polySchemeOptions, polySchemeOptions['Blue Green']);
  const polygonColorArray = JSON.parse(polyColorScheme);
  const polygonBreaks = [25, 50, 75, 100];

  const polygonFill = boolean('Polygon Fill?:', true);

  const polygonStrokeColor = color('Polygon Stroke Color:', '#101010');
  const polygonStrokeArray = polygonStrokeColor.slice(5,-1)
    .split(',')
    .map(n => parseInt(n, 10))
    .filter((n,i) => i < 3);

  const lineStrokeColor = color('Line Stroke Color:', '#101010');
  const lineStrokeArray = lineStrokeColor.slice(5,-1)
    .split(',')
    .map(n => parseInt(n, 10))
    .filter((n,i) => i < 3);

  const strokeColor = f => f.geometry.type === "LineString" ? lineStrokeArray : polygonStrokeArray;

  const getFillColor = f => f.myValue < polygonBreaks[0] ? polygonColorArray[0] :
                            f.myValue < polygonBreaks[1] ? polygonColorArray[1] :
                            f.myValue < polygonBreaks[2] ? polygonColorArray[2] :
                            f.myValue < polygonBreaks[3] ? polygonColorArray[3] :
                            f.properties.TYPE === 'MAX' && f.properties.LINE === 'R' ? [255,0,0] :
                            f.properties.TYPE === 'MAX' && f.properties.LINE === 'B' ? [0,0,255] :
                            f.properties.TYPE === 'MAX' && f.properties.LINE === 'G' ? [0,255,0] :
                            f.properties.TYPE === 'MAX' && f.properties.LINE === 'Y' ? [255,215,0] :
                            f.properties.TYPE === 'MAX' && f.properties.LINE === 'O' ? [255,69,0] :
                            [0,0,0];

  const lineWidthOptions = {
     range: true,
     min: 0,
     max: 200,
     step: 2,
  };
  const lineWidth = number('Line Width:', 125, lineWidthOptions);

  const lineScaleOptions = {
     range: true,
     min: 0,
     max: 10,
     step: 0.5,
  };
  const lineScale = number('Line Scale:', 1, lineScaleOptions);

  const radius = f => Math.floor(Math.random() * (500 - 1 + 1) + 1);

  const radiusScaleOptions = {
     range: true,
     min: 0,
     max: 10,
     step: 0.5,
  };
  const radiusScale = number('Radius Scale:', 1, radiusScaleOptions);

  const elevation = f => Math.floor(Math.random() * (9000 - 100 + 1) + 100);
  
  const extrude = boolean('3D?:', false);
  
  const wireframe = boolean('Wireframe?:', false);

  const elevationScaleOptions = {
     range: true,
     min: 0,
     max: 15,
     step: 0.5,
  };
  const elevationScale = number('Elevation Scale:', 1, elevationScaleOptions);

  const autoHighlight = boolean('Auto Highlight?', false);

  return (
    <BaseMap
      mapboxToken={mapboxToken}
      mapboxStyle={mapboxStyle}
    >
      <GeoJSONMap
        data={neighborhood}
        opacity={opacity}
        getFillColor={getFillColor}
        fill={polygonFill}
        lineColor={strokeColor}
        lineWidth={lineWidth}
        lineScale={lineScale}
        radius={radius}
        radiusScale={radiusScale}
        elevation={elevation}
        extrude={extrude}
        wireframe={wireframe}
        elevationScale={elevationScale}
        onLayerClick={info => action('Layer clicked:', { depth: 2 })(info)}
        autoHighlight={autoHighlight}
      />
    </BaseMap>
  );
};

export default () => storiesOf(displayName, module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add(
    'Simple usage',
    (demoMap)
  );
  