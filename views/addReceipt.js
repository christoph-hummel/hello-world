HRworksReceipt.addReceipt = function (params) {

	var viewModel = {
		// create value variables
		inputText: ko.observable(),
		inputAmount: ko.observable(),
		currency: ko.observable("EUR"),
		inputDate: ko.observable(),
		date_placeholder: ko.observable(new Date().toJSON().slice(0,10)),
		receiptKind: ko.observable(1),
		kindOfPayment: ko.observable(1),

		// create DataSources
		ds: new DevExpress.data.DataSource({ store: HRworksReceipt.localStoreReceipts }),
		currenciesSource: new DevExpress.data.DataSource({ store: HRworksReceipt.localStoreCurrencies }),
		receiptKindsSource: new DevExpress.data.DataSource({ store: HRworksReceipt.localStoreReceiptKinds }),
		kindsOfPaymentSource: new DevExpress.data.DataSource({ store: HRworksReceipt.localStoreKindsOfPayment }),

		
		addReceipt: function () {
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
				HRworksReceipt.localStoreReceipts.insert({
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
		//Reload the dataSource
		viewShown: function (e) {
			console.log('view Shown meldet sich');
			//Reset the value of the input filds
		},
	};
	return viewModel;
};