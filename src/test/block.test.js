import React from 'react'
import TestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import fetchMock from 'fetch-mock';
import MyBlock, { Shortcode } from '../block';
import ShortcodePreview from '../preview';

global.wpApiSettings = {
    root: "http://www.example.com/api/"
};

describe('Shortcode', () => {
    let block, wrapper, wrapperElement;

    beforeEach(() => {
        block = <MyBlock attributes={ {text: "[code]hello world[/code]"} } />;
        wrapper = TestUtils.renderIntoDocument(
            block
        );
        wrapperElement = () => ReactDOM.findDOMNode( wrapper );

		fetchMock.restore();
		fetchMock.mock('*', {html:'<pre>hello world</pre>', js: '', style: ''});
    });

    describe('when added', () => {
        it('Should match Snapshot', () => {
            expect(wrapperElement()).toMatchSnapshot();
        });
    });

    describe('when added in preview mode before receiving a server response', () => {
        it('Should match Snapshot', () => {
            const block = TestUtils.findRenderedComponentWithType(wrapper, Shortcode);
            block.setState( {
				preview: true,
            } );
            expect(wrapperElement()).toMatchSnapshot();
        });
    });

    describe('when added in preview mode with a response', () => {
        it('Should match Snapshot', () => {
            const block = TestUtils.findRenderedComponentWithType(wrapper, Shortcode);
            block.setState( {
				preview: true,
            } );
            const previewComponent = TestUtils.findRenderedComponentWithType(wrapper, ShortcodePreview);
            previewComponent.setState({response: {data: {html: '<pre>hello world</pre>', js: '', style:''}}})
            expect(wrapperElement()).toMatchSnapshot();
        });
    });
});
