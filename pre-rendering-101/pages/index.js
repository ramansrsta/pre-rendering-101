import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";

export default function Home({ products }) {
	return (
		<ul>
			{products.map((product) => (
				<li key={product.id}>
					<Link href={`/products/${product.id}`}>{product.title}</Link>
				</li>
			))}
		</ul>
	);
}

export async function getStaticProps() {
	const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);
	return {
		props: {
			products: data.products,
		},
		revalidate: 60,
	};
}
