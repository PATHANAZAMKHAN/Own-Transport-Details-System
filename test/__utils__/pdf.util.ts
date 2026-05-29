export const countPdfPages = (pdf: Buffer): number => {
	return (
		Buffer.from(pdf)
			.toString('latin1')
			.match(/\/Type\s*\/Page\b/g) || []
	).length;
};
