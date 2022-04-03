import { Fragment } from "react";
import { promises as fs } from "fs";
import path from "path";

function ProductDetailPage(props) {
	const { loadedProduct } = props;
	if (!loadedProduct) {
		return <> Loading ....</>;
	}
	return (
		<Fragment>
			<h1> {loadedProduct.title} </h1>
			<p> {loadedProduct.description} </p>
		</Fragment>
	);
}

export async function getStaticPaths() {
	return {
		paths: [{ params: { pid: "p1" } }],
		fallback: true,
	};
}

export async function getStaticProps(context) {
	const { params } = context;
	const productId = params.pid;
	const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);

	const product = data.products.find((product) => product.id === productId);

	if (!product) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			loadedProduct: product,
		},
	};
}

export default ProductDetailPage;
