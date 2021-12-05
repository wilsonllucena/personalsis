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
interface ILeaners {
	id: number;
	name: string;
	email: string;
}
const List: React.FC = () => {
	const [leaners, setLeaners] = useState<ILeaners[]>([]);
	const [pageTable, setPageTable] = useState(1);
	const [totalResults, setTotalResults] = useState(0);

	// pagination setup
	const resultsPerPage = 10;

	// pagination change control
	function onPageChangeTable2(p: number) {
		setPageTable(p);
	}
	const fetchData = useCallback(async () => {
		const response = await api.get("/leaners");
		const results = response.data.slice(
			(pageTable - 1) * resultsPerPage,
			pageTable * resultsPerPage
		);
		setLeaners(results);
		setTotalResults(response.data.length);
	}, [pageTable]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const deleteLeaner = useCallback(
		async (id: number) => {
			await api.delete(`/leaners/${id}`);
			fetchData();
		},
		[fetchData]
	);

	return (
		<>
			<div className="flex items-center justify-between">
				<PageTitle>Alunos</PageTitle>
				<Button className="bg-blue-600">
					<Link to="/app/leaner">+ Novo</Link>
				</Button>
			</div>
			<TableContainer className="mb-8">
				<Table>
					<TableHeader>
						<tr>
							<TableCell>Nome</TableCell>
							<TableCell>Ações</TableCell>
						</tr>
					</TableHeader>
					<TableBody>
						{leaners.map((leaner, i) => (
							<TableRow key={i}>
								<TableCell>
									<div className="flex items-center text-sm">
										<div>
											<p className="font-semibold">
												{leaner.name}
											</p>
											<p className="text-xs text-gray-600 dark:text-gray-400">
												{leaner.email}
											</p>
										</div>
									</div>
								</TableCell>
								<TableCell>
									<div className="flex items-center space-x-4">
                                        <Link to={`leaner/${leaner.id}`}>
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
												deleteLeaner(leaner.id)
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
