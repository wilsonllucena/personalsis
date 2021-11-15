import React, { useState, useEffect } from "react";
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

	useEffect(() => {
		const fetchData = async () => {
			const response = await api.get("/leaners");
			setLeaners(response.data);
			setTotalResults(response.data.length);
		};
		fetchData();
	}, []);

	useEffect(() => {
		setLeaners(
			leaners.slice(
				(pageTable - 1) * resultsPerPage,
				pageTable * resultsPerPage
			)
		);
	}, [leaners, pageTable]);

	return (
		<>
			{/* <PageTitle>Alunos cadastrados</PageTitle> */}
			<div className="flex items-center justify-between px-6 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg">
				<div>
					<PageTitle>Alunos cadastrados</PageTitle>
				</div>
				<div className="flex space-x-4">
					<Button>Login</Button>
				</div>
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
							<TableRow key={leaner.id}>
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
										<Button
											layout="link"
											size="small"
											aria-label="Delete"
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
