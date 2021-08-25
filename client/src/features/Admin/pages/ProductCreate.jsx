import "../components/adminCreate.scss";

import * as yup from "yup";

import {FastField, Formik} from "formik";
import React, {useState} from "react";

import InputField from "components/Form/InputField";
import LoadNotifice from "components/Dialog/LoadNotifice";
import PropTypes from "prop-types";
import gameApi from "api/gameApi";

/** YUP SCHEMA */
const schema = yup.object().shape({
	imgs: yup.string().required("This field is required"),
});

function ProductCreate(props) {
	const initialValues = {
		name: "",
		cost: 0,
		description: "",
		position: "",
		type: "Tiện ích",
		imgs: [],
		shapeNames: [],
		colorNames: [],
		shapeLinks: [],
		colorLinks: [],
	};
	const [dialog, setDialog] = useState({loading: false, error: null});

	// HANDLE FUNCTIONS
	const handleSubmit = async values => {
		let newDialog = {...dialog};
		newDialog.loading = true;
		setDialog(newDialog);

		const data = values.imgs.split("\n");
		try {
			const response = await gameApi.addMany({data});
			console.log(response);
		} catch (error) {
			console.log(error);
		}

		newDialog = {...dialog};
		setDialog(newDialog);
	};

	return (
		<div className="admin-create">
			<div className="admin-layout-fluid admin-create__notifice">loi roi</div>
			<div className="admin-layout-fluid admin-create__content">
				<h3 className="admin-create__content__header">Create Product</h3>

				<Formik
					initialValues={initialValues}
					validationSchema={schema}
					onSubmit={handleSubmit}
				>
					{formikProps => {
						const {
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
							setFieldValue,
						} = formikProps;

						return (
							<form
								onSubmit={handleSubmit}
								className="grid admin-create__content__form"
							>
								<div className="row">
									<FastField
										name="name"
										className="c-6"
										placeholder="Name ..."
										label="Name"
										component={InputField}
									/>
								</div>
								<div className="row admin-create__content__form__btn">
									<button
										className="btn-auth admin-create__form__btn"
										type="submit"
									>
										Submit
									</button>
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
			{dialog.loading && <LoadNotifice />}
		</div>
	);
}

export default ProductCreate;
