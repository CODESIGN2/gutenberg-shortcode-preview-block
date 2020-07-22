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
} from '@wordpress/block-editor';
import {
	Popover,
	SlotFillProvider,
	DropZoneProvider,
} from '@wordpress/components';
import { registerCoreBlocks } from '@wordpress/block-library';

import fetchMock from 'fetch-mock';


/**
 * Internal dependencies
 */
import './style.scss';
global.wpApiSettings = {
	nonce: 1337,
	root: '/wp-api/v1'
}
import '../../../index';

function App() {
	const [ blocks, updateBlocks ] = useState( [] );

	useEffect( () => {
		registerCoreBlocks();
	}, [] );

	
	return (
		<div className="playground">
			<SlotFillProvider>
				<DropZoneProvider>
					<BlockEditorProvider
						value={ blocks }
						onInput={ updateBlocks }
						onChange={ updateBlocks }
					>
						<div className="playground__sidebar">
							<BlockInspector />
						</div>
						<div className="editor-styles-wrapper">
							<Popover.Slot name="block-toolbar" />
							<BlockEditorKeyboardShortcuts />
							<WritingFlow>
								<ObserveTyping>
									<BlockList/>
								</ObserveTyping>
							</WritingFlow>
						</div>
						<Popover.Slot />
					</BlockEditorProvider>
				</DropZoneProvider>
			</SlotFillProvider>
		</div>
	);
}

function OnlyARobotApp() {
	useEffect( () => {
		fetchMock.restore();
		fetchMock.mock('*', {html:'I\'m only a robot dave', js: '', style: ''});
	});

	return <App/>;
};

function YoutubeApp() {
	useEffect( () => {
		fetchMock.restore();
		fetchMock.mock('*', {html:'<iframe width="560" height="315" src="https://www.youtube.com/embed/oKsxPW6i3pM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', js: '', style: ''});
	}, [] );

	
	return <App />;
}

export default {
	title: 'Shortcode Preview Block',
};

export const _default = () => {
	return <OnlyARobotApp />;
};

export const YouTubeVideoEmbed = () => {
	return <YoutubeApp />;
};