/**
 * WordPress dependencies
 */
const { withInstanceId } = wp.compose;
const { Dashicon } = wp.components;
const { Component } = wp.element;
const { __ } = wp.i18n;
const { PlainText, BlockControls } = wp.editor;

/**
 * Internal dependencies
 */
import ShortcodePreview from './preview';

export class Shortcode extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			preview: true
		};
	}

	render() {
		const { preview } = this.state;
		const { instanceId, setAttributes, attributes, isSelected } = this.props;
		const inputId = `blocks-shortcode-input-${ instanceId }`;
		const shortcodeContent = ( attributes.text || '' ).trim();
		const willPreview = shortcodeContent.length && preview;

		const controls = isSelected ? (
			<BlockControls key="controls">
				<div className="components-toolbar">
					<button
						className={ `components-button components-tab-button ${ ! willPreview ? 'is-pressed is-active' : '' }` }
						onClick={ () => this.setState( { preview: false } ) }
						aria-label={ __('Editing Shortcode') }
		                aria-pressed={ ! willPreview } >
						<span>{ __( 'Shortcode' ) }</span>
					</button>
					<button
						className={ `components-button components-tab-button ${ willPreview ? 'is-pressed is-active' : '' }` }
						onClick={ () => shortcodeContent.length && this.setState( { preview: true } ) }
						aria-label={ __('Previewing Shortcode') }
		                aria-pressed={ willPreview } >
						<span>{ __( 'Preview' ) }</span>
					</button>
				</div>
			</BlockControls>
		) : null;

		return ( willPreview ? [
				<div className="wp-block-custom-shortcode" key="preview">
					{ controls }
					<ShortcodePreview
						shortcode={ shortcodeContent }
						isSelected={ this.isSelected }
					/>
				</div>,
			] : [
				<div className="wp-block-custom-shortcode components-placeholder" key="placeholder">
					{ controls }
					<label htmlFor={ inputId } className="components-placeholder__label">
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
				</div>,
			]
		);
	}
}

export default withInstanceId( Shortcode );
