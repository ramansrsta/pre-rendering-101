import { useEffect, useState } from "react";
import useSwr from "swr";

export default function LastSalesPage(props) {
	const fetcher = (...args) => fetch(...args).then((res) => res.json());
	const { data, error } = useSwr(
		"https://jsonplaceholder.typicode.com/todos/",
		fetcher
	);

	if (error) {
		return <p> Failed To Load ...</p>;
	}
	if (!data) {
		return <p>Loading...</p>;
	}

	return (
		<ul>
			{data && props.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}
		</ul>
	);
}

export async function getStaticProps() {
	return fetch("https://jsonplaceholder.typicode.com/todos/")
		.then((response) => response.json())
		.then((json) => {
			return {
				props: {
					data: json,
				},
				revalidate: 10,
			};
		});
}
