/**
 * WordPress dependencies
 */
const { withInstanceId } = wp.compose;
const { Dashicon } = wp.components;
const { Component } = wp.element;
const { __ } = wp.i18n;
const { PlainText } = wp.editor;

/**
 * Internal dependencies
 */
import ShortcodePreview from './preview';

export class Shortcode extends Component {
	constructor() {
		super( ...arguments );
		this.state = {};
	}

	render() {
		const { instanceId, setAttributes, attributes, isSelected } = this.props;
		const inputId = `blocks-shortcode-input-${ instanceId }`;
		const shortcodeContent = ( attributes.text || '' ).trim();

		if ( ! isSelected ) {
			return [
				<div>
					<Dashicon icon="visibility" />
					{ __( 'CD2 Shortcode (Preview)' ) }
				</div>,
				<div className="wp-block" key="preview">
					<ShortcodePreview
						shortcode={ shortcodeContent }
					/>
				</div>,
			];
		}

		return [
			<div className="wp-block-shortcode components-placeholder" key="placeholder">
				<label htmlFor={ inputId } className="components-placeholder__label">
					<Dashicon icon="editor-code" />
					{ __( 'CD2 Shortcode (Editing)' ) }
				</label>
				<PlainText
					id={ inputId }
					value={ attributes.text }
					className="input-control"
					placeholder={ __( 'Write shortcode here…' ) }
					onChange={ ( text ) => setAttributes( { text } ) }
				/>
			</div>,
		];
	}
}

export default withInstanceId( Shortcode );
