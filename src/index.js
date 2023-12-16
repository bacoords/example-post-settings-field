import { registerPlugin } from "@wordpress/plugins";
import { PluginDocumentSettingPanel } from "@wordpress/edit-post";
import { PanelRow, CheckboxControl } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useEntityProp } from "@wordpress/core-data";
import { useSelect } from "@wordpress/data";

const WPDevPageSettings = function () {
	const [checked, setChecked] = useState(false);

	// Get the current post type.
	const postType = useSelect((select) => {
		return select("core/editor").getCurrentPostType();
	});

	// If the post type is not "post", return null and disable the panel.
	if (postType !== "post") {
		return null;
	}

	// Get the current post meta.
	const [meta, setMeta] = useEntityProp("postType", "post", "meta");

	// Update the meta value.
	const toggleHasCustomSetting = function (value) {
		setMeta({ wpdev_has_custom_setting: value });
		setChecked(value);
	};

	// Set the checkbox to checked if the meta value is true.
	useEffect(() => {
		if (meta.wpdev_has_custom_setting) {
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
