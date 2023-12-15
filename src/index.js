import { registerPlugin } from "@wordpress/plugins";
import { PluginDocumentSettingPanel } from "@wordpress/edit-post";
import { PanelRow, CheckboxControl } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

const WPDevPageSettings = function () {
	const [checked, setChecked] = useState(false);

	// Confirm we're on the 'post' post type
	const postType = wp.data.select("core/editor").getCurrentPostType();
	if (postType !== "post") {
		return null;
	}

	// Get the current post meta
	const meta = wp.data.select("core/editor").getEditedPostAttribute("meta");

	const toggleHasCustomSetting = function (value) {
		console.log(value);
		wp.data.dispatch("core/editor").editPost({
			meta: { _wpdev_has_custom_setting: value },
		});
		setChecked(value);
	};

	useEffect(() => {
		if (meta._wpdev_has_custom_setting) {
			setChecked(true);
		}
	}, []);

	return (
		<PluginDocumentSettingPanel
			name="wpdev-page-settings"
			title={__("WPDev Custom Settings")}
			className="wpdev-page-settings"
		>
			<PanelRow>
				<CheckboxControl
					label={__("Has Custom Setting")}
					checked={checked}
					onChange={toggleHasCustomSetting}
				/>
			</PanelRow>
		</PluginDocumentSettingPanel>
	);
};

registerPlugin("wpdev-page-settings", { render: WPDevPageSettings });
