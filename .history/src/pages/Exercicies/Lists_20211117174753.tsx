import React, { useState, useEffect, useCallback } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import {
	Table,
	TableHeader,
	TableCell,
	TableBody,
	TableRow,
	TableFooter,
	TableContainer,
	Button,
	Pagination,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon } from "../../icons";
import api from "../../services/apiClient";
import { Link } from "react-router-dom";

interface IExercicies {
	id: number;
	muscle_id: number;
	name: string;
	url: string;
    muscle: {
        name: string
    }
}
const List: React.FC = () => {
	const [exercicies, setExercicices] = useState<IExercicies[]>([]);
	const [pageTable, setPageTable] = useState(1);
	const [totalResults, setTotalResults] = useState(0);

	// pagination setup
	const resultsPerPage = 10;

	// pagination change control
	function onPageChangeTable2(p: number) {
		setPageTable(p);
	}
	const fetchData = useCallback(async () => {
		const response = await api.get("/exercicies");
		const results = response.data.slice(
			(pageTable - 1) * resultsPerPage,
			pageTable * resultsPerPage
		);
		setExercicices(results);
		setTotalResults(response.data.length);
	}, [pageTable]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const destroy = useCallback(
		async (id: number) => {
			await api.delete(`/exercicies/${id}`);
			fetchData();
		},
		[fetchData]
	);

	return (
		<>
			<div className="flex items-center justify-between">
				<PageTitle>Exercicios</PageTitle>
				<Button className="bg-blue-600">
					<Link to="/app/exercicie">+ Novo</Link>
				</Button>
			</div>
			<TableContainer className="mb-8">
				<Table>
					<TableHeader>
						<tr>
							<TableCell>Nome</TableCell>
							<TableCell>Musclo</TableCell>
							<TableCell>Link do video</TableCell>
							<TableCell>Ações</TableCell>
						</tr>
					</TableHeader>
					<TableBody>
						{exercicies.map((exercicie, i) => (
							<TableRow key={i}>
								<TableCell>{exercicie.name}</TableCell>
								<TableCell>
									<span className="text-sm">
									    {exercicie.muscle_id}
									</span>
								</TableCell>
								<TableCell>
									<div className="flex items-center space-x-4">
										<Link to={`execicie/${exercicie.id}`}>
											<Button
												layout="link"
												size="small"
												aria-label="Edit"
											>
												<EditIcon
													className="w-5 h-5"
													aria-hidden="true"
												/>
											</Button>
										</Link>

										<Button
											layout="link"
											size="small"
											aria-label="Delete"
											onClick={() =>
												destroy(exercicie.id)
											}
										>
											<TrashIcon
												className="w-5 h-5"
												aria-hidden="true"
											/>
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<TableFooter>
					<Pagination
						totalResults={totalResults}
						resultsPerPage={resultsPerPage}
						onChange={onPageChangeTable2}
						label="Table navigation"
					/>
				</TableFooter>
			</TableContainer>
		</>
	);
};

export default List;
