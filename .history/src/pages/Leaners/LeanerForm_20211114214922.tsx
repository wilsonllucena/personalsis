import React, { useEffect } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { Input, Label, Select, Textarea } from "@windmill/react-ui";
import { useParams } from "react-router-dom";

const LeanerForm: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	useEffect(() => {
		console.log(id);
	}, [id]);
	return (
		<>
			<PageTitle>Aluno</PageTitle>
			<SectionTitle>Cadastro de aluno</SectionTitle>

			<form className="px-4 py-3 mb-8 w-full bg-white rounded-lg shadow-md dark:bg-gray-800">
				<div className="lg:grid lg:grid-cols-2 lg:gap-4">
					<Label className="mt-4">
						<span>Nome</span>
						<Input css="" name="name" className="mt-1" placeholder="Jhon Doe" />
					</Label>
					<Label className="mt-4">
						<span>E-mail</span>
						<Input
							css=""
							className="mt-1"
							type="email"
                            name="email"
							placeholder="alguem@email.com"
						/>
					</Label>
				</div>

                <div className="lg:grid lg:grid-cols-2 lg:gap-4">
					<Label className="mt-4">
						<span>Data de nascimento</span>
						<Input css="" type="date" name="birth_date" className="mt-1" placeholder="Tipo de treino" />
					</Label>
					<Label className="mt-4">
						<span>Idade</span>
						<Input
							css=""
							className="mt-1"
                            name="age"
                            type="number"
							placeholder="25"
						/>
					</Label>
				</div>
                <div className="lg:grid lg:grid-cols-2 lg:gap-4">
				<Label className="mt-4">
					<span>Requested Limit</span>
					<Select css="" className="mt-1">
						<option>$1,000</option>
						<option>$5,000</option>
						<option>$10,000</option>
						<option>$25,000</option>
					</Select>
				</Label>
                <Label className="mt-4">
					<span>Requested Limit</span>
					<Select css="" className="mt-1">
						<option>$1,000</option>
						<option>$5,000</option>
						<option>$10,000</option>
						<option>$25,000</option>
					</Select>
				</Label>
                </div>

				<Label className="mt-4">
					<span>Comentário</span>
					<Textarea
						css=""
						className="mt-1"
						rows={3}
						placeholder="Enter some long form content."
					/>
				</Label>
			</form>
		</>
	);
};

export default LeanerForm;
