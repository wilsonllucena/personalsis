import React, { useEffect, useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { Input, Label, Select, Textarea } from "@windmill/react-ui";
import { useParams } from "react-router-dom";
import api from "../../services/apiClient";
import { IOptionsSelect } from "../../interface/IOptionsSelect";


const LeanerForm: React.FC = () => {
	const { id } = useParams<{ id: string }>();
    const [genders, setGenders] = useState<IOptionsSelect[]>([])
    const [plans, setPlans] = useState<IOptionsSelect[]>([])
    const [intensities, setIntensities] = useState<IOptionsSelect[]>([])

	useEffect(() => {
		console.log(id);
	}, [id]);

    const getGenderOptions = async () => {
        const response = await api.get<IOptionsSelect[]>("/genders");
        setGenders(response.data)
    }

    const getPlansOptions = async () => {
        const response = await api.get<IOptionsSelect[]>("/plans");
        setPlans(response.data)
    }
    
    const getIntensitiesOptions = async () => {
        const response = await api.get<IOptionsSelect[]>("/intensities");
        setIntensities(response.data)
    }
    useEffect(() => {
        getGenderOptions();
        getPlansOptions();
        getIntensitiesOptions();
    },[])

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
							placeholder="25"
						/>
					</Label>
				</div>
                <div className="lg:grid lg:grid-cols-3 lg:gap-4">
				<Label className="mt-4">
					<span>G??nero</span>
					<Select css="" name="gender_id" className="mt-1">
                        <option>Selecione</option>
                        { genders.map(gender => (
						    <option key={gender.id} value={gender.id}>{gender.name}</option>
                        ))}
					</Select>
				</Label>
                <Label className="mt-4">
					<span>Plano</span>
					<Select css="" name="plan_id" className="mt-1">
                    <option>Selecione</option>
                        { plans.map(plan => (
						    <option key={plan.id} value={plan.id}>{plan.name}</option>
                        ))}
					</Select>
				</Label>
                <Label className="mt-4">
					<span>Intensidade</span>
					<Select css="" name="intisity_id" className="mt-1">
                        <option>Selecione</option>
                        { intensities.map(intensity => (
						    <option key={intensity.id} value={intensity.id}>{intensity.name}</option>
                        ))}
					</Select>
				</Label>
                </div>

				<Label className="mt-4">
					<span>Coment??rio</span>
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
