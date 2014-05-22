HRworksReceipt.updateReceipt = function (params) {

	function removeReceipt() {
		HRworksReceipt.localStoreReceipts.remove(params.id);
		HRworksReceipt.app.navigate('index', { direction: 'backward', root: true });
	}

	var viewModel = {
		actionSheetVisible: ko.observable(false),
		actionSheetData: [
			{text:"Delete", clickAction: removeReceipt}
		],
		// create DataSources
		ds: new DevExpress.data.DataSource({ store: HRworksReceipt.localStoreReceipts }),
		currenciesSource: new DevExpress.data.DataSource({ store: HRworksReceipt.localStoreCurrencies }),
		receiptKindsSource: new DevExpress.data.DataSource({ store: HRworksReceipt.localStoreReceiptKinds }),
		kindsOfPaymentSource: new DevExpress.data.DataSource({ store: HRworksReceipt.localStoreKindsOfPayment }),
		
		// create value variables
		aaa: '',
		inputText: function () {
			console.log("1");
			var a = HRworksReceipt.localStoreReceipts.byKey(params.id).done(function(dataItem) {
				console.log("1a");
				this.inputText = dataItem.text;
				console.log("1b");
				return dataItem.text;
			});
			console.log("1c");
			console.log(typeof a);
			return a.inputText;
		},
		inputAmount: ko.observable(),
		currency: ko.observable("EUR"),
		inputDate: ko.observable(),
		date_placeholder: ko.observable(new Date().toJSON().slice(0,10)),
		receiptKind: ko.observable(1),
		kindOfPayment: ko.observable(1),
		
		updateReceipt: function () {
			var error = 0;
			if (!viewModel.inputText()) {
				DevExpress.ui.notify("Text is empty", 'error', 3000);
				error = 1;
			}
			if (!viewModel.inputAmount()) {
				DevExpress.ui.notify("Amount is empty ", 'error', 3000);
				error = 1;
			}
			if (!viewModel.inputDate()) {
				DevExpress.ui.notify("Date is empty ", 'error', 3000);
				error = 1;
			}
			if (error == 0) {
				HRworksReceipt.localStoreReceipts.update( params.id, {
				text: viewModel.inputText(),
				amount: viewModel.inputAmount(),
				date: viewModel.inputDate(),
				receiptKind: viewModel.receiptKind(),
				kindOfPayment:viewModel.kindOfPayment(),
				currency :viewModel.currency(),
				timestamp: Date()
				}).done(function () {					
					HRworksReceipt.app.navigate('index', { direction: 'backward', root: true });
				}).fail(function () {
					console.log("fail");
				});
            }
		},
		clickRemoveReceipt: function () {
			viewModel.actionSheetVisible(true);
		},
		//Reload the dataSource
		viewShown: function (e) {
			//Reset the value of the input filds
		},
	};
	return viewModel;
};