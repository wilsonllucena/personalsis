import React, { FormEvent, useCallback, useEffect, useState } from "react";

import { Button, Input, Label, Select, Textarea } from "@windmill/react-ui";
import { useParams } from "react-router-dom";
import api from "../../services/apiClient";
import { IOptionsSelect } from "../../interface/IOptionsSelect";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
	CalendarIcon,
	LocationMarkerIcon,
	UsersIcon,
    PencilIcon,
    ChartBarIcon,
    RefreshIcon
} from "@heroicons/react/solid";

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

interface Exercicie {
    id: number;
	name: string;
	url: string;
}

const Form: React.FC = () => {
	const { register, handleSubmit, setValue } = useForm<
		Omit<ILeanerInputsForm, "id">
	>();
	const history = useHistory();

	const { id } = useParams<{ id: string }>();
	const [leaner, setLeaner] = useState<Leaner>();
	const [genders, setGenders] = useState<IOptionsSelect[]>([]);

	const [categories, setCategories] = useState<IOptionsSelect[]>([]);
    const [exercicies, setExercicies] = useState<Exercicie[]>([]);
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

    const handleExercicies = useCallback(async (event: FormEvent) => {
        let target = event.target as HTMLSelectElement;
        const response = await api.get<Exercicie[]>(`/exercicies/muscle/${target.value}`);
		setExercicies(response.data);
    },[])

	const getGenderOptions = async () => {
		const response = await api.get<IOptionsSelect[]>("/genders");
		setGenders(response.data);
	};

	const getCategories = async () => {
		const response = await api.get<IOptionsSelect[]>("/muscles");
		setCategories(response.data);
	};

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
	useEffect(() => {
        getCategories()
	// 	getGenderOptions();
	// 	getPlansOptions();
	// 	getIntensitiesOptions();
	// 	getWeeksOptions();
	// 	getLocationsOptions();
	// 	getFrequenciesOptions();
	}, []);

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

	const positions = [
		{
			id: 1,
			title: "Back End Developer",
			type: "Full-time",
			location: "Remote",
			department: "Engineering",
			closeDate: "2020-01-07",
			closeDateFull: "January 7, 2020",
		},
		{
			id: 2,
			title: "Front End Developer",
			type: "Full-time",
			location: "Remote",
			department: "Engineering",
			closeDate: "2020-01-07",
			closeDateFull: "January 7, 2020",
		},
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
							Criar ficha de treinos
						</h3>
					</div>
				</div>
				<form
					onSubmit={handleSubmit(onSubmitForm)}
					className="px-4 py-3 mb-8 w-full bg-white rounded-lg shadow-md dark:bg-gray-800 mt-1"
				>
					<div className="lg:grid lg:grid-cols-2 lg:gap-4">
						<Label className="mt-4">
							<span>Categoria</span>
							<Select
								css=""
								{...register("gender_id")}
                                onClick={(event) => handleExercicies(event)}
								name="gender_id"
								className="mt-1"
							>
								<option></option>
								{categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</Select>
						</Label>
						<Label className="mt-4">
							<span>Exercicio</span>
							<Select
								css=""
								{...register("gender_id")}
								name="gender_id"
								className="mt-1"
							>
								<option></option>
								{exercicies && exercicies.map((exercicie) => (
									<option key={exercicie.id} value={exercicie.id}>
										{exercicie.name}
									</option>
								))}
							</Select>
						</Label>
					</div>

					<div className="lg:grid lg:grid-cols-6 lg:gap-4">
						<Label className="mt-4">
							<span>Séries</span>
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
							<span>Repetições</span>
							<Select
								css=""
								{...register("plan_id")}
								name="plan_id"
								className="mt-1"
							>
								<option></option>
								{genders.map((plan) => (
									<option key={plan.id} value={plan.id}>
										{plan.name}
									</option>
								))}
							</Select>
						</Label>
						<Label className="mt-4">
							<span>Intervalos</span>
							<Select
								css=""
								{...register("intensity_id")}
								name="intensity_id"
								className="mt-1"
							>
								<option></option>
								{genders.map((intensity) => (
									<option
										key={intensity.id}
										value={intensity.id}
									>
										{intensity.name}
									</option>
								))}
							</Select>
						</Label>
						<Label className="mt-4">
							<span>Candência</span>
							<Select
								css=""
								{...register("intensity_id")}
								name="intensity_id"
								className="mt-1"
							>
								<option></option>
								{genders.map((intensity) => (
									<option
										key={intensity.id}
										value={intensity.id}
									>
										{intensity.name}
									</option>
								))}
							</Select>
						</Label>
						<Label className="mt-4">
							<span>Carga</span>
							<Select
								css=""
								{...register("intensity_id")}
								name="intensity_id"
								className="mt-1"
							>
								<option></option>
								{genders.map((intensity) => (
									<option
										key={intensity.id}
										value={intensity.id}
									>
										{intensity.name}
									</option>
								))}
							</Select>
						</Label>
						<Label className="mt-4">
							<span>Método</span>
							<Select
								css=""
								{...register("intensity_id")}
								name="intensity_id"
								className="mt-1"
							>
								<option></option>
								{genders.map((intensity) => (
									<option
										key={intensity.id}
										value={intensity.id}
									>
										{intensity.name}
									</option>
								))}
							</Select>
						</Label>
					</div>
					<Label className="mt-4">
						<span>Observações do professor</span>
						<Textarea
							css=""
							{...register("comments")}
							name="comments"
							className="mt-1"
							rows={3}
							placeholder="Escreva aqui os comentários se necessário."
						/>
					</Label>
					<div className="flex items-center justify-between">
						<Button className="bg-blue-600 mt-4">Cancelar</Button>
						<Button type="submit" className="bg-blue-600 mt-4">
							Salvar
						</Button>
					</div>
				</form>
                <hr />
				<div className="bg-white shadow overflow-hidden sm:rounded-md my-4">
					<ul  className="divide-y divide-gray-200">
						{positions.map((position) => (
							<li key={position.id}>
								<a href="#" className="block hover:bg-gray-50">
									<div className="px-4 py-4 sm:px-6">
										<div className="flex items-center justify-between">
											<p className="text-sm font-medium text-indigo-600 truncate">
												{position.title}
											</p>

											<div className="sm:flex">
												<p className="flex items-center text-sm text-gray-500">
													<RefreshIcon
														className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
														aria-hidden="true"
													/>
													{position.department}
												</p>
												<p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
													<ChartBarIcon
														className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
														aria-hidden="true"
													/>
													{position.location}
												</p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
													<PencilIcon
														className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
														aria-hidden="true"
													/>
													Editar
												</p>
											</div>
										</div>
									</div>
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
					<div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
						<div className="ml-4 mt-4">
							<p className="leading-6 font-medium text-gray-900">
								Job Postings
							</p>

						</div>
						<div className="ml-4 mt-4 flex-shrink-0">
							<button
								type="button"
								className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Create new job
							</button>
						</div>
					</div>
				</div> */}
		</>
	);
};

export default Form;
