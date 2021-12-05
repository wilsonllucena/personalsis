import React, { useCallback, useEffect, useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { Button, Input, Label, Select, Textarea } from "@windmill/react-ui";
import { useParams } from "react-router-dom";
import api from "../../services/apiClient";
import { IOptionsSelect } from "../../interface/IOptionsSelect";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

interface ILeanerInputsForm {
	id: number;
	name: string;
	email: string;
	age: string;
	birth_date: Date;
	gender_id: number;
	plan_id: number;
	intensity_id: number;
	week_id: number;
	location_id: number;
	frequency_id: number;
	type_training: string;
	training_mesocycle: string;
	comments: string;
	date_start: Date;
	date_end: Date;
}

const LeanerForm: React.FC = () => {
	const { register, handleSubmit, setValue } = useForm<
		Omit<ILeanerInputsForm, "id">
	>();
	const history = useHistory();

	const { id } = useParams<{ id: string }>();
	const [genders, setGenders] = useState<IOptionsSelect[]>([]);
	const [plans, setPlans] = useState<IOptionsSelect[]>([]);
	const [intensities, setIntensities] = useState<IOptionsSelect[]>([]);
	const [weeks, setWeeks] = useState<IOptionsSelect[]>([]);
	const [frequencies, setFrequencies] = useState<IOptionsSelect[]>([]);
	const [locations, setLocations] = useState<IOptionsSelect[]>([]);

	const onSubmitForm = async (data: ILeanerInputsForm) => {
		if (id) {
			await api.put(`/leaners/${id}`, data);
			alert("Cadastro atualizado com sucesso!");
		} else {
			await api.post(`/leaners`, data);
			alert("Cadastro realizado com sucesso!");
		}

		history.push("/app/leaners");
	};

	const getGenderOptions = async () => {
		const response = await api.get<IOptionsSelect[]>("/genders");
		setGenders(response.data);
	};

	const getPlansOptions = async () => {
		const response = await api.get<IOptionsSelect[]>("/plans");
		setPlans(response.data);
	};

	const getIntensitiesOptions = async () => {
		const response = await api.get<IOptionsSelect[]>("/intensities");
		setIntensities(response.data);
	};

	const getWeeksOptions = async () => {
		const response = await api.get<IOptionsSelect[]>("/weeks");
		setWeeks(response.data);
	};

	const getLocationsOptions = async () => {
		const response = await api.get<IOptionsSelect[]>("/locations");
		setLocations(response.data);
	};

	const getFrequenciesOptions = async () => {
		const response = await api.get<IOptionsSelect[]>("/frequencies");
		setFrequencies(response.data);
	};
	useEffect(() => {
		getGenderOptions();
		getPlansOptions();
		getIntensitiesOptions();
		getWeeksOptions();
		getLocationsOptions();
		getFrequenciesOptions();
	}, []);

    const getLeaner = useCallback(
		async (id: string) => {
			const response = await api.get(`/leaners/${id}`);
			const leaner = response.data;

			setValue("name", leaner?.name);
			setValue("email", leaner?.email);
			setValue("age", leaner?.age);
			setValue("birth_date", leaner?.birth_date);
			setValue("gender_id", leaner?.gender_id);
			setValue("plan_id", leaner?.plan_id);
			setValue("intensity_id", leaner?.intensity_id);
			setValue("frequency_id", leaner?.frequency_id);
			setValue("location_id", leaner?.location_id);
			setValue("date_start", leaner?.date_start);
			setValue("date_end", leaner?.date_end);
			setValue("type_training", leaner?.type_training);
            setValue("week_id", leaner?.week_id);

			setValue("training_mesocycle", leaner?.training_mesocycle);
			setValue("comments", leaner?.comments);
		},
		[setValue]
	);

	useEffect(() => {
        if(id){
            getLeaner(id);
        }
	}, [getLeaner, id]);

	return (
		<>
			<PageTitle>Aluno</PageTitle>
			<SectionTitle>Cadastro de aluno</SectionTitle>

			<form
				onSubmit={handleSubmit(onSubmitForm)}
				className="px-4 py-3 mb-8 w-full bg-white rounded-lg shadow-md dark:bg-gray-800"
			>
				<div className="lg:grid lg:grid-cols-2 lg:gap-4">
					<Label className="mt-4">
						<span>Nome</span>
						<Input
							css=""
							{...register("name")}
							name="name"
							className="mt-1"
							placeholder="Jhon Doe"
						/>
					</Label>
					<Label className="mt-4">
						<span>E-mail</span>
						<Input
							css=""
							className="mt-1"
							{...register("email")}
							type="email"
							name="email"
							placeholder="alguem@email.com"
						/>
					</Label>
				</div>

				<div className="lg:grid lg:grid-cols-2 lg:gap-4">
					<Label className="mt-4">
						<span>Data de nascimento</span>
						<Input
							css=""
							{...register("birth_date")}
							type="date"
							name="birth_date"
							className="mt-1"
							placeholder="Tipo de treino"
						/>
					</Label>
					<Label className="mt-4">
						<span>Idade</span>
						<Input
							css=""
							className="mt-1"
							{...register("age")}
							name="age"
							placeholder="25"
						/>
					</Label>
				</div>
				<div className="lg:grid lg:grid-cols-3 lg:gap-4">
					<Label className="mt-4">
						<span>Gênero</span>
						<Select
							css=""
							{...register("gender_id")}
							name="gender_id"
							className="mt-1"
						>
							<option></option>
							{genders.map((gender) => (
								<option key={gender.id} value={gender.id}>
									{gender.name}
								</option>
							))}
						</Select>
					</Label>
					<Label className="mt-4">
						<span>Plano</span>
						<Select
							css=""
							{...register("plan_id")}
							name="plan_id"
							className="mt-1"
						>
							<option></option>
							{plans.map((plan) => (
								<option key={plan.id} value={plan.id}>
									{plan.name}
								</option>
							))}
						</Select>
					</Label>
					<Label className="mt-4">
						<span>Intensidade</span>
						<Select
							css=""
							{...register("intensity_id")}
							name="intensity_id"
							className="mt-1"
						>
							<option></option>
							{intensities.map((intensity) => (
								<option key={intensity.id} value={intensity.id}>
									{intensity.name}
								</option>
							))}
						</Select>
					</Label>
				</div>
				<div className="lg:grid lg:grid-cols-3 lg:gap-4">
					<Label className="mt-4">
						<span>Semana</span>
						<Select
							css=""
							{...register("week_id")}
							className="mt-1"
						>
							<option></option>
							{weeks.map((week) => (
								<option key={week.id} value={week.id}>
									{week.name}
								</option>
							))}
						</Select>
					</Label>
					<Label className="mt-4">
						<span>Frequência</span>
						<Select
							css=""
							{...register("frequency_id")}
							className="mt-1"
						>
							<option></option>
							{frequencies.map((frequency) => (
								<option key={frequency.id} value={frequency.id}>
									{frequency.name}
								</option>
							))}
						</Select>
					</Label>
					<Label className="mt-4">
						<span>Local do Treino</span>
						<Select
							css=""
							{...register("location_id")}
							className="mt-1"
						>
							<option></option>
							{locations.map((location) => (
								<option key={location.id} value={location.id}>
									{location.name}
								</option>
							))}
						</Select>
					</Label>
				</div>

				<div className="lg:grid lg:grid-cols-4 lg:gap-4">
					<Label className="mt-4">
						<span>Data de Início</span>
						<Input
							css=""
							{...register("date_start")}
							type="date"
							className="mt-1"
							placeholder="Tipo de treino"
						/>
					</Label>
					<Label className="mt-4">
						<span>Data de Fim</span>
						<Input
							css=""
							{...register("date_end")}
							type="date"
							className="mt-1"
							placeholder="Tipo de treino"
						/>
					</Label>
					<Label className="mt-4">
						<span>Tipo de treino</span>
						<Input
							css=""
							{...register("type_training")}
							className="mt-1"
						/>
					</Label>
					<Label className="mt-4">
						<span>Mesociclo</span>
						<Input
							css=""
							{...register("training_mesocycle")}
							className="mt-1"
						/>
					</Label>
				</div>

				<Label className="mt-4">
					<span>Comentário do professor</span>
					<Textarea
						css=""
						{...register("comments")}
						name="comments"
						className="mt-1"
						rows={3}
						placeholder="Escreva aqui os comentários se necessário."
					/>
				</Label>
                <div className="flex items-center">
                <Button onClick={() => {}} className="bg-red-600 mt-4">
					Cancelar
				</Button>
                <Button type="submit" className="bg-blue-600 mt-4">
					Salvar
				</Button>
              
                </div>
			
			</form>
		</>
	);
};

export default LeanerForm;
