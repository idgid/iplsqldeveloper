<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>iPL/SQL Developer</title>
		<meta content="text/html; charset=utf-8" charset="utf-8" />

		<script type="text/javascript" src="../js/codebase6/suite.js?v=6.1.4"></script>
		<link rel="stylesheet" href="../js/codebase6/suite.css?v=6.1.4">
		<link rel="stylesheet" href="../js/codebase6/common/index.css?v=6.1.4">

	<!-- custom sample head -->
	<style>
		.dhx_sample-container {
			height: 600px;
		}
	</style>

	</head>

	<body  ondragstart="return false" oncontextmenu="return false">


		<section class="dhx_sample-container">
			<div class="dhx_sample-container__widget" id="layout"></div>

		</section>

		<script>
			var layout = new dhx.Layout("layout", {
				css: "dhx_layout-cell--bordered",
				width: "1220px",
				height: "800px",
				rows: [{
					id: "logo",
					html: "Logo",
					css: "dhx_layout-cell--border_bottom",
					gravity: false,
					height: "60px"
					},
					{
						id: "toolbar",
						html: "Header",
						css: "dhx_layout-cell--border_bottom",
						gravity: false,
						height: "60px"
					},
					{
						resizable: true,
						width: "100%",
						cols: [{
							resizable: true,
							css: "dhx_layout-cell--border_right",

							rows: [{
								id: "sidebar_t",
								html: "Sidebar_t",
								resizable: true,
								css: "dhx_layout-cell--border_bottom",
								height: "300px",
							},
								{
									id: "sidebar_b",
									html: "dd",
									css: "dhx_layout-cell--border_top"

								},
							]

						},
							{
								resizable: true,
								css: "",
								width: "820px",
								rows: [{

									resizable: true,
									css: "dhx_layout-cell--border_left",
									height: "150px",

									cols: [{

										id: "content",
										html: "<section class=\"dhx_sample-container\"> \n" +
												"\t\t\t<div class=\"dhx_sample-container__widget\" id=\"tabbar\"></div>\n" +
												"</section>",
										css: "dhx_layout-cell--border_bottom",
										width: "98%"
									},


										{
											id: "rightbar",
											html: "As",
											css: "dhx_layout-cell--border_left",
											width: "20px"
										}
									]


								},
									{
										id: "content_result",
										html: "content_result",
										css: "dhx_layout-cell--border_top"
									}
								]

							}
						]
					},
					{
						id: "footer",
						html: "Footer",
						css: "dhx_layout-cell--border_top",
						gravity: false,
						height: "20px"
					}
				]
			});

			var tabbar;
			function createTabbar(mode) {
				if (tabbar) {
					tabbar.destructor();
				}
				tabbar = new dhx.Tabbar("tabbar", {
					mode: mode,
					css: "dhx_widget--bordered",
					noTitle: true,
					views:[
						{ id:"content_tab_1", tab: "", html: "<div></div>"},
						{ id:"content_tab_2", tab: "", html: "<div></div>"},
						{ id:"content_tab_3", tab: "", html: "<div></div>"},
						{ id:"content_tab_4", tab: "", html: "<div></div>"}
					]
				});
			}
			createTabbar("top");
		</script>

	</body>
</html>
