/**
 * WordPress dependencies
 */
import { RawHTML } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Shortcode from './block';

export const name = 'custom/shortcode';

export const settings = {
  title: __('CD2 Shortcode'),

  description: __('A shortcode is a WordPress-specific code snippet that is written between square brackets as [shortcode]. '),

  icon: 'marker',

  category: 'widgets',

  attributes: {
    text: {
      type: 'string',
      source: 'html',
    },
  },

  transforms: {
    from: [
      {
        type: 'shortcode',
        // Per "Shortcode names should be all lowercase and use all
        // letters, but numbers and underscores should work fine too.
        // Be wary of using hyphens (dashes), you'll be better off not
        // using them." in https://codex.wordpress.org/Shortcode_API
        // Require that the first character be a letter. This notably
        // prevents footnote markings ([1]) from being caught as
        // shortcodes.
        tag: '[a-z][a-z0-9_-]*',
        attributes: {
          text: {
            type: 'string',
            shortcode: (attrs, { content }) => {
              return content;
            },
          },
        },
      },
    ],
  },

  supports: {
    customClassName: false,
    className: false,
    html: false,
  },

  edit: Shortcode,

  save({ attributes }) {
    return <RawHTML>{attributes.text}</RawHTML>;
  },
};
registerBlockType(name, settings);
