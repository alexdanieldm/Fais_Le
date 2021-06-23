const itemsFilter = (filter, items) => {
	try {
		const itemsAfterFilter = items.filter((item) => {
			if (filter === 'ALL') {
				return true;
			}
			if (filter === 'COMPLETED') {
				return item.complete;
			}
			if (filter === 'ACTIVE') {
				return !item.complete;
			}
		});
		return itemsAfterFilter;
	} catch (e) {
		alert(e);
		console.error(e);
	}
};

export default itemsFilter;
