sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"./controller/HelloDialog",
	"sap/ui/Device"
], function (UIComponent, JSONModel, HelloDialog, Device) {
	"use strict";

	return UIComponent.extend("sap.ui.demo.walkthrough.Component", {

		metadata: {
			manifest: "json",
			interfaces: ["sap.ui.core.IAsyncContentCreation"]
		},

		init: function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// set data model
			var oData = {
				recipient: {
					name: "World"
				}
			};
			var oModel = new JSONModel(oData);
			this.setModel(oModel);

			// set device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");

			// set dialog
			this.rootControlLoaded().then(function() {
				this._helloDialog = new HelloDialog(this.getRootControl());
			}.bind(this));

			// create the views based on the url/hash
			this.getRouter().initialize();
		},

		getContentDensityClass : function () {
			if (!this._sContentDensityClass) {
				if (!Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		},

		exit : function () {
			if (this._helloDialog) {
				this._helloDialog.destroy();
				delete this._helloDialog;
			}
		},

		openHelloDialog : function () {
			this._helloDialog.open();
		}

	});

});