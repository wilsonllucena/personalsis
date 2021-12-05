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

interface Leaner {
	name: string;
	email: string;
	gender_id: number;
	type_training: string;
}

const Form: React.FC = () => {
	const { register, handleSubmit, setValue } = useForm<
		Omit<ILeanerInputsForm, "id">
	>();
	const history = useHistory();

	const { id } = useParams<{ id: string }>();
	const [leaner, setLeaner] = useState<Leaner>();
	const [genders, setGenders] = useState<IOptionsSelect[]>([]);

	// const [plans, setPlans] = useState<IOptionsSelect[]>([]);
	// const [intensities, setIntensities] = useState<IOptionsSelect[]>([]);
	// const [weeks, setWeeks] = useState<IOptionsSelect[]>([]);
	// const [frequencies, setFrequencies] = useState<IOptionsSelect[]>([]);
	// const [locations, setLocations] = useState<IOptionsSelect[]>([]);

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

	// const getPlansOptions = async () => {
	// 	const response = await api.get<IOptionsSelect[]>("/plans");
	// 	setPlans(response.data);
	// };

	// const getIntensitiesOptions = async () => {
	// 	const response = await api.get<IOptionsSelect[]>("/intensities");
	// 	setIntensities(response.data);
	// };

	// const getWeeksOptions = async () => {
	// 	const response = await api.get<IOptionsSelect[]>("/weeks");
	// 	setWeeks(response.data);
	// };

	// const getLocationsOptions = async () => {
	// 	const response = await api.get<IOptionsSelect[]>("/locations");
	// 	setLocations(response.data);
	// };

	// const getFrequenciesOptions = async () => {
	// 	const response = await api.get<IOptionsSelect[]>("/frequencies");
	// 	setFrequencies(response.data);
	// };
	// useEffect(() => {
	// 	getGenderOptions();
	// 	getPlansOptions();
	// 	getIntensitiesOptions();
	// 	getWeeksOptions();
	// 	getLocationsOptions();
	// 	getFrequenciesOptions();
	// }, []);

	// const getLeaner = useCallback(
	// 	async (id: string) => {
	// 		const response = await api.get(`/leaners/${id}`);
	//         setLeaner(response.data)
	// 	},
	// 	[]
	// );

	useEffect(() => {
		if (id) {
			const getLeaner = async (id: string) => {
				const response = await api.get(`/leaners/${id}`);
				setLeaner(response.data);
			};
			getLeaner(id);
		}
	}, [id]);

	const user = {
		imageUrl:
			"https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
	};
	const stats = [
		{ label: "Vacation days left", value: 12 },
		{ label: "Sick days left", value: 4 },
		{ label: "Personal days left", value: 2 },
	];

	return (
		<>
			<div className="rounded-lg bg-white overflow-hidden shadow my-10 ">
				<div className="bg-white p-6">
					<div className="sm:flex sm:items-center sm:justify-between">
						<div className="sm:flex sm:space-x-5">
							<div className="flex-shrink-0">
								<img
									className="mx-auto h-20 w-20 rounded-full"
									src={user.imageUrl}
									alt=""
								/>
							</div>
							<div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
								<p className="text-xl font-bold text-gray-900 sm:text-2xl">
									{leaner?.name}
								</p>
								<p className="text-sm font-medium text-gray-600">
									{leaner?.gender_id === 1
										? "Aluno"
										: "Aluna"}
								</p>
							</div>
						</div>
						<div className="mt-5 flex justify-center sm:mt-0">
							<a
								href="#"
								className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
							>
								Perfil
							</a>
						</div>
					</div>
				</div>
				<div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
					{stats.map((stat) => (
						<div
							key={stat.label}
							className="px-6 py-5 text-sm font-medium text-center"
						>
							<span className="text-gray-900">{stat.value}</span>{" "}
							<span className="text-gray-600">{stat.label}</span>
						</div>
					))}
				</div>
			</div>

			<div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
				<div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
					<div className="ml-4 mt-4">
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Treinos
						</h3>
						<p className="mt-1 text-sm text-gray-500">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit quam corrupti consectetur.
						</p>
					</div>
					<div className="ml-4 mt-4 flex-shrink-0">
						<button
							type="button"
							className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Criar novo treino
						</button>
					</div>
				</div>
                <form
				onSubmit={handleSubmit(onSubmitForm)}
				className="px-4 py-3 mb-8 w-full bg-white rounded-lg shadow-md dark:bg-gray-800"
			>
                <div className="lg:grid  lg:grid-cols-2 lg:gap-4">
                <Label className="mt-4">
						<span>Exercicio</span>
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
                </div>

                </form>
			</div>

			{/* <form
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
				<Button type="submit" className="bg-blue-600 mt-4">
					Salvar
				</Button>
			</form> */}
		</>
	);
};

export default Form;