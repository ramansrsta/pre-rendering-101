import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { promises as fs } from "fs";
import path from "path";

export default function Home({ products }) {
	return (
		<ul>
			{products.map((product) => (
				<li key={product.id}> {product.title} </li>
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
