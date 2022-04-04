import { useEffect, useState } from "react";
import useSwr from "swr";

export default function LastSalesPage() {
	const fetcher = (...args) => fetch(...args).then((res) => res.json());
	const { data, error } = useSwr(
		"https://jsonplaceholder.typicode.com/todos/",
		fetcher
	);

	console.log(data, "data");

	if (error) {
		return <p> Failed To Load ...</p>;
	}
	if (!data) {
		return <p>Loading...</p>;
	}

	return (
		<ul>{data && data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
	);
}
