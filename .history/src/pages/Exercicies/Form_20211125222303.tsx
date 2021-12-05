import React, { useCallback, useEffect, useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { Button, Input, Label, Select, Textarea } from "@windmill/react-ui";
import { useParams } from "react-router-dom";
import api from "../../services/apiClient";
import { IOptionsSelect } from "../../interface/IOptionsSelect";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

interface IInputsForm {
	id: number;
    muscle_id: number;
	name: string;
	url: string;
}


const Form: React.FC = () => {
	const { register, handleSubmit, setValue } = useForm<
		Omit<IInputsForm, "id">
	>();
	const history = useHistory();

	const { id } = useParams<{ id: string }>();
	const [muscles, setMuscles] = useState<IOptionsSelect[]>([]);
    const [titlePage, setTitlePage] = useState("Cadastrar");

	const onSubmitForm = async (data: IInputsForm) => {
		if (id) {
			await api.put(`/exercicies/${id}`, data);
			alert("Cadastro atualizado com sucesso!");
		} else {
			await api.post(`/exercicies`, data);
			alert("Cadastro realizado com sucesso!");
		}

		history.push("/app/exercicies");
	};

	const getMusclesOptions = async () => {
		const response = await api.get<IOptionsSelect[]>("/muscles");
		setMuscles(response.data);
	};

	
	useEffect(() => {
        if(id){
            setTitlePage("Editar")
        }
		getMusclesOptions();
	}, [id]);

    const getExercicie = useCallback(
		async (id: string) => {
			const response = await api.get(`/exercicies/${id}`);
			const exercicie = response.data;

			setValue("name", exercicie?.name);
			setValue("url", exercicie?.url);
			setValue("muscle_id", exercicie?.muscle_id);
	
		},
		[setValue]
	);

	useEffect(() => {
        if(id){
            getExercicie(id);
        }
	}, [getExercicie, id]);

	return (
		<>
			<PageTitle>{`${titlePage} exercício`}</PageTitle>
			<form
				onSubmit={handleSubmit(onSubmitForm)}
				className="px-4 py-3 mb-8 w-full bg-white rounded-lg shadow-md dark:bg-gray-800"
			>
				<div className="lg:grid lg:grid-cols-2 lg:gap-4">
                <Label className="mt-4">
						<span>Categoria</span>
						<Select
							css=""
							{...register("muscle_id")}
							className="mt-1"
						>
							<option></option>
							{muscles.map((muscle) => (
								<option key={muscle.id} value={muscle.id}>
									{muscle.name}
								</option>
							))}
						</Select>
					</Label>
					<Label className="mt-4">
						<span>Nome</span>
						<Input
							css=""
							{...register("name")}
							name="name"
							className="mt-1"
							placeholder="Nome"
						/>
					</Label>
                   
				</div>

				<Label className="mt-4">
					<span>Link do vídeo</span>
                    <Input
							css=""
							{...register("url")}
							className="mt-1"
							placeholder="link do vídeo"
						/>
				</Label>
				<Button type="submit" className="bg-blue-600 mt-4">
					Salvar
				</Button>
			</form>
		</>
	);
};

export default Form;
