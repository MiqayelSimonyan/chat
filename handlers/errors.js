exports.init = app => app.use(async (ctx, next) => {
	try {
		await next();
	} catch (e) {
		if (e.status) {
			ctx.body = { message: e.message };
			ctx.status = e.status;
		} else if (e.name == 'ValidationError') {
			ctx.status = 400;

			let errors = {};
			for (let field in e.errors) {
				errors[field] = e.errors[field].message;
			};

			ctx.body = errors;
		} else {
			ctx.body = { message: e.message };
			ctx.status = 500;
			console.error(e.message, e.stack);
		};
	};
});