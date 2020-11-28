/**
 * External Vendor Dependencies
 */
import fetchMock from 'fetch-mock';


/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import {
  BlockEditorKeyboardShortcuts,
  BlockEditorProvider,
  BlockList,
  BlockInspector,
  WritingFlow,
  ObserveTyping,
  BlockToolbar,
} from '@wordpress/block-editor';
import {
  SlotFillProvider,
  DropZoneProvider,

} from '@wordpress/components';
import { registerCoreBlocks } from '@wordpress/block-library';


/**
 * Internal dependencies
 */
import './style.scss';
global.wpApiSettings = {
  nonce: 1337,
  root: '/wp-api/v1'
}
import '../../../src/index';


const iframeAllow = (
  'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
);

function App() {
  const [blocks, updateBlocks] = useState([]);
  useEffect(() => {
    registerCoreBlocks();
  }, []);

  return (
    <div className="playground">
      <SlotFillProvider>
        <DropZoneProvider>
          <BlockEditorProvider
            value={blocks}
            onInput={updateBlocks}
            onChange={updateBlocks}
            settings={{ hasFixedToolbar: true }}
          >
            <div style={{ position: 'sticky', zIndex: 99 }}>
              <BlockToolbar settings={{ hasFixedToolbar: true }} />
            </div>
            <div className="playground__sidebar">
              <BlockInspector />
            </div>
            <div className="editor-styles-wrapper">
              <BlockEditorKeyboardShortcuts />
              <WritingFlow>
                <ObserveTyping>
                  <BlockList />
                </ObserveTyping>
              </WritingFlow>
            </div>
          </BlockEditorProvider>
        </DropZoneProvider>
      </SlotFillProvider>
    </div>
  );
}

function OnlyARobotApp() {
  useEffect(() => {
    fetchMock.restore();
    fetchMock.mock('*', { html: 'I\'m only a robot dave', js: '', style: '' });
  });

  return <App />;
};

function YoutubeApp() {
  useEffect(() => {
    fetchMock.restore();
    fetchMock.mock(
      '*',
      {
        html: `<iframe
  width="560" height="315"
  src="https://www.youtube.com/embed/oKsxPW6i3pM"
  frameborder="0" allow="${iframeAllow}"
  allowfullscreen></iframe>`,
        js: '',
        style: ''
      }
    );
  }, []);


  return <App />;
}

function SlowApp() {
  useEffect(() => {
    fetchMock.restore();
    fetchMock.mock(
      '*',
      {
        html: 'I\ll wait for you!',
        js: '',
        style: ''
      },
      { delay: 2500, sendAsJson: true }
    );
  }, []);


  return <App />;
}

function ErrorApp() {
  useEffect(() => {
    fetchMock.restore();
    fetchMock.mock('*', 500);
  }, []);


  return <App />;
}

export default {
  title: 'Shortcode Preview Block',
};

export const _default = () => <OnlyARobotApp />;

export const YouTubeVideoEmbed = () => <YoutubeApp />;

export const SlowRenderShortcode = () => <SlowApp />;

export const ServerErrorExample = () => <ErrorApp />;
