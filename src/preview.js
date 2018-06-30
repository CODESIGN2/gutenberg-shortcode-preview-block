/**
 * WordPress dependencies
 */
const { Spinner } = wp.components;
const { __ } = wp.i18n;
const { Component } = wp.element;

import { addQueryArgs } from '@wordpress/url';

/**
 * Plugin Dependencies
 */
import SandBox from './sandbox-custom';

class ShortcodePreview extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			shortcode: '',
			response: {},
		};
	}

	componentDidMount() {
		const { shortcode } = this.props;
		const myURL = new URL( window.location.href );
		const apiURL = addQueryArgs( wpApiSettings.root + 'gutenberg/v1/shortcodes', {
			shortcode: shortcode,
			_wpnonce: wpApiSettings.nonce,
			postId: myURL.searchParams.get('post'),
		} );
		return window.fetch( apiURL, {
			credentials: 'include',
		} ).then( response => {
			response.json().then( data => ( {
				data: data,
				status: response.status,
			} ) ).then( res => {
				if ( res.status === 200 ) {
					this.setState( { response: res } );
				}
			} );
		} );
	}

	render() {
		const response = this.state.response;
		if ( response.isLoading || ! response.data ) {
			return (
				<div key="loading" className="wp-block-embed is-loading">
					<Spinner />
					<p>{ __( 'Loading...' ) }</p>
				</div>
			);
		}

		/*
		 * order must match rest controller style is wp_head, html is shortcode, js is footer
		 * should really be named better
		 */
		const html = response.data.style + ' ' + response.data.html + ' ' + response.data.js;
		return (
			<figure className="wp-block-embed" key="embed">
				<div className="wp-block-embed__wrapper">
					<SandBox
						html={ html }
						title="Preview"
						type={ response.data.type }
					/>
				</div>
			</figure>
		);
	}
}

export default ShortcodePreview;
