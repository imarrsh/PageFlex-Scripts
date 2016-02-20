function CI_Table_output(cancer) {
	var displayIllnesses = [],
	illness = [	
		'Heart attack',
		'Stroke',
		'Major Organ Transplant',
		'Cancer',
		'Alzheimer\'s Disease*',
		'Parkinson\'s*',
		'Occupational HIV',
		'Coma',
		'Paralysis',
		'Muscular Dystrophy*',
		'Bone Marrow Transplant*',
		'Loss of sight, speech or hearing',
		'Major third degree burns',
		'End-stage renal failure',
		'Bypass surgery*'
	],
	i = 0,
	xat_start = '<!--ATModel:PF_Area_Template_Box--> \
				<!--size:889000,254000--> \
				<?Pageflex pf_xat_ver="1"?> \
				<PF_VBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="center" v_align_contents="center" display_order="0" height="shrinkwrap" width="889000" y_position="0" x_position="0">',
	xat_end   = '</PF_VBox_Base>',
	row_color_attributes;

	// check if cancer is selected
	// remove from array if not
	if(cancer === ""){
		illness.splice(3, 1);
	}

	for (i; i < illness.length; i++) {
		// divide index by 2 to push alternating row colors to displayIllness[] array
		row_color_attributes = ((i + 1) % 2 != 0) ? 'fill_tint="20.000000" fill_color="kemper-orange" fill_name="_solid_fill"' : '';

		displayIllnesses.push('<PF_TextFrame_Base ' + row_color_attributes + ' left_margin="12700" runaround="false" height="63500" width="889000" display_order="0" y_position="0" x_position="0"> \
								<_text_column runaround="false" v_align_contents="center" max_width="889000" min_width="0"> \
								<body> \
								<_char>' + illness[i] + '</_char> \
								</body> \
								</_text_column> \
								</PF_TextFrame_Base>');
		
	};
	// PF is expecting xml markup for area template
	// take out commas to prevent PF from dying 
	var output = displayIllnesses.toString().replace(/,/g,"");

	return xat_start + output + xat_end;
}
