import React from 'react';
import fetchMock from 'fetch-mock';
import { useState } from '@wordpress/element';
import { Shortcode } from '../../block';

export default {
  title: "Shortcode Preview",
  component: Shortcode
};

export const Usage = () => {
  fetchMock
    .restore()
    .getOnce(
      'https://api.github.com/repos/facebook/react/languages',
      {
        html: '',
        js: '',
        css: '',
      },
  );
  useState();
  const attributes = {text:''};
  const setAttributes = (newAttributes) => Object.assign(newAttributes, attributes);
  return <Shortcode withInstanceId={1} setAttributes={setAttributes} attributes={attributes} isSelected={false} />;
};