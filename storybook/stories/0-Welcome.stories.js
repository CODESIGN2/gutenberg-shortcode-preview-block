import React from 'react';

export default {
  title: 'Welcome',
};

import CD2BlockEditImg from '../../media/cd2-block-edit.png';
import CD2BlockPreviewImg from '../../media/cd2-block-preview.png';

export const ToStorybook = () => <div>
  <h1>Welcome</h1>
  <p>This is the Storybook for the CD2 Shortcode Preview Gutenberg Block.</p>
  <p>You can use the side-bar to visit <a href="http://localhost:6006/?path=/story/shortcode-preview-block--default">Shortcode Preview Block</a>.</p>
  <p>I have not yet worked out how to have the component as the only block, so you'll see a number of Core Gutenberg blocks.</p>
  <p>It's also a little different to the WordPress editor, so YMMV and bugs may come up. This is tracking a Gutenberg project effort to use Storybook as an alternative to standing up a full WordPress installation. Because of the way this plugin works requiring both WordPress and it's API, you'll notice globals used, and use of a Mocking tool for requests, rather than real Shortcode rendering.</p>
  <p>Thanks for your interest.</p>
  <figure>
    <img src={CD2BlockEditImg} alt={""} />
    <figcaption>Editing Shortcode technical content and initial input view.</figcaption>
  </figure>
  <figure>
    <img src={CD2BlockPreviewImg} alt={""} />
    <figcaption>Preview of Shortcode technical content presentation view.</figcaption>
  </figure>
</div>;
