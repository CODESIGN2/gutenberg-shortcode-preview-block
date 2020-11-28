/**
 * WordPress dependencies
 */
import { Dashicon } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { PlainText, BlockControls } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ShortcodePreview from './preview';

export class Shortcode extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			preview: false,
		};
	}

	render() {
		const { preview } = this.state;
		const {
			instanceId,
			setAttributes,
			attributes,
			isSelected,
		} = this.props;
		const inputId = `blocks-custom-shortcode-input-${ instanceId }`;
		const shortcodeContent = ( attributes.text || '' ).trim();
		const willPreview = shortcodeContent.length && preview;

		const controls = isSelected ? (
			<BlockControls>
				<div className="components-toolbar">
					<button
						className={ `components-button components-tab-button ${
							! willPreview ? 'is-pressed is-active' : ''
						}` }
						onClick={ () => this.setState( { preview: false } ) }
						aria-label={ __( 'Editing Shortcode' ) }
						aria-pressed={ ! willPreview }
					>
						<span>{ __( 'Shortcode' ) }</span>
					</button>
					<button
						className={ `components-button components-tab-button ${
							willPreview ? 'is-pressed is-active' : ''
						}` }
						onClick={ () =>
							shortcodeContent.length &&
							this.setState( { preview: true } )
						}
						aria-label={ __( 'Previewing Shortcode' ) }
						aria-pressed={ willPreview }
					>
						<span>{ __( 'Preview' ) }</span>
					</button>
				</div>
			</BlockControls>
		) : null;

		return willPreview ? (
			<div className="wp-block-custom-shortcode">
				{ controls }
				<ShortcodePreview
					shortcode={ shortcodeContent }
					parentSelected={ isSelected }
					sharedInstanceId={ instanceId }
				/>
			</div>
		) : (
			<div className="wp-block-custom-shortcode components-placeholder">
				{ controls }
				<label
					htmlFor={ inputId }
					className="components-placeholder__label"
				>
					<Dashicon icon="editor-code" />
					{ __( 'Shortcode' ) }
				</label>
				<PlainText
					id={ inputId }
					value={ attributes.text }
					className="input-control"
					placeholder={ __( 'Write shortcode here…' ) }
					onChange={ ( text ) => setAttributes( { text } ) }
				/>
			</div>
		);
	}
}

export default withSelect( ( select ) => {
	const { getSettings } = select( 'core/block-editor' );
	return {
		styles: getSettings().styles,
	};
} )( withInstanceId( Shortcode ) );
