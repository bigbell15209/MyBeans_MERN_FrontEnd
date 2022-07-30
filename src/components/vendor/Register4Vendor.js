import axios from "axios"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { setLoginSuccess } from "../../features/authSlice"
import { gql, useMutation, useQuery } from "@apollo/client"

const REGISTER = gql`
	mutation Register(
		$email: String!
		$password: String!
		$role: String!
		$firstName: String!
		$lastName: String!
		$street: String!
		$city: String!
		$province: String!
        $shopName: String!
        $shopDescription: String!
        $phoneNumber: String!

	) {
		register(
			email: $email
			password: $password
			role: $role
			firstName: $firstName
			lastName: $lastName
			street: $street
			city: $city
            province: $province
            shopName:  $shopName
            shopDescription: $shopDescription
			phoneNumber: $phoneNumber
			

		) {
			id
			email
			role
			token
		}
	}
`

function Register4Vendor() {
	const [
		register,
		{ data: registerData, loading: registerLoading, error: registerError }
	] = useMutation(REGISTER, {
		onCompleted: (registerData) => {
			dispatch(setLoginSuccess(registerData.register))
			navigate("/home")
		}
	})
	const [nurse, setVendor] = useState({
		password: "",
		email: "",
		role: "vendor",
		firstName: "",
		lastName: "",
		street: "",
		city: "",
        shopName:"",
        shopDescription:"",
		phoneNumber: ""
	})

	const { email, password, role } = nurse

	const [login, setLogin] = useState(false)

	//Set dispatch for Redux
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const onInputChange = (e) =>
    setLogin({ ...nurse, [e.target.name]: e.target.value })

	const handleRegister = async (e) => {
		e.preventDefault()

		register({
			variables: nurse
		})
	}

	return (
		<>
			<br></br><br></br>
			<div className="admin-div-css">
			<Form onSubmit={(e) => handleRegister(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						name="email"
						value={email}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={(e) => onInputChange(e)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Register
				</Button>
			</Form>
			</div>
		</>
	)
}

export default Register4Vendor
